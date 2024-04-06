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
import React from 'react';
import apiClient from '../services/api-client';
import { FieldValues, useForm } from 'react-hook-form';

interface FeaturesMenuProps {
  dataId: string;
  dataUrl: string;
  setReset: React.Dispatch<React.SetStateAction<any>>;
}

const UserFeaturesMenu = ({ dataId, dataUrl, setReset }: FeaturesMenuProps) => {
  const toast = useToast();

  const { register, handleSubmit, setValue } = useForm();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const deleteData = () => {
    apiClient
      .delete(`${dataUrl}/${dataId}`)
      .then((response) => {
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
      .then((response) => {
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
        setValue('role', response.data.role);
        setValue('firstName', response.data.firstName);
        setValue('lastName', response.data.lastName);
        setValue('email', response.data.email);
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
              {dataUrl === '/users' && (
                <Box>
                  <FormControl id="role" mb={3}>
                    <FormLabel>Rol</FormLabel>
                    <Select {...register('role')} bg={'white'}>
                      <option value="FACULTY_ADMIN">Fakülte Yöneticisi</option>
                      <option value="DEPARTMENT_ADMIN">Bölüm Yöneticisi</option>
                      <option value="COURSE_ADMIN">Ders Yöneticisi</option>
                      <option value="COURSE_SUPERVISOR">Ders Sorumlusu</option>
                      <option value="">-</option>
                    </Select>
                  </FormControl>
                  <FormControl id="firstName" mb={3}>
                    <FormLabel>Ad</FormLabel>
                    <Input
                      {...register('firstName')}
                      bg={'white'}
                      type="text"
                    />
                  </FormControl>
                  <FormControl id="lastName" mb={3}>
                    <FormLabel>Soyad</FormLabel>
                    <Input {...register('lastName')} bg={'white'} type="text" />
                  </FormControl>
                  <FormControl id="email" mb={3}>
                    <FormLabel>E-Posta</FormLabel>
                    <Input {...register('email')} bg={'white'} type="text" />
                  </FormControl>
                  <FormControl id="password" mb={1}>
                    <FormLabel>Şifre</FormLabel>
                    <Input
                      {...register('password')}
                      bg={'white'}
                      type="password"
                    />
                  </FormControl>
                </Box>
              )}
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

export default UserFeaturesMenu;
