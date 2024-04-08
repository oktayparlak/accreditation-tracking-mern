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
import UserFeaturesMenu from '../../components/UserFeaturesMenu';
import { Application, roles, User } from '../../interfaces/types';
import { ApplicationDetails } from '../../components/ApplicationDetails';

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
  const [applications, setApplications] = useState<DataSource[]>([]);
  const [tableLoading, setTableLoading] = useState(false);

  useEffect(() => {
    setTableLoading(true);
    apiClient
      .get('/applications')
      .then((response) => {
        const data: DataSource[] = response.data.map(
          (application: Application) => {
            return {
              key: application.id,
              email: application.User.email,
              firstName: application.User.firstName,
              lastName: application.User.lastName,
              courseName: application.Course.name,
              inc: <ApplicationDetails dataId={application.id} />,
            };
          }
        );
        setApplications(data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setTableLoading(false);
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
              dataSource={applications}
              columns={columns}
            ></AntTable>
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default AllApplications;
