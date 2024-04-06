import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import apiClient from '../services/api-client';
import { FieldValues, useForm } from 'react-hook-form';
import { Department, Faculty } from '../interfaces/types';

interface FeaturesMenuProps {
  dataId: string;
  dataUrl: string;
  setReset: React.Dispatch<React.SetStateAction<any>>;
}

const CourseFeaturesMenu = ({
  dataId,
  dataUrl,
  setReset,
}: FeaturesMenuProps) => {
  const toast = useToast();
  const [departments, setDepartments] = useState<Department[]>([]);

  const { register, handleSubmit, setValue } = useForm();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const deleteData = () => {
    apiClient
      .delete(`${dataUrl}/${dataId}`)
      .then(() => {
        toast({
          position: 'top-right',
          status: 'success',
          title: `Silme İşlemi Başarılı`,
          duration: 1000,
        });
        setReset({});
      })
      .catch((error) => {
        toast({
          position: 'top-right',
          status: 'error',
          title: `${
            error.response ? error.response.data.error.message : 'Sunucu Hatası'
          }`,
          duration: 1500,
        });
      });
  };

  const updateData = (newData: FieldValues) => {
    apiClient
      .patch(`${dataUrl}/${dataId}`, newData)
      .then(() => {
        toast({
          position: 'top',
          status: 'success',
          title: `Güncelleme İşlemi Başarılı`,
          duration: 1000,
        });
        setReset({});
        onClose();
      })
      .catch((error) => {
        toast({
          position: 'top',
          status: 'error',
          title: `${
            error.response ? error.response.data.error.message : 'Sunucu Hatası'
          }`,
          duration: 1500,
        });
      });
  };

  const fetchData = () => {
    apiClient
      .get(`${dataUrl}/${dataId}`)
      .then((response) => {
        setValue('departmentId', response.data.departmentId);
        setValue('code', response.data.code);
        setValue('name', response.data.name);
        setValue('credit', response.data.credit);
        setValue('ects', response.data.ects);
        setValue('academicYear', response.data.academicYear);
        setValue('studentCount', response.data.studentCount);
        setValue('compulsory', response.data.compulsory);
      })
      .catch((error) => {
        toast({
          position: 'top-right',
          status: 'error',
          title: `${
            error.response ? error.response.data.error.message : 'Sunucu Hatası'
          }`,
          duration: 1500,
        });
      });
    apiClient
      .get('/departments')
      .then((response) => {
        setDepartments(response.data);
      })
      .catch((error) => {
        toast({
          position: 'bottom-right',
          status: 'error',
          title: `${
            error.response
              ? error.response.data?.error?.message
              : 'Sunucu Hatası'
          }`,
          duration: 1500,
        });
      });
  };

  return (
    <>
      <Menu>
        <MenuButton
          as={Button}
          rightIcon={<ChevronDownIcon />}
          borderRadius={'full'}
          color={'white'}
          bg={'blue.500'}
          colorScheme="blue"
        >
          İncele
        </MenuButton>
        <MenuList>
          <MenuItem
            onClick={() => {
              fetchData();
              onOpen();
            }}
          >
            Düzenle
          </MenuItem>
          <MenuItem onClick={deleteData}>Sil</MenuItem>
        </MenuList>
      </Menu>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(updateData)}>
            <ModalHeader>Düzenle</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Box>
                <FormControl id="departmentId" mb={3}>
                  <FormLabel>Bölüm</FormLabel>
                  <Select {...register('departmentId')} bg={'white'}>
                    {departments.map((department: Department) => (
                      <option key={department.id} value={department.id}>
                        {department.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl id="code" mb={3}>
                  <FormLabel>Kod</FormLabel>
                  <Input {...register('code')} bg={'white'} type="text" />
                </FormControl>
                <FormControl id="name" mb={3}>
                  <FormLabel>Ad</FormLabel>
                  <Input {...register('name')} bg={'white'} type="text" />
                </FormControl>
                <FormControl id="credit" mb={3}>
                  <FormLabel>Kredi</FormLabel>
                  <Input {...register('credit')} bg={'white'} type="number" />
                </FormControl>
                <FormControl id="ects" mb={3}>
                  <FormLabel>AKTS</FormLabel>
                  <Input {...register('ects')} bg={'white'} type="number" />
                </FormControl>
                <FormControl id="academicYear" mb={3}>
                  <FormLabel>Akademik Yıl</FormLabel>
                  <Input
                    {...register('academicYear')}
                    bg={'white'}
                    type="number"
                  />
                </FormControl>
                <FormControl id="studentCount" mb={3}>
                  <FormLabel>Öğreci Sayısı</FormLabel>
                  <Input
                    {...register('studentCount')}
                    bg={'white'}
                    type="number"
                  />
                </FormControl>
                <FormControl id="compulsory" mb={3}>
                  <FormLabel>Zorunlu</FormLabel>
                  <Select {...register('compulsory')} bg={'white'}>
                    <option value="true">Evet</option>
                    <option value="false">Hayır</option>
                  </Select>
                </FormControl>
              </Box>
            </ModalBody>
            <ModalFooter>
              <Button type="submit" colorScheme="blue" mr={3}>
                Kaydet
              </Button>
              <Button onClick={onClose}>Vazgeç</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CourseFeaturesMenu;
