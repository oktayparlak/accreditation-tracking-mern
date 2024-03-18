import React from 'react';
import Navbar from '../components/Navbar';
import {
  Center,
  Container,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

const Users: React.FC = () => {
  return (
    <>
      <Navbar />
      <TableContainer>
        <Center>
          <Heading mt={10} mb={10}>
            Kullanıcılar
          </Heading>
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
      </TableContainer>
    </>
  );
};

export default Users;
