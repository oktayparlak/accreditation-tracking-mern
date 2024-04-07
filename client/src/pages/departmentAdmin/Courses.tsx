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
import { FieldValues, set, useForm } from 'react-hook-form';
import apiClient from '../../services/api-client';
import CourseFeaturesMenu from '../../components/CourseFeaturesMenu';
import { Course, Department } from '../../interfaces/types';

interface DataSource {
  key: string;
  Department: string;
  name: string;
  credit: number;
  ects: number;
  academicYear: string;
  studentCount: number;
  compulsory: boolean;
  inc: React.ReactNode;
}

const columns = [
  {
    title: 'Bölüm Adı',
    dataIndex: 'Department',
    key: 'Department',
  },
  {
    title: 'Ders Adı',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Kredi',
    dataIndex: 'credit',
    key: 'credit',
  },
  {
    title: 'AKTS',
    dataIndex: 'ects',
    key: 'ects',
  },
  {
    title: 'Akademik Yıl',
    dataIndex: 'academicYear',
    key: 'academicYear',
  },
  {
    title: 'Öğrenci Sayısı',
    dataIndex: 'studentCount',
    key: 'studentCount',
  },
  {
    title: 'Zorunluluk',
    dataIndex: 'compulsory',
    key: 'compulsory',
  },
  {
    title: 'İncele',
    dataIndex: 'inc',
    key: 'inc',
  },
];

const Courses: React.FC = () => {
  const toast = useToast();
  const { register, handleSubmit } = useForm();
  const formRef = useRef(null);

  const [courses, setCourses] = useState<DataSource[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
  const [reset, setReset] = useState({});

  /* For Form Selection */
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
            error.response
              ? error.response.data?.error?.message
              : 'Sunucu Hatası'
          }`,
          duration: 1500,
        });
      });
  }, [reset]);

  /** Courses */
  useEffect(() => {
    setTableLoading(true);
    apiClient
      .get('/courses')
      .then((response) => {
        if (response.status === 200) {
          const data: DataSource[] = response.data.map((course: Course) => {
            return {
              key: course.id,
              Department: course.Department.name,
              name: course.name,
              credit: course.credit,
              ects: course.ects,
              academicYear: course.academicYear,
              studentCount: course.studentCount,
              compulsory: course.compulsory ? 'Evet' : 'Hayır',
              inc: (
                <CourseFeaturesMenu
                  dataId={course.id}
                  dataUrl="/courses"
                  setReset={setReset}
                />
              ),
            };
          });
          setCourses(data);
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
            error.response
              ? error.response.data?.error.message
              : 'Sunucu Hatası'
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
      .post('/courses', data)
      .then((response) => {
        if (response.status === 201) {
          toast({
            position: 'bottom-left',
            status: 'success',
            title: `Ders başarıyla oluşturuldu.`,
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
            error.response
              ? error.response.data?.error.message
              : 'Sunucu Hatası'
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
                Ders Oluştur
              </Heading>
            </Center>
            <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
              <FormControl id="departmentId" mb={3} isRequired>
                <FormLabel>Bölüm</FormLabel>
                <Select
                  placeholder="Bölüm Seçiniz"
                  {...register('departmentId')}
                  bg={'white'}
                >
                  {departments.map((department: Department) => (
                    <option key={department.id} value={department.id}>
                      {department.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl id="code" mb={3} isRequired>
                <FormLabel>Kod</FormLabel>
                <Input {...register('code')} bg={'white'} type="text" />
              </FormControl>
              <FormControl id="name" mb={3} isRequired>
                <FormLabel>Ad</FormLabel>
                <Input {...register('name')} bg={'white'} type="text" />
              </FormControl>
              <FormControl id="credit" mb={3} isRequired>
                <FormLabel>Kredi</FormLabel>
                <Input {...register('credit')} bg={'white'} type="number" />
              </FormControl>
              <FormControl id="ects" mb={3} isRequired>
                <FormLabel>AKTS</FormLabel>
                <Input {...register('ects')} bg={'white'} type="number" />
              </FormControl>
              <FormControl id="academicYear" mb={3} isRequired>
                <FormLabel>Akademik Yıl</FormLabel>
                <Input
                  {...register('academicYear')}
                  bg={'white'}
                  type="number"
                />
              </FormControl>
              <FormControl id="studentCount" mb={3} isRequired>
                <FormLabel>Öğrenci Sayısı</FormLabel>
                <Input
                  {...register('studentCount')}
                  bg={'white'}
                  type="number"
                />
              </FormControl>
              <FormControl id="compulsory" mb={3} isRequired>
                <FormLabel>Zorunlu</FormLabel>
                <Select {...register('compulsory')} bg={'white'}>
                  <option value="true">Evet</option>
                  <option value="false">Hayır</option>
                </Select>
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
                Dersler
              </Heading>
            </Center>
            <AntTable
              loading={tableLoading}
              dataSource={courses}
              columns={columns}
            ></AntTable>
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default Courses;
