import React from 'react';
import Navbar from '../components/Navbar';
import {
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
} from '@chakra-ui/react';

const CreateUser = () => {
  return (
    <>
      <Navbar />
      <Container mt={10}>
        <Heading textAlign={'center'} mb={10}>
          Kişi Oluştur
        </Heading>
        <VStack spacing={8}>
          <form>
            <FormControl isRequired mb={5} id="name">
              <FormLabel>Ad</FormLabel>
              <Input bg={'white'} type="text" />
            </FormControl>
            <FormControl isRequired mb={5} id="surname">
              <FormLabel>Soyad</FormLabel>
              <Input bg={'white'} type="text" />
            </FormControl>
            <FormControl isRequired mb={5} id="email">
              <FormLabel>E-posta</FormLabel>
              <Input bg={'white'} type="email" />
            </FormControl>
            <FormControl isRequired mb={5} id="phone">
              <FormLabel>Telefon</FormLabel>
              <Input bg={'white'} type="tel" />
            </FormControl>
            <Flex justifyContent={'center'}>
              <Button
                borderRadius={'full'}
                size={'lg'}
                type="submit"
                colorScheme="blue"
              >
                Oluştur
              </Button>
            </Flex>
          </form>
        </VStack>
      </Container>
    </>
  );
};

export default CreateUser;
