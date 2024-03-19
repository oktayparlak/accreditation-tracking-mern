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
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import Navbar from '../components/Navbar';

const CreateFaculty = () => {
  return (
    <>
      <Navbar />
      <Flex mt={4} ml={4}>
        <Box flex={1} bg={'gray.100'} borderRadius={10} mr={4}>
          <VStack>
            <Heading size="lg">Fakülte Oluştur</Heading>
            <form action="">
              <FormControl id="role" mb={5} isRequired>
                <FormLabel>Rol</FormLabel>
                <Select bg={'white'} placeholder=" ">
                  <option value="ROOT_ADMIN">Sistem Yöneticisi</option>
                  <option value="FACULTY_ADMIN">Fakülte Yöneticisi</option>
                  <option value="DEPARTMENT_ADMIN">Bölüm Yöneticisi</option>
                  <option value="COURSE_ADMIN">Ders Yöneticisi</option>
                  <option value="COURSE_SUPERVISOR">Ders Sorumlusu</option>
                </Select>
              </FormControl>
              <FormControl id="firstName" mb={5} isRequired>
                <FormLabel>Ad</FormLabel>
                <Input type="text" />
              </FormControl>
              <FormControl id="lastName" mb={5} isRequired>
                <FormLabel>Soyad</FormLabel>
                <Input type="text" />
              </FormControl>
              <FormControl id="username" mb={5} isRequired>
                <FormLabel>Kullanıcı Adı</FormLabel>
                <Input type="text" />
              </FormControl>
              <FormControl id="password" mb={5} isRequired>
                <FormLabel>Şifre</FormLabel>
                <Input type="password" />
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
        </Box>
        <Box flex={4} bg={'gray.50'} borderRadius={10} ml={4}>
          <Center>
            <Heading>Fakülteler</Heading>
          </Center>
          <Table variant={'simple'}>
            <Thead>
              <Tr>
                <Th>Ad</Th>
                <Th>Soyad</Th>
                <Th>Rol</Th>
                <Th>İncele</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>inches</Td>
                <Td>millimetres</Td>
                <Td>25.4</Td>
                <Td>X</Td>
              </Tr>
              <Tr>
                <Td>feet</Td>
                <Td>centimetres</Td>
                <Td>30.48</Td>
                <Td>X</Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
      </Flex>
    </>
  );
};

export default CreateFaculty;
