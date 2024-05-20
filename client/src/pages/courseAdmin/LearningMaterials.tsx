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
  DepartmentMaterial,
  LearningMaterial,
} from '../../interfaces/types';
import LearningMaterialFeaturesMenu from '../../components/LearningMaterialFeaturesMenu';
import FormItem from 'antd/es/form/FormItem';
import { Select as AntSelect } from 'antd';

interface DataSource {
  key: string;
  courseId: string;
  departmentMaterials: number[];
  number: number;
  content: string;
  contributionLevel: number;
}

const columns = [
  {
    title: 'Ders Adı',
    dataIndex: 'Course',
    key: 'Course',
  },
  {
    title: 'Bölüm Çıktısı Numaraları',
    dataIndex: 'departmentMaterials',
    key: 'departmentMaterials',
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
    title: 'Katkı Düzeyi',
    dataIndex: 'contributionLevel',
    key: 'contributionLevel',
  },
  {
    title: 'İncele',
    dataIndex: 'inc',
    key: 'inc',
  },
];

const LearningMaterials: React.FC = () => {
  const toast = useToast();
  const { register, handleSubmit, setValue } = useForm();
  const formRef = useRef(null);

  const [learningMaterials, setLearningMaterials] = useState<DataSource[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [departmentMaterials, setDepartmentMaterials] = useState<
    DepartmentMaterial[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
  const [reset, setReset] = useState({});

  /* For Form Selection */
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
            error.response
              ? error.response.data?.error?.message
              : 'Sunucu Hatası'
          }`,
          duration: 1500,
        });
      });
  }, [reset]);

  /** Learning Materials Table*/
  useEffect(() => {
    setTableLoading(true);
    apiClient
      .get('/learning-materials/my')
      .then((response) => {
        if (response.status === 200) {
          const data: DataSource[] = response.data.map(
            (learningMaterial: LearningMaterial) => {
              return {
                key: learningMaterial.id,
                Course: learningMaterial.Course.name,
                departmentMaterials: learningMaterial.departmentMaterials?.map(
                  (number: number, index: number, array: number[]) => {
                    return index === array.length - 1 ? number : `${number}, `;
                  }
                ),
                number: learningMaterial.number,
                content: learningMaterial.content,
                contributionLevel: learningMaterial.contributionLevel,
                inc: (
                  <LearningMaterialFeaturesMenu
                    dataId={learningMaterial.id}
                    dataUrl="/learning-materials"
                    setReset={setReset}
                  />
                ),
              };
            }
          );
          setLearningMaterials(data);
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
    const departmentMaterials = data.departmentMaterialIds;
    data.departmentMaterialIds = undefined;
    setLoading(true);
    apiClient
      .post('/learning-materials', {
        ...data,
        departmentMaterials,
      })
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

  const fetchDepartmentMaterials = (courseId: string) => {
    apiClient
      .get(`/department-materials/course/${courseId}`)
      .then((response) => {
        console.log(response.data);

        setDepartmentMaterials(response.data);
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
                Öğrenim Çıktısı Oluştur
              </Heading>
            </Center>
            <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
              <FormControl
                id="courseId"
                mb={3}
                isRequired
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  fetchDepartmentMaterials(e.target.value)
                }
              >
                <FormLabel>Ders</FormLabel>
                <Select
                  placeholder="Ders Seçiniz"
                  {...register('courseId')}
                  bg={'white'}
                >
                  {courses.map((courses: Course) => (
                    <option key={courses.id} value={courses.id}>
                      {courses.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormItem name="Bölüm çıktıları">
                <AntSelect
                  onChange={(value) => setValue('departmentMaterialIds', value)}
                  mode="multiple"
                  maxCount={4}
                >
                  {departmentMaterials &&
                    departmentMaterials.map((departmentMaterial) => (
                      <AntSelect.Option
                        key={departmentMaterial.id}
                        value={departmentMaterial.number}
                      >
                        {departmentMaterial.number} {departmentMaterial.content}
                      </AntSelect.Option>
                    ))}
                </AntSelect>
              </FormItem>
              <FormControl id="content" mb={4} isRequired>
                <FormLabel>Öğrenme Çıktısı İçeriği</FormLabel>
                <Input {...register('content')} type="text" bg={'white'} />
              </FormControl>
              <FormControl id="contributionLevel" mb={3} isRequired>
                <FormLabel>Katkı Düzeyi</FormLabel>
                <NumberInput defaultValue={1} min={1} max={5} bg={'white'}>
                  <NumberInputField {...register('contributionLevel')} />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
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
                Öğrenme Çıktıları
              </Heading>
            </Center>
            <AntTable
              loading={tableLoading}
              dataSource={learningMaterials}
              columns={columns}
            ></AntTable>
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default LearningMaterials;
