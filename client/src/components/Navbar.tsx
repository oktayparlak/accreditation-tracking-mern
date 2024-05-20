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
  Text,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { ChevronDownIcon } from '@chakra-ui/icons';

const RootAdminMenu: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
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
              onClick={() => navigate('/faculties')}
            >
              Fakülte Oluştur
            </MenuItem>
            <MenuItem
              as={'a'}
              cursor={'pointer'}
              onClick={() => navigate('/set-faculty-admin')}
            >
              Fakülte Başkanı Belirle
            </MenuItem>
          </MenuList>
        </Menu>
        {/* Bölüm */}
        <Menu isLazy>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            Bölüm
          </MenuButton>
          <MenuList>
            <MenuItem
              as={'a'}
              cursor={'pointer'}
              onClick={() => navigate('/departments')}
            >
              Bölüm Oluştur
            </MenuItem>
            <MenuItem
              as={'a'}
              cursor={'pointer'}
              onClick={() => navigate('/set-department-admin')}
            >
              Bölüm Başkanı Belirle
            </MenuItem>
          </MenuList>
        </Menu>
        {/* Ders */}
        <Menu isLazy>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            Ders
          </MenuButton>
          <MenuList>
            <MenuItem
              as={'a'}
              cursor={'pointer'}
              onClick={() => navigate('/courses')}
            >
              Ders Oluştur
            </MenuItem>
            <MenuItem
              as={'a'}
              cursor={'pointer'}
              onClick={() => navigate('/set-course-admin')}
            >
              Ders Yöneticisi Belirle
            </MenuItem>
            <MenuItem
              as={'a'}
              cursor={'pointer'}
              onClick={() => navigate('/department-materials')}
            >
              Bölüm Çıktısı Oluştur
            </MenuItem>
          </MenuList>
        </Menu>
        {/* Öğrenim Çıktısı */}
        <Menu isLazy>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            Öğrenim Çıktısı
          </MenuButton>
          <MenuList>
            <MenuItem
              as={'a'}
              cursor={'pointer'}
              onClick={() => navigate('/learning-materials')}
            >
              Öğrenim Çıktısı Oluştur
            </MenuItem>
            <MenuItem
              as={'a'}
              cursor={'pointer'}
              onClick={() => navigate('/set-course-supervisor')}
            >
              Ders Sorumlusu Belirle
            </MenuItem>
          </MenuList>
        </Menu>
        {/* Ölçme Aracı */}
        <Menu isLazy>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            Ölçme Aracı
          </MenuButton>
          <MenuList>
            <MenuItem
              as={'a'}
              cursor={'pointer'}
              onClick={() => navigate('/measuring-tools')}
            >
              Ölçme Araçları
            </MenuItem>
          </MenuList>
        </Menu>
        {/* Başvuru */}
        <Menu isLazy>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            Başvuru
          </MenuButton>
          <MenuList>
            <MenuItem
              as={'a'}
              cursor={'pointer'}
              onClick={() => navigate('/all-applications')}
            >
              Başvurular
            </MenuItem>
            <MenuItem
              as={'a'}
              cursor={'pointer'}
              onClick={() => navigate('/applications')}
            >
              Başvuru Oluştur
            </MenuItem>
          </MenuList>
        </Menu>
      </Stack>
    </>
  );
};

const FacultyAdminMenu: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <Stack direction={'row'} spacing={5}>
        {/* Bölüm */}
        <Menu isLazy>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            Bölüm
          </MenuButton>
          <MenuList>
            <MenuItem
              as={'a'}
              cursor={'pointer'}
              onClick={() => navigate('/departments')}
            >
              Bölüm Oluştur
            </MenuItem>
            <MenuItem
              as={'a'}
              cursor={'pointer'}
              onClick={() => navigate('/set-department-admin')}
            >
              Bölüm Başkanı Belirle
            </MenuItem>
          </MenuList>
        </Menu>
      </Stack>
    </>
  );
};

