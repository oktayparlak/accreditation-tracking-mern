import { Heading } from '@chakra-ui/react';
import React from 'react';
import Navbar from '../components/Navbar';

const CreateFaculty = () => {
  return (
    <>
      <Navbar />
      <Heading textAlign={'center'} mb={10}>
        Fakülte Oluştur
      </Heading>
    </>
  );
};

export default CreateFaculty;
