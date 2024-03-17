import {
  Box,
  Button,
  Center,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
} from '@chakra-ui/react';
import { jsx, css, Global, ClassNames } from '@emotion/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <Center h="100vh">
        <Container>
          <Box
            py={{ base: '0', sm: '8' }}
            px={{ base: '4', sm: '10' }}
            bg={{ base: 'transparent', sm: 'bg.surface' }}
            boxShadow={{ base: 'none', sm: 'md' }}
            borderRadius={{ base: 'none', sm: 'xl' }}
          >
            <VStack>
              <Heading mb={8}>Login</Heading>
              <form style={{ width: '100%' }} onSubmit={() => navigate('/')}>
                <FormControl mb={5} id="username">
                  <FormLabel>Username</FormLabel>
                  <Input type="text" />
                </FormControl>
                <FormControl mb={5} id="password">
                  <FormLabel>Password</FormLabel>
                  <Input type="password" />
                </FormControl>
                <Button type="submit" colorScheme="teal">
                  Login
                </Button>
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
