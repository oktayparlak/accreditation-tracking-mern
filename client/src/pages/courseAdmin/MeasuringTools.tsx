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
  InputGroup,
  InputLeftAddon,
  Select,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { FieldValues, useForm } from 'react-hook-form';
import apiClient from '../../services/api-client';
import { Course, MeasuringTool } from '../../interfaces/types';
import MeasuringToolsFeaturesMenu from '../../components/MeasuringToolsFeaturesMenu';

interface DataSource {
  key: string;
  Course: string;
  name: string;
  impactRate: number;
  inc: React.ReactNode;
}

const columns = [
  {
    title: 'Ders Adı',
    dataIndex: 'Course',
    key: 'Course',
  },
  {
    title: 'Adı',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Etki oranı',
    dataIndex: 'impactRate',
    key: 'impactRate',
  },
  {
    title: 'İncele',
    dataIndex: 'inc',
    key: 'inc',
  },
];

const MeasuringTools: React.FC = () => {
  const toast = useToast();
  const { register, handleSubmit } = useForm();

  const [measuringTools, setMeasuringTools] = useState<DataSource[]>([]);
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
  }, []);

  /** Measuring Tools */
  useEffect(() => {
    setTableLoading(true);
    apiClient
      .get('/measuring-tools')
      .then((response) => {
        if (response.status === 200) {
          const data: DataSource[] = response.data.map(
            (measuringTools: MeasuringTool) => {
              return {
                key: measuringTools.id,
                Course: measuringTools.Course.name,
                name: measuringTools.name,
                impactRate: `%${measuringTools.impactRate * 100}`,
                inc: (
                  <MeasuringToolsFeaturesMenu
                    dataId={measuringTools.id}
                    dataUrl="/measuring-tools"
                    setReset={setReset}
                  />
                ),
              };
            }
          );
          setMeasuringTools(data);
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
      .post('/measuring-tools', { ...data, impactRate: data.impactRate / 100 })
      .then((response) => {
        if (response.status === 201) {
          toast({
            position: 'bottom-left',
            status: 'success',
            title: `Ölçme Aracı başarıyla oluşturuldu.`,
            duration: 1500,
          });
          setMeasuringTools([
            {
              ...response.data,
              Course: response.data.Course.name,
              inc: (
                <MeasuringToolsFeaturesMenu
                  dataId={response.data.id}
                  dataUrl="/measuring-tools"
                  setReset={setReset}
                />
              ),
            },
            ...measuringTools,
          ]);
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
                Ölçme Aracı oluştur
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
              <FormControl id="name" mb={3} isRequired>
                <FormLabel>Ad</FormLabel>
                <Input {...register('name')} bg={'white'} type="text" />
              </FormControl>
              <FormControl id="impactRate" mb={3} isRequired>
                <FormLabel>Etki Oranı</FormLabel>
                <InputGroup>
                  <InputLeftAddon bg={'white'}>%</InputLeftAddon>
                  <Input
                    {...register('impactRate')}
                    bg={'white'}
                    type="number"
                  />
                </InputGroup>
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
                Ölçme Araçları
              </Heading>
            </Center>
            <AntTable
              loading={tableLoading}
              dataSource={measuringTools}
              columns={columns}
            ></AntTable>
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default MeasuringTools;
