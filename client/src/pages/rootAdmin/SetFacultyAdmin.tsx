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
import { FieldValues, set, useForm } from 'react-hook-form';
import React, { useEffect, useRef, useState } from 'react';
import apiClient from '../../services/api-client';
import { Faculty, FacultyAdmin, User } from '../../interfaces/types';

interface DataSource {
  key: string;
  email: string;
  firstName: string;
  lastName: string;
  faculty: string;
  action: React.ReactNode;
}

const columns = [
  {
    title: 'E-Posta',
    dataIndex: 'email',
    key: 'email',
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
    title: 'Fakülte',
    dataIndex: 'faculty',
    key: 'faculty',
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

const SetFacultyAdmin = () => {
  const [tableLoading, setTableLoading] = useState<boolean>(false);
  const [reset, setReset] = useState<any>({});

  const [users, setUsers] = useState<User[]>([]);
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [facultyAdmins, setFacultyAdmins] = useState<DataSource[]>([]);

  const toast = useToast();
  const { handleSubmit, setValue } = useForm();
  const formRef = useRef(null);

  const onChange = (value: string) => {
    setValue('facultyId', value);
  };

  const onChangeUser = (value: string) => {
    setValue('userId', value);
  };

  const onSubmit = (data: FieldValues) => {
    apiClient
      .post('/faculty-admins', data)
      .then((response) => {
        toast({
          position: 'bottom-right',
          status: 'success',
          title: 'Fakülte Admini Atandı',
          duration: 1500,
        });
        if (formRef.current) {
          (formRef.current as any).resetFields();
        }
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

  const deleteFacultyAdmin = (id: string) => {
    apiClient
      .delete(`/faculty-admins/${id}`)
      .then(() => {
        toast({
          position: 'bottom-right',
          status: 'success',
          title: 'Fakülte Başkanı Başarıyla Silindi',
          duration: 1500,
        });
        if (formRef.current) {
          (formRef.current as any).resetFields();
        }
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
      .get('/users/role?role=FACULTY_ADMIN')
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
  }, [reset]);

  /* Faculty Admins Table */
  useEffect(() => {
    setTableLoading(true);
    apiClient
      .get('/faculty-admins/role')
      .then((response) => {
        const data: DataSource[] = response.data.map(
          (facultyAdmin: FacultyAdmin) => {
            return {
              key: facultyAdmin.id,
              email: facultyAdmin.User.email,
              firstName: facultyAdmin.User.firstName,
              lastName: facultyAdmin.User.lastName,
              faculty: facultyAdmin.Faculty.name,
              action: (
                <Button
                  colorScheme="red"
                  borderRadius={'full'}
                  onClick={() => deleteFacultyAdmin(facultyAdmin.id)}
                >
                  Sil
                </Button>
              ),
            };
          }
        );
        setFacultyAdmins(data);
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

  /* Faculties */
  useEffect(() => {
    apiClient
      .get('/faculties')
      .then((response) => {
        setFaculties(response.data);
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
  }, [reset]);

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
              <Heading mb={4}>Fakülte Başkanı Belirle</Heading>
              <Form
                ref={formRef}
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
                        user.email
                      } (${user.firstName.toLocaleUpperCase()} ${user.lastName.toLocaleUpperCase()})`,
                    }))}
                  />
                </Form.Item>
                <FormLabel mt={10}>Fakülte:</FormLabel>
                <Form.Item name="faculty">
                  <Select
                    showSearch
                    placeholder="Fakülte Seçiniz"
                    optionFilterProp="children"
                    onChange={onChange}
                    filterOption={filterOption}
                    options={faculties.map((faculty: Faculty) => {
                      return {
                        value: faculty.id,
                        label: faculty.name,
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
            Fakülte Başkanları
          </Heading>
        </Flex>
        <AntTable
          columns={columns}
          dataSource={facultyAdmins}
          loading={tableLoading}
        />
      </Box>
    </>
  );
};

export default SetFacultyAdmin;
