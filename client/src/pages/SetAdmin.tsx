import Navbar from '../components/Navbar';
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
import { Select, Form } from 'antd';
import { FieldValues, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import apiClient from '../services/api-client';
import { User } from './Users';

const filterOption = (
  input: string,
  option?: { label: string; value: string }
) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

const SetAdmin = () => {
  const [users, setUsers] = useState<User[]>([]);

  const toast = useToast();
  const { handleSubmit, setValue } = useForm();

  const onChange = (value: string) => {
    setValue('role', value);
  };

  const onChangeUser = (value: string) => {
    setValue('user', value);
  };

  const onSubmit = (data: FieldValues) => {};

  useEffect(() => {
    apiClient
      .get('users/no-role')
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
  }, []);

  return (
    <>
      <Navbar />
      <Center h="75vh">
        <Container>
          <Box
            py={{ base: '0', sm: '8' }}
            px={{ base: '4', sm: '10' }}
            bg={{ base: 'gray.50', sm: 'bg.surface' }}
            boxShadow={{ base: 'none', sm: 'md' }}
            borderRadius={{ base: 'none', sm: 'xl' }}
          >
            <VStack>
              <Heading mb={4}>Yönetici Ata</Heading>
              <Form
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
                        user.username
                      } (${user.firstName.toLocaleUpperCase()} ${user.lastName.toLocaleUpperCase()})`,
                    }))}
                  />
                </Form.Item>
                <FormLabel mt={10}>Roller:</FormLabel>
                <Form.Item name="role">
                  <Select
                    showSearch
                    placeholder="Rol Seçiniz"
                    optionFilterProp="children"
                    onChange={onChange}
                    filterOption={filterOption}
                    options={[
                      {
                        value: 'FACULTY_ADMIN',
                        label: 'Fakülte Yöneticisi',
                      },
                      {
                        value: 'DEPARTMENT_ADMIN',
                        label: 'Bölüm Yöneticisi',
                      },
                      {
                        value: 'COURSE_ADMIN',
                        label: 'Ders Yöneticisi',
                      },
                      {
                        value: 'COURSE_SUPERVISOR',
                        label: 'Ders Sorumlusu',
                      },
                      {
                        value: '',
                        label: '-',
                      },
                    ]}
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
    </>
  );
};

export default SetAdmin;
