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
import { Course, CourseSupervisor, User } from '../../interfaces/types';

interface DataSource {
  key: string;
  email: string;
  firstName: string;
  lastName: string;
  course: string;
  action: React.ReactNode;
}

const columns = [
  {
    title: 'E-posta',
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

const SetCourseSupervisor = () => {
  const [tableLoading, setTableLoading] = useState<boolean>(false);
  const [reset, setReset] = useState<any>({});

  const [users, setUsers] = useState<User[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [courseSupervisors, setCourseSupervisors] = useState<DataSource[]>([]);

  const toast = useToast();
  const { handleSubmit, setValue } = useForm();
  const formRef = useRef(null);

  const onChange = (value: string) => {
    setValue('courseId', value);
  };

  const onChangeUser = (value: string) => {
    setValue('userId', value);
  };

  const onSubmit = (data: FieldValues) => {
    apiClient
      .post('/course-supervisors', data)
      .then((response) => {
        toast({
          position: 'bottom-right',
          status: 'success',
          title: 'Ders Sorumlusu Atandı',
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

  const deleteCourseSupervisor = (id: string) => {
    apiClient
      .delete(`/course-supervisors/${id}`)
      .then(() => {
        toast({
          position: 'bottom-right',
          status: 'success',
          title: 'Ders Sorumlusu Silindi',
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
      .get('/users/role?role=COURSE_SUPERVISOR')
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

  /* Course Supervisor Table */
  useEffect(() => {
    setTableLoading(true);
    apiClient
      .get('/course-supervisors/role')
      .then((response) => {
        const data: DataSource[] = response.data.map(
          (courseSupervisor: CourseSupervisor) => {
            return {
              key: courseSupervisor.id,
              email: courseSupervisor.User.email,
              firstName: courseSupervisor.User.firstName,
              lastName: courseSupervisor.User.lastName,
              course: courseSupervisor.Course.name,
              action: (
                <Button
                  colorScheme="red"
                  borderRadius={'full'}
                  onClick={() => deleteCourseSupervisor(courseSupervisor.id)}
                >
                  Sil
                </Button>
              ),
            };
          }
        );
        setCourseSupervisors(data);
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

  /* Courses */
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
              <Heading mb={4}>Ders Sorumlusu Belirle</Heading>
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
                <FormLabel mt={10}>Dersler:</FormLabel>
                <Form.Item name="department">
                  <Select
                    showSearch
                    placeholder="Ders Seçiniz"
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
            Ders Sorumluları
          </Heading>
        </Flex>
        <AntTable
          columns={columns}
          dataSource={courseSupervisors}
          loading={tableLoading}
        />
      </Box>
    </>
  );
};

export default SetCourseSupervisor;
