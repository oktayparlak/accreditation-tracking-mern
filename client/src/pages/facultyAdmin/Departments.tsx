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
  VStack,
  useToast,
} from '@chakra-ui/react';
import { FieldValues, useForm } from 'react-hook-form';
import apiClient from '../../services/api-client';
import DepartmentFeaturesMenu from '../../components/DepartmentFeaturesMenu';

interface Faculty {
  id: string;
  name: string;
}

interface Department {
  id: string;
  Faculty: Faculty;
  name: string;
}

interface DataSource {
  key: string;
  name: string;
  inc: React.ReactNode;
}

const columns = [
  {
    title: 'Bölüm Adı',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'İncele',
    dataIndex: 'inc',
    key: 'inc',
  },
];

const Departments: React.FC = () => {
  const toast = useToast();
  const { register, handleSubmit } = useForm();

  const [departments, setDepartments] = useState<DataSource[]>([]);
  const [loading, setLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
  const [reset, setReset] = useState({});

  useEffect(() => {
    setTableLoading(true);
    apiClient
      .get('/departments')
      .then((response) => {
        if (response.status === 200) {
          const data: DataSource[] = response.data.map(
            (department: Department) => {
              return {
                key: department.id,
                name: department.name,
                inc: (
                  <DepartmentFeaturesMenu
                    dataId={department.id}
                    dataUrl="/departments"
                    setReset={setReset}
                  />
                ),
              };
            }
          );
          setDepartments(data);
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
      .post('/departments', data)
      .then((response) => {
        if (response.status === 201) {
          toast({
            position: 'bottom-left',
            status: 'success',
            title: `Bölüm başarıyla oluşturuldu.`,
            duration: 1500,
          });
          setDepartments([
            {
              ...response.data,
              inc: (
                <DepartmentFeaturesMenu
                  dataId={response.data.id}
                  dataUrl="/departments"
                  setReset={setReset}
                />
              ),
            },
            ...departments,
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
                Bölüm Oluştur
              </Heading>
            </Center>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl id="name" mb={3} isRequired>
                <FormLabel>Ad</FormLabel>
                <Input {...register('name')} bg={'white'} type="text" />
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
                Bölümler
              </Heading>
            </Center>
            <AntTable
              loading={tableLoading}
              dataSource={departments}
              columns={columns}
            ></AntTable>
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default Departments;
