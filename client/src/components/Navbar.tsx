import {
  Box,
  Container,
  Flex,
  HStack,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

const Links = ['Dashboard', 'Projects', 'Team'];

const NavLink = ({ children }: Props) => {
  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
      href={'#'}
    >
      {children}
    </Box>
  );
};

const Navbar = () => {
  return (
    <>
      <Box bg={useColorModeValue('teal.100', 'green.900')} px={4} fontSize={20}>
        <Flex
          h={16}
          alignItems={'center'}
          justifyContent={'space-between'}
          padding={4}
        >
          <Box marginRight={10}>Logo</Box>
          <Stack direction={'row'} spacing={5}>
            {Links.map((link) => (
              <NavLink key={link}>{link}</NavLink>
            ))}
          </Stack>
          <Stack>
            <NavLink>Login</NavLink>
          </Stack>
        </Flex>
      </Box>
    </>
  );
};

export default Navbar;
