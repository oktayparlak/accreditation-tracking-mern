import React, { useEffect, useState } from 'react';
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
import { Course, LearningMaterial } from '../../interfaces/types';
import LearningMaterialFeaturesMenu from '../../components/LearningMaterialFeaturesMenu';

interface DataSource {
  key: string;
  courseId: string;
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
  const { register, handleSubmit } = useForm();

  const [learningMaterials, setLearningMaterials] = useState<DataSource[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
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
    setLoading(true);
    apiClient
      .post('/learning-materials', data)
      .then((response) => {
        if (response.status === 201) {
          toast({
            position: 'bottom-left',
            status: 'success',
            title: `Öğrenim Çıktısı oluşturuldu.`,
            duration: 1500,
          });
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
              <Heading fontSize={26} textAlign={'center'} mb={4}>
                Öğrenim Çıktısı Oluştur
              </Heading>
            </Center>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl id="courseId" mb={3} isRequired>
                <FormLabel>Ders</FormLabel>
                <Select {...register('courseId')} bg={'white'}>
                  {courses.map((courses: Course) => (
                    <option key={courses.id} value={courses.id}>
                      {courses.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl id="content" mb={3} isRequired>
                <FormLabel>İçerik</FormLabel>
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
