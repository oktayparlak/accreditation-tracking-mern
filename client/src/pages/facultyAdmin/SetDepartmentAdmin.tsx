import Navbar from '../../components/Navbar';
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  FormLabel,
  Heading,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { Select, Form, Table as AntTable } from 'antd';
import { FieldValues, useForm } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import apiClient from '../../services/api-client';
import { Department, DepartmentAdmin, User } from '../../interfaces/types';

interface DataSource {
  key: string;
  username: string;
  firstName: string;
  lastName: string;
  department: string;
  action: React.ReactNode;
}

const columns = [
  {
    title: 'Kullanıcı Adı',
    dataIndex: 'username',
    key: 'username',
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
    title: 'Bölüm',
    dataIndex: 'department',
    key: 'department',
  },
  {
    title: 'İşlem',
    dataIndex: 'action',
    key: 'action',
  },
];

const filterOption = (
  input: string,
  option?: { label: string; value: string }
) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

const SetDepartmentAdmin = () => {
  const [tableLoading, setTableLoading] = useState<boolean>(false);
  const [reset, setReset] = useState<any>({});

  const [users, setUsers] = useState<User[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [departmentAdmins, setDepartmentAdmins] = useState<DataSource[]>([]);

  const toast = useToast();
  const { handleSubmit, setValue } = useForm();

  const onChange = (value: string) => {
    setValue('departmentId', value);
  };

  const onChangeUser = (value: string) => {
    setValue('userId', value);
  };

  const onSubmit = (data: FieldValues) => {
    apiClient
      .post('/department-admins', data)
      .then((response) => {
        toast({
          position: 'bottom-right',
          status: 'success',
          title: 'Bölüm Başkanı Atandı',
          duration: 1500,
        });
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
  };

  const deleteDepartmentAdmin = (id: string) => {
    apiClient
      .delete(`/department-admins/${id}`)
      .then(() => {
        toast({
          position: 'bottom-right',
          status: 'success',
          title: 'Bölüm Başkanı Silindi',
          duration: 1500,
        });
        setReset({});
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
  };

  /* Users */
  useEffect(() => {
    apiClient
      .get('/users/role?role=DEPARTMENT_ADMIN')
      .then((response) => {
        setUsers(response.data);
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

  /* Department Admins Table */
  useEffect(() => {
    setTableLoading(true);
    apiClient
      .get('/department-admins/role')
      .then((response) => {
        const data: DataSource[] = response.data.map(
          (departmentAdmin: DepartmentAdmin) => {
            return {
              key: departmentAdmin.id,
              username: departmentAdmin.User.username,
              firstName: departmentAdmin.User.firstName,
              lastName: departmentAdmin.User.lastName,
              department: departmentAdmin.Department.name,
              action: (
                <Button
                  colorScheme="red"
                  borderRadius={'full'}
                  onClick={() => deleteDepartmentAdmin(departmentAdmin.id)}
                >
                  Sil
                </Button>
              ),
            };
          }
        );
        setDepartmentAdmins(data);
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

  /* Departments */
  useEffect(() => {
    apiClient
      .get('/departments')
      .then((response) => {
        setDepartments(response.data);
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

  return (
    <>
      <Navbar />
      <Center h="60vh">
        <Container>
          <Box
            py={{ base: '0', sm: '8' }}
            px={{ base: '4', sm: '10' }}
            bg={{ base: 'gray.50', sm: 'bg.surface' }}
            boxShadow={{ base: 'none', sm: 'md' }}
            borderRadius={{ base: 'none', sm: 'xl' }}
          >
            <VStack>
              <Heading mb={4}>Bölüm Başkanı Belirle</Heading>
              <Form
                onFinish={handleSubmit(onSubmit)}
                layout="vertical"
                style={{ width: 300 }}
                size="large"
              >
                <FormLabel mt={5}>Kullanıcılar:</FormLabel>
                <Form.Item name="user">
                  <Select
                    showSearch
                    placeholder="Kullanıcı Seçiniz"
                    optionFilterProp="children"
                    onChange={onChangeUser}
                    filterOption={filterOption}
                    options={users.map((user) => ({
                      value: user.id,
                      label: `${
                        user.username
                      } (${user.firstName.toLocaleUpperCase()} ${user.lastName.toLocaleUpperCase()})`,
                    }))}
                  />
                </Form.Item>
                <FormLabel mt={10}>Bölüm:</FormLabel>
                <Form.Item name="department">
                  <Select
                    showSearch
                    placeholder="Bölüm Seçiniz"
                    optionFilterProp="children"
                    onChange={onChange}
                    filterOption={filterOption}
                    options={departments.map((department: Department) => {
                      return {
                        value: department.id,
                        label: department.name,
                      };
                    })}
                  />
                </Form.Item>
                <Flex mt={10} justifyContent={'center'}>
                  <Button
                    mt={3}
                    borderRadius={'full'}
                    size={'lg'}
                    type="submit"
                    colorScheme="blue"
                  >
                    Ata
                  </Button>
                </Flex>
              </Form>
            </VStack>
          </Box>
        </Container>
      </Center>
      <Box>
        <Flex justifyContent="center">
          <Heading size="lg" mt={4} mb={4}>
            Bölüm Başkanları
          </Heading>
        </Flex>
        <AntTable
          columns={columns}
          dataSource={departmentAdmins}
          loading={tableLoading}
        />
      </Box>
    </>
  );
};

export default SetDepartmentAdmin;
