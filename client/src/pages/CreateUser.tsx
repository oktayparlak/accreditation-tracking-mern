import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { FieldValues, useForm } from 'react-hook-form';
import apiClient from '../services/api-client';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronDownIcon,
} from '@chakra-ui/icons';

interface Roles {
  [key: string]: string;
}

const roles: Roles = {
  ROOT_ADMIN: 'Sistem Yöneticisi',
  FACULTY_ADMIN: 'Fakülte Yöneticisi',
  DEPARTMENT_ADMIN: 'Bölüm Yöneticisi',
  COURSE_ADMIN: 'Ders Yöneticisi',
  COURSE_SUPERVISOR: 'Ders Sorumlusu',
};

interface User {
  id: string;
  role: [
    | 'ROOT_ADMIN'
    | 'FACULTY_ADMIN'
    | 'DEPARTMENT_ADMIN'
    | 'COURSE_ADMIN'
    | 'COURSE_SUPERVISOR'
  ];
  firstName: string;
  lastName: string;
  username: string;
}

const CreateUser = () => {
  const toast = useToast();
  const { register, handleSubmit } = useForm();

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    apiClient
      .get('/users/')
      .then((response) => {
        console.log(response.status);

        if (response.status === 200) {
          toast({
            position: 'bottom-right',
            status: 'success',
            title: `Kullanıcılar başarıyla getirildi.`,
            duration: 1000,
          });
          setUsers(response.data);
        } else {
          toast({
            position: 'bottom-right',
            status: 'error',
            title: `${response.data.details.message}`,
            duration: 1500,
          });
        }
      })
      .catch((error) => {
        toast({
          position: 'bottom-right',
          status: 'error',
          title: `${
            error.response ? error.response.data.error.message : 'Sunucu Hatası'
          }`,
          duration: 1500,
        });
      });
  }, []);

  const onSubmit = (data: FieldValues) => {
    setLoading(true);
    apiClient
      .post('/users/', data)
      .then((response) => {
        if (response.status === 201) {
          toast({
            position: 'bottom-left',
            status: 'success',
            title: `Kullanıcı başarıyla oluşturuldu.`,
            duration: 1500,
          });
          setUsers([...users, response.data]);
        } else {
          toast({
            position: 'bottom-left',
            status: 'error',
            title: `${response.data.details.message}`,
            duration: 1500,
          });
        }
      })
      .catch((error) => {
        toast({
          position: 'bottom-left',
          status: 'error',
          title: `${
            error.response ? error.response.data.error.message : 'Sunucu Hatası'
          }`,
          duration: 1500,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <>
      <Navbar />
      <Flex margin={4}>
        <Box flex={1} bg={'gray.100'} borderRadius={5} margin={4} padding={4}>
          <VStack>
            <Center>
              <Heading size="lg" mb={4}>
                Kullanıcı Oluştur
              </Heading>
            </Center>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl id="role" mb={3} isRequired>
                <FormLabel>Rol</FormLabel>
                <Select {...register('role')} bg={'white'} placeholder=" ">
                  <option value="ROOT_ADMIN">Sistem Yöneticisi</option>
                  <option value="FACULTY_ADMIN">Fakülte Yöneticisi</option>
                  <option value="DEPARTMENT_ADMIN">Bölüm Yöneticisi</option>
                  <option value="COURSE_ADMIN">Ders Yöneticisi</option>
                  <option value="COURSE_SUPERVISOR">Ders Sorumlusu</option>
                </Select>
              </FormControl>
              <FormControl id="firstName" mb={3} isRequired>
                <FormLabel>Ad</FormLabel>
                <Input {...register('firstName')} bg={'white'} type="text" />
              </FormControl>
              <FormControl id="lastName" mb={3} isRequired>
                <FormLabel>Soyad</FormLabel>
                <Input {...register('lastName')} bg={'white'} type="text" />
              </FormControl>
              <FormControl id="username" mb={3} isRequired>
                <FormLabel>Kullanıcı Adı</FormLabel>
                <Input {...register('username')} bg={'white'} type="text" />
              </FormControl>
              <FormControl id="password" mb={3} isRequired>
                <FormLabel>Şifre</FormLabel>
                <Input {...register('password')} bg={'white'} type="password" />
              </FormControl>
              <Flex justifyContent={'center'}>
                <Button
                  borderRadius={'full'}
                  size={'lg'}
                  type="submit"
                  colorScheme="blue"
                  isLoading={loading}
                >
                  Oluştur
                </Button>
              </Flex>
            </form>
          </VStack>
        </Box>
        <Flex
          flex={4}
          borderRadius={5}
          margin={4}
          padding={4}
          borderWidth={4}
          borderColor={'gray.100'}
          flexDirection={'column'}
          justifyContent={'space-between'}
        >
          <Box>
            <Center>
              <Heading size={'lg'} mb={4}>
                Kullanıcılar
              </Heading>
            </Center>
            <TableContainer>
              <Table variant="striped" colorScheme="gray">
                <Thead>
                  <Tr>
                    <Th textAlign={'center'}>Rol</Th>
                    <Th textAlign={'center'}>Ad</Th>
                    <Th textAlign={'center'}>Soyad</Th>
                    <Th textAlign={'center'}>Kullanıcı Adı</Th>
                    <Th textAlign={'center'}>İncele</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {users.map((user) => {
                    return (
                      <Tr key={user.id}>
                        <Td textAlign={'center'}>{roles[`${user.role}`]}</Td>
                        <Td textAlign={'center'}>{user.firstName}</Td>
                        <Td textAlign={'center'}>{user.lastName}</Td>
                        <Td textAlign={'center'}>{user.username}</Td>
                        <Td textAlign={'center'}>
                          <Menu>
                            <MenuButton
                              as={Button}
                              rightIcon={<ChevronDownIcon />}
                              borderRadius={'full'}
                              color={'white'}
                              bg={'blue.500'}
                              colorScheme="blue"
                            >
                              İncele
                            </MenuButton>
                            <MenuList>
                              <MenuItem>Kullanıcıyı Düzenle</MenuItem>
                              <MenuItem>Kullanıcıyı Sil</MenuItem>
                            </MenuList>
                          </Menu>
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
          {/* Pagination */}
          <Flex justifyContent={'flex-end'}>
            <Button
              variant={'outline'}
              leftIcon={<ArrowLeftIcon />}
              colorScheme="blue"
            ></Button>
            <Button
              variant={'outline'}
              rightIcon={<ArrowRightIcon />}
              colorScheme="blue"
              ml={2}
            ></Button>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default CreateUser;
