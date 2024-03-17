import React from 'react';
import { Box, Flex, Image, Link, Stack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

interface NavItemProps {
  key: string;
  title: string;
  to: string;
  marginLeft?: number;
}

const Links: NavItemProps[] = [
  { key: 'kisi_olustur', title: 'Kişi Oluştur', to: '/dashboard' },
  { key: 'Profile', title: 'Profile', to: '/profile' },
];

const NavLink = ({ key, title, to, marginLeft }: NavItemProps) => {
  const navigate = useNavigate();
  return (
    <Link
      marginLeft={marginLeft}
      as="a"
      key={key}
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: 'white',
      }}
      cursor={'pointer'}
      onClick={() => navigate(to)}
    >
      {title}
    </Link>
  );
};

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <Box bg={'gray.50'} px={4} fontSize={20} color={'black'}>
        <Flex
          h={20}
          alignItems={'center'}
          justifyContent={'space-between'}
          padding={4}
        >
          <Box
            marginRight={10}
            onClick={() => navigate('/')}
            cursor={'pointer'}
          >
            <Image src="/assets/image.png" boxSize={'75px'} />
          </Box>
          <Stack direction={'row'} spacing={5}>
            {Links.map((link) => (
              <NavLink key={link.key} to={link.to} title={link.title} />
            ))}
          </Stack>
          <Stack>
            <NavLink marginLeft={10} key="Login" to="/login" title="Login" />
          </Stack>
        </Flex>
      </Box>
    </>
  );
};

export default Navbar;
