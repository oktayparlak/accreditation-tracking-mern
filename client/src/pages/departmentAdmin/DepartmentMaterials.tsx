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
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { FieldValues, useForm } from 'react-hook-form';
import apiClient from '../../services/api-client';
import {
  Course,
  Department,
  DepartmentMaterial,
  Faculty,
  LearningMaterial,
} from '../../interfaces/types';
import DepartmentMaterialFeaturesMenu from '../../components/DepartmentMaterialFeaturesMenu';

interface DataSource {
  key: string;
  Department: string;
  Faculty: string;
  number: number;
  content: string;
}

const columns = [
  {
    title: 'Fakülte Adı',
    dataIndex: 'Faculty',
    key: 'Faculty',
  },
  {
    title: 'Bölüm Adı',
    dataIndex: 'Department',
    key: 'Department',
  },
  {
    title: 'Numara',
    dataIndex: 'number',
    key: 'number',
  },
  {
    title: 'İçerik',
    dataIndex: 'content',
    key: 'content',
  },
  {
    title: 'İncele',
    dataIndex: 'inc',
    key: 'inc',
  },
];

const DepartmentMaterials: React.FC = () => {
  const toast = useToast();
  const { register, handleSubmit } = useForm();
  const formRef = useRef(null);

  const [departmentMaterials, setDepartmentMaterials] = useState<DataSource[]>(
    []
  );
  const [departments, setDepartments] = useState<Department[]>([]);
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [loading, setLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
  const [reset, setReset] = useState({});

  /* For Form Selection */
  /** Faculties */
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
            error.response
              ? error.response.data?.error?.message
              : 'Sunucu Hatası'
          }`,
          duration: 1500,
        });
      });
  }, [reset]);

  /** Department Materials Table */
  useEffect(() => {
    setTableLoading(true);
    apiClient
      .get('/department-materials')
      .then((response) => {
        if (response.status === 200) {
          const data: DataSource[] = response.data.map(
            (departmentMaterial: DepartmentMaterial) => {
              return {
                key: departmentMaterial.id,
                Faculty: departmentMaterial.Department.Faculty.name,
                Department: departmentMaterial.Department.name,
                number: departmentMaterial.number,
                content: departmentMaterial.content,
                inc: (
                  <DepartmentMaterialFeaturesMenu
                    dataId={departmentMaterial.id}
                    dataUrl="/department-materials"
                    setReset={setReset}
                  />
                ),
              };
            }
          );
          setDepartmentMaterials(data);
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
      .post('/department-materials', data)
      .then((response) => {
        if (response.status === 201) {
          toast({
            position: 'bottom-left',
            status: 'success',
            title: `Öğrenim Çıktısı oluşturuldu.`,
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

  // Departments
  const fetchDepartments = (facultyId: string) => {
    apiClient
      .get(`/departments/faculty/${facultyId}`)
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
  };

  return (
    <>
      <Navbar />
      <Flex margin={4}>
        <Box flex={1} bg={'gray.100'} borderRadius={5} margin={4} padding={4}>
          <VStack>
            <Center>
              <Heading fontSize={26} textAlign={'center'} mb={4}>
                Bölüm Çıktısı Oluştur
              </Heading>
            </Center>
            <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
              <FormControl
                id="facultyId"
                mb={3}
                isRequired
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  fetchDepartments(e.target.value)
                }
              >
                <FormLabel>Fakülte</FormLabel>
                <Select placeholder="Fakülte Seçiniz" bg={'white'}>
                  {faculties.map((faculty: Faculty) => (
                    <option key={faculty.id} value={faculty.id}>
                      {faculty.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
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
              <FormControl id="content" mb={3} isRequired>
                <FormLabel>Bölüm Çıktısı İçeriği</FormLabel>
                <Input {...register('content')} type="text" bg={'white'} />
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
                Bölüm Çıktıları
              </Heading>
            </Center>
            <AntTable
              loading={tableLoading}
              dataSource={departmentMaterials}
              columns={columns}
            ></AntTable>
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default DepartmentMaterials;
