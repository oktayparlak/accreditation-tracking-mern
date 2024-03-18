import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Select,
  VStack,
  useToast,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FieldValues, useForm } from 'react-hook-form';

import apiClient from '../services/api-client';

interface ErrorProps {
  message: string;
}
interface LoginProps {
  role: string;
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const [loading, setLoading] = useState(false);

  const onSubmit = (data: FieldValues) => {
    setLoading(true);
    apiClient
      .post('auths/login', data)
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
          toast({
            position: 'top',
            status: 'success',
            title: `Giriş başarılı. Hoşgeldiniz ${response.data.user.firstName} ${response.data.user.lastName}`,
            duration: 1000,
          });
          return navigate('/');
        }
        toast({
          position: 'top',
          status: 'error',
          title: `${response.data.details.message}`,
          duration: 3000,
        });
      })
      .catch((error) => {
        toast({
          position: 'top',
          status: 'error',
          title: `${
            error.response ? error.response.data.error.message : 'Sunucu Hatası'
          }`,
          duration: 3000,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Center h="100vh">
        <Container>
          <Box
            py={{ base: '0', sm: '8' }}
            px={{ base: '4', sm: '10' }}
            bg={{ base: 'gray.50', sm: 'bg.surface' }}
            boxShadow={{ base: 'none', sm: 'md' }}
            borderRadius={{ base: 'none', sm: 'xl' }}
          >
            <VStack>
              <Image mb={4} src="/assets/image.png" boxSize={'150px'} />
              <Heading mb={4}>Giriş Yap</Heading>
              <form style={{ width: '100%' }} onSubmit={handleSubmit(onSubmit)}>
                <FormControl isRequired id="role" mb={5}>
                  <FormLabel>Rol</FormLabel>
                  <Select {...register('role')} bg={'white'} placeholder=" ">
                    <option value="ROOT_ADMIN">Sistem Yöneticisi</option>
                    <option value="FACULTY_ADMIN">Fakülte Yöneticisi</option>
                    <option value="DEPARTMENT_ADMIN">Bölüm Yöneticisi</option>
                    <option value="COURSE_ADMIN">Ders Yöneticisi</option>
                    <option value="COURSE_SUPERVISOR">Ders Sorumlusu</option>
                  </Select>
                </FormControl>
                <FormControl isRequired mb={5} id="username">
                  <FormLabel>Kullanıcı Adı</FormLabel>
                  <Input {...register('username')} bg={'white'} type="text" />
                </FormControl>
                <FormControl isRequired mb={5} id="password">
                  <FormLabel>Şifre</FormLabel>
                  <Input
                    {...register('password')}
                    bg={'white'}
                    type="password"
                  />
                </FormControl>
                <Flex justifyContent={'center'}>
                  <Button
                    borderRadius={'full'}
                    size={'lg'}
                    isLoading={loading}
                    type="submit"
                    colorScheme="blue"
                  >
                    Giriş Yap
                  </Button>
                </Flex>
              </form>
            </VStack>
          </Box>
        </Container>
      </Center>
    </>
  );
};

export default Login;

/**
 * import {
  AbsoluteCenter,
  Box,
  Button,
  Center,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Stack,
  VStack,
} from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import React, { FormEvent } from 'react';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Formun varsayılan davranışını engellemek için kullanılır
    console.log('Form çalıştı');
  };

  return (
    <>
      <Center h="100vh" w="100vw">
        <Container>
          <Flex marginBottom={8} justifyContent={'center'}>
            <Heading>Karabuk University</Heading>
          </Flex>
          <Box
            py={{ base: '0', sm: '8' }}
            px={{ base: '4', sm: '10' }}
            bg={{ base: 'transparent', sm: 'bg.surface' }}
            boxShadow={{ base: 'none', sm: 'md' }}
            borderRadius={{ base: 'none', sm: 'xl' }}
          >
            <VStack spacing={4}>
              <Heading>Login</Heading>
              <form onSubmit={() => console.log('çalıştı')}>
                <FormControl>
                  <FormLabel htmlFor="username">Username</FormLabel>
                  <Input id="username" type="text" />
                  <FormErrorMessage marginBottom="5">
                    Username is required
                  </FormErrorMessage>
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Input id="password" type="password" />
                  <FormHelperText marginBottom="5">
                    Password is required
                  </FormHelperText>
                </FormControl>
                <Button colorScheme="teal">Login</Button>
              </form>
            </VStack>
          </Box>
        </Container>
      </Center>
    </>
  );
};

export default Login;
 */
