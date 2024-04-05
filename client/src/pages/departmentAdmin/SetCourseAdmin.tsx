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
import React, { useEffect, useState } from 'react';
import apiClient from '../../services/api-client';
import {
  Course,
  CourseAdmin,
  Department,
  DepartmentAdmin,
  User,
} from '../../interfaces/types';

interface DataSource {
  key: string;
  username: string;
  firstName: string;
  lastName: string;
  course: string;
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
    title: 'Ders',
    dataIndex: 'course',
    key: 'course',
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

const SetCourseAdmin = () => {
  const [tableLoading, setTableLoading] = useState<boolean>(false);
  const [reset, setReset] = useState<any>({});

  const [users, setUsers] = useState<User[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [courseAdmins, setCourseAdmins] = useState<DataSource[]>([]);

  const toast = useToast();
  const { handleSubmit, setValue } = useForm();

  const onChange = (value: string) => {
    setValue('courseId', value);
  };

  const onChangeUser = (value: string) => {
    setValue('userId', value);
  };

  const onSubmit = (data: FieldValues) => {
    apiClient
      .post('/course-admins', data)
      .then((response) => {
        toast({
          position: 'bottom-right',
          status: 'success',
          title: 'Ders Yöneticisi Atandı',
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

  const deleteCourseAdmin = (id: string) => {
    apiClient
      .delete(`/course-admins/${id}`)
      .then(() => {
        toast({
          position: 'bottom-right',
          status: 'success',
          title: 'Ders Yöneticisi Silindi',
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
      .get('/users/role?role=COURSE_ADMIN')
      .then((response) => {
        console.log(response.data);

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

  /* Course Admins Table */
  useEffect(() => {
    setTableLoading(true);
    apiClient
      .get('/course-admins/role')
      .then((response) => {
        const data: DataSource[] = response.data.map(
          (courseAdmin: CourseAdmin) => {
            return {
              key: courseAdmin.id,
              username: courseAdmin.User.username,
              firstName: courseAdmin.User.firstName,
              lastName: courseAdmin.User.lastName,
              course: courseAdmin.Course.name,
              action: (
                <Button
                  colorScheme="red"
                  borderRadius={'full'}
                  onClick={() => deleteCourseAdmin(courseAdmin.id)}
                >
                  Sil
                </Button>
              ),
            };
          }
        );
        setCourseAdmins(data);
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
      .get('/courses')
      .then((response) => {
        setCourses(response.data);
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
              <Heading mb={4}>Ders Yöneticisi Belirle</Heading>
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
                <FormLabel mt={10}>Ders:</FormLabel>
                <Form.Item name="department">
                  <Select
                    showSearch
                    placeholder="Bölüm Seçiniz"
                    optionFilterProp="children"
                    onChange={onChange}
                    filterOption={filterOption}
                    options={courses.map((course: Course) => {
                      return {
                        value: course.id,
                        label: course.name,
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
            Ders Yöneticileri
          </Heading>
        </Flex>
        <AntTable
          columns={columns}
          dataSource={courseAdmins}
          loading={tableLoading}
        />
      </Box>
    </>
  );
};

export default SetCourseAdmin;
