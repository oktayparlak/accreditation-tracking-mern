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
import { FieldValues, set, useForm } from 'react-hook-form';

interface FeaturesMenuProps {
  dataId: string;
  dataUrl: string;
  setReset: React.Dispatch<React.SetStateAction<any>>;
}

const FacultyFeaturesMenu = ({
  dataId,
  dataUrl,
  setReset,
}: FeaturesMenuProps) => {
  const toast = useToast();

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
        setValue('name', response.data.name);
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
              <Box>
                <FormControl id="name" mb={3}>
                  <FormLabel>Ad</FormLabel>
                  <Input {...register('name')} bg={'white'} type="text" />
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

export default FacultyFeaturesMenu;
