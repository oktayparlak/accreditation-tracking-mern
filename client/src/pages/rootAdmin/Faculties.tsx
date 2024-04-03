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
import FacultyFeaturesMenu from '../../components/FacultyFeaturesMenu';
import { Faculty } from '../../interfaces/types';

interface DataSource {
  key: string;
  name: string;
  inc: React.ReactNode;
}

const columns = [
  {
    title: 'Fakülte Adı',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'İncele',
    dataIndex: 'inc',
    key: 'inc',
  },
];

const Faculties: React.FC = () => {
  const toast = useToast();
  const { register, handleSubmit } = useForm();

  const [faculties, setFaculties] = useState<DataSource[]>([]);
  const [loading, setLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
  const [reset, setReset] = useState(false);

  useEffect(() => {
    setTableLoading(true);
    apiClient
      .get('/faculties')
      .then((response) => {
        if (response.status === 200) {
          const data: DataSource[] = response.data.map((faculty: Faculty) => {
            return {
              key: faculty.id,
              name: faculty.name,
              inc: (
                <FacultyFeaturesMenu
                  dataId={faculty.id}
                  dataUrl="/faculties"
                  setReset={setReset}
                />
              ),
            };
          });
          setFaculties(data);
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
      .post('/faculties', data)
      .then((response) => {
        if (response.status === 201) {
          toast({
            position: 'bottom-left',
            status: 'success',
            title: `Fakülte başarıyla oluşturuldu.`,
            duration: 1500,
          });
          setFaculties([
            {
              ...response.data,
              inc: (
                <FacultyFeaturesMenu
                  dataId={response.data.id}
                  dataUrl="/faculties"
                  setReset={setReset}
                />
              ),
            },
            ...faculties,
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
                Fakülte Oluştur
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
                Fakülteler
              </Heading>
            </Center>
            <AntTable
              loading={tableLoading}
              dataSource={faculties}
              columns={columns}
            ></AntTable>
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default Faculties;
