import React, { useEffect, useRef, useState } from 'react';
import { Table as AntTable } from 'antd';
import Navbar from '../../components/Navbar';
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { FieldValues, useForm } from 'react-hook-form';
import apiClient from '../../services/api-client';
import UserFeaturesMenu from '../../components/UserFeaturesMenu';
import { roles, User } from '../../interfaces/types';

interface DataSource {
  key: string;
  role: string;
  firstName: string;
  lastName: string;
  email: string;
  inc: React.ReactNode;
}

const columns = [
  {
    title: 'Rol',
    dataIndex: 'role',
    key: 'role',
  },
  {
    title: 'Ad',
    dataIndex: 'firstName',
    key: 'firstName',
  },
  {
    title: 'Soyad',
    dataIndex: 'lastName',
    key: 'lastName',
  },
  {
    title: 'E-Posta',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'İncele',
    dataIndex: 'inc',
    key: 'inc',
  },
];

const Users: React.FC = () => {
  const toast = useToast();
  const { register, handleSubmit } = useForm();
  const formRef = useRef(null);

  const [users, setUsers] = useState<DataSource[]>([]);
  const [loading, setLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
  const [reset, setReset] = useState({});

  useEffect(() => {
    setTableLoading(true);
    apiClient
      .get('/users/')
      .then((response) => {
        if (response.status === 200) {
          const data: DataSource[] = response.data.map((user: User) => {
            return {
              key: user.id,
              role: roles[`${user.role}`] || '-',
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              inc: (
                <UserFeaturesMenu
                  dataId={user.id}
                  dataUrl="/users"
                  setReset={setReset}
                />
              ),
            };
          });
          setUsers(data);
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
      })
      .finally(() => {
        setTableLoading(false);
      });
  }, [reset]);

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
          if (formRef.current) {
            (formRef.current as any).reset();
          }
          setReset({});
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
            <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
              <FormControl id="role" mb={3} isRequired>
                <FormLabel>Rol</FormLabel>
                <Select
                  {...register('role')}
                  bg={'white'}
                  placeholder="Seçiniz"
                >
                  <option value="FACULTY_ADMIN">Fakülte Yöneticisi</option>
                  <option value="DEPARTMENT_ADMIN">Bölüm Yöneticisi</option>
                  <option value="COURSE_ADMIN">Ders Yöneticisi</option>
                  <option value="COURSE_SUPERVISOR">Ders Sorumlusu</option>
                  <option value="">-</option>
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
              <FormControl id="email" mb={3} isRequired>
                <FormLabel>E-Posta</FormLabel>
                <Input {...register('email')} bg={'white'} type="text" />
              </FormControl>
              <FormControl id="password" mb={3} isRequired>
                <FormLabel>Şifre</FormLabel>
                <Input {...register('password')} bg={'white'} type="password" />
              </FormControl>
              <Flex justifyContent={'center'}>
                <Button
                  mt={3}
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
            <AntTable
              loading={tableLoading}
              dataSource={users}
              columns={columns}
            ></AntTable>
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default Users;