const DepartmentAdminMenu: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <Stack direction={'row'} spacing={5}>
        {/* Bölüm */}
        <Menu isLazy>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            Bölüm
          </MenuButton>
          <MenuList>
            <MenuItem
              as={'a'}
              cursor={'pointer'}
              onClick={() => navigate('/departments')}
            >
              Bölüm Oluştur
            </MenuItem>
            <MenuItem
              as={'a'}
              cursor={'pointer'}
              onClick={() => navigate('/set-course-admin')}
            >
              Bölüm Başkanı Belirle
            </MenuItem>
          </MenuList>
        </Menu>
        {/* Başvuru */}
        <Menu isLazy>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            Başvuru
          </MenuButton>
          <MenuList>
            <MenuItem
              as={'a'}
              cursor={'pointer'}
              onClick={() => navigate('/all-applications')}
            >
              Başvurular
            </MenuItem>
          </MenuList>
        </Menu>
      </Stack>
    </>
  );
};

const CourseAdminMenu: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <Stack direction={'row'} spacing={5}>
        {/* Ders */}
        <Menu isLazy>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            Ders
          </MenuButton>
          <MenuList>
            <MenuItem
              as={'a'}
              cursor={'pointer'}
              onClick={() => navigate('/courses')}
            >
              Ders Oluştur
            </MenuItem>
            <MenuItem
              as={'a'}
              cursor={'pointer'}
              onClick={() => navigate('/users')}
            >
              Ders Yöneticisi Belirle
            </MenuItem>
            <MenuItem
              as={'a'}
              cursor={'pointer'}
              onClick={() => navigate('/department-materials')}
            >
              Bölüm Çıktısı Oluştur
            </MenuItem>
          </MenuList>
        </Menu>
        {/* Öğrenim Çıktısı */}
        <Menu isLazy>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            Öğrenim Çıktısı
          </MenuButton>
          <MenuList>
            <MenuItem
              as={'a'}
              cursor={'pointer'}
              onClick={() => navigate('/learning-materials')}
            >
              Öğrenim Çıktısı Oluştur
            </MenuItem>
            <MenuItem
              as={'a'}
              cursor={'pointer'}
              onClick={() => navigate('/set-course-supervisor')}
            >
              Ders Sorumlusu Belirle
            </MenuItem>
          </MenuList>
        </Menu>
        {/* Ölçme Aracı */}
        <Menu isLazy>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            Ölçme Aracı
          </MenuButton>
          <MenuList>
            <MenuItem
              as={'a'}
              cursor={'pointer'}
              onClick={() => navigate('/measuring-tools')}
            >
              Ölçme Araçları
            </MenuItem>
          </MenuList>
        </Menu>
      </Stack>
    </>
  );
};

const CourseSupervisorMenu: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <Stack direction={'row'} spacing={5}>
        {/* Başvuru */}
        <Menu isLazy>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            Başvuru
          </MenuButton>
          <MenuList>
            <MenuItem
              as={'a'}
              cursor={'pointer'}
              onClick={() => navigate('/applications')}
            >
              Başvuru Oluştur
            </MenuItem>
          </MenuList>
        </Menu>
      </Stack>
    </>
  );
};

const NavbarMenu: React.FC = () => {
  switch (JSON.parse(localStorage.getItem('user') || '{}').role) {
    case 'ROOT_ADMIN':
      return <RootAdminMenu />;
    case 'FACULTY_ADMIN':
      return <FacultyAdminMenu />;
    case 'DEPARTMENT_ADMIN':
      return <DepartmentAdminMenu />;
    case 'COURSE_ADMIN':
      return <CourseAdminMenu />;
    case 'COURSE_SUPERVISOR':
      return <CourseSupervisorMenu />;
    default:
      return (
        <>
          <Stack direction={'row'} spacing={5}>
            <Text>İşlem Yapma Yetkiniz Bulunmamaktadır.</Text>
          </Stack>
        </>
      );
  }
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
            as="a"
            marginRight={10}
            cursor={'pointer'}
            onClick={() => navigate('/')}
          >
            <Image src="/assets/image.png" boxSize={'75px'} />
          </Box>
          <NavbarMenu />
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
