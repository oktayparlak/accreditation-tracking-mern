import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Center, Heading, VStack, useToast } from '@chakra-ui/react';

interface User {
  firstName: string;
  lastName: string;
  role: string;
}

const Home: React.FC = () => {
  // const navigate = useNavigate();
  // const toast = useToast();
  // useEffect(() => {
  //   if (localStorage.getItem('token') === null) {
  //     toast({
  //       title: 'Giriş Yapmalısınız',
  //       position: 'top',
  //       status: 'error',
  //       duration: 1500,
  //       isClosable: true,
  //     });
  //     navigate('/login');
  //   }
  // }, []);

  return (
    <>
      <Navbar />
      <Center>
        <Heading mt={10}> Lütfen Yapılacak İşlemi Seçiniz</Heading>
      </Center>
    </>
  );
};

export default Home;
