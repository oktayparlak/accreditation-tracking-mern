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
import { Faculty } from '../interfaces/types';

interface FeaturesMenuProps {
  dataId: string;
  dataUrl: string;
  setReset: React.Dispatch<React.SetStateAction<any>>;
}

const DepartmentFeaturesMenu = ({
  dataId,
  dataUrl,
  setReset,
}: FeaturesMenuProps) => {
  const toast = useToast();
  const [faculties, setFaculties] = useState<Faculty[]>([]);

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
    console.log(faculties);

    // apiClient
    //   .patch(`${dataUrl}/${dataId}`, newData)
    //   .then(() => {
    //     toast({
    //       position: 'top',
    //       status: 'success',
    //       title: `Güncelleme İşlemi Başarılı`,
    //       duration: 1000,
    //     });
    //     setReset({});
    //     onClose();
    //   })
    //   .catch((error) => {
    //     toast({
    //       position: 'top',
    //       status: 'error',
    //       title: `${
    //         error.response ? error.response.data.error.message : 'Sunucu Hatası'
    //       }`,
    //       duration: 1500,
    //     });
    //   });
  };

  const fetchData = () => {
    apiClient
      .get(`${dataUrl}/${dataId}`)
      .then((response) => {
        setValue('faculty', response.data.facultyId);
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
    apiClient
      .get('/faculties')
      .then((response) => {
        setFaculties(response.data);
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
                <FormControl id="faculty" mb={3}>
                  <FormLabel>Fakülte</FormLabel>
                  <Select {...register('faculty')} bg={'white'}>
                    {faculties.map((faculty: Faculty) => (
                      <option key={faculty.id} value={faculty.id}>
                        {faculty.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
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

export default DepartmentFeaturesMenu;
