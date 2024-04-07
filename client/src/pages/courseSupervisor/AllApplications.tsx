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
import { FieldValues, useForm } from 'react-hook-form';
import apiClient from '../../services/api-client';
import UserFeaturesMenu from '../../components/UserFeaturesMenu';
import { roles, User } from '../../interfaces/types';

interface DataSource {
  key: string;
  email: string;
  firstName: string;
  lastName: string;
  courseName: string;
  inc: React.ReactNode;
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
    title: 'Ders Adı',
    dataIndex: 'courseName',
    key: 'courseName',
  },
  {
    title: 'İncele',
    dataIndex: 'inc',
    key: 'inc',
  },
];

const AllApplications: React.FC = () => {
  const toast = useToast();
  const { register, handleSubmit } = useForm();
  const [users, setUsers] = useState<DataSource[]>([]);
  const [loading, setLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
  const [reset, setReset] = useState({});

  const data = [
    {
      key: '1',
      email: 'oktay@mail.com',
      firstName: 'Oktay',
      lastName: 'Parlak',
      courseName: 'Yazılım Mühendisliği',
      inc: (
        <UserFeaturesMenu dataId={'1'} dataUrl={'/users'} setReset={setReset} />
      ),
    },
    {
      key: '2',
      email: 'fatih@mail.com',
      firstName: 'Fatih',
      lastName: 'Taner',
      courseName: 'Bilgisayar Mühendisliği',
      inc: (
        <UserFeaturesMenu dataId={'1'} dataUrl={'/users'} setReset={setReset} />
      ),
    },
  ];

  useEffect(() => {
    //setTableLoading(true);
    apiClient
      .get('/applications')
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Navbar />
      <Flex margin={4}>
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
                Başvurular
              </Heading>
            </Center>
            <AntTable
              loading={tableLoading}
              dataSource={data}
              columns={columns}
            ></AntTable>
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default AllApplications;
