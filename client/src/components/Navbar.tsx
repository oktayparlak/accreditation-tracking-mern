import React from 'react';
import {
  Box,
  Button,
  Flex,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { ChevronDownIcon } from '@chakra-ui/icons';

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
            as="a"
            marginRight={10}
            cursor={'pointer'}
            onClick={() => navigate('/')}
          >
            <Image src="/assets/image.png" boxSize={'75px'} />
          </Box>
          {/* ROOT_ADMIN */}
          <Stack direction={'row'} spacing={5}>
            {/* Kullancı */}
            <Menu isLazy>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                Kullanıcılar
              </MenuButton>
              <MenuList>
                <MenuItem
                  as={'a'}
                  cursor={'pointer'}
                  onClick={() => navigate('/users')}
                >
                  Kullanıcı Oluştur
                </MenuItem>
                <MenuItem
                  as={'a'}
                  cursor={'pointer'}
                  onClick={() => navigate('/set-admin')}
                >
                  Yönetici Ata
                </MenuItem>
              </MenuList>
            </Menu>
            {/* Fakülte */}
            <Menu isLazy>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                Fakülte
              </MenuButton>
              <MenuList>
                <MenuItem
                  as={'a'}
                  cursor={'pointer'}
                  onClick={() => navigate('/create-user')}
                >
                  Fakülte Oluştur
                </MenuItem>
                <MenuItem
                  as={'a'}
                  cursor={'pointer'}
                  onClick={() => navigate('/users')}
                >
                  Fakülteler
                </MenuItem>
              </MenuList>
            </Menu>
          </Stack>
          <Stack>
            <Link
              as={Button}
              onClick={() => {
                localStorage.clear();
                navigate('/login');
              }}
            >
              Çıkış Yap
            </Link>
          </Stack>
        </Flex>
      </Box>
    </>
  );
};

export default Navbar;
