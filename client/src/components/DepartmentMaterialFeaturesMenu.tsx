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
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import apiClient from '../services/api-client';
import { FieldValues, get, set, useForm } from 'react-hook-form';
import { Course, DepartmentMaterial } from '../interfaces/types';

interface FeaturesMenuProps {
  dataId: string;
  dataUrl: string;
  setReset: React.Dispatch<React.SetStateAction<any>>;
}

const DepartmentMaterialFeaturesMenu = ({
  dataId,
  dataUrl,
  setReset,
}: FeaturesMenuProps) => {
  const toast = useToast();

  const { register, handleSubmit, setValue, getValues } = useForm();

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
      .patch(`${dataUrl}/${dataId}`, {
        content: newData.content,
        contributionLevel: newData.contributionLevel,
      })
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
        const data = response.data;
        setValue('departmentName', data.Department.name);
        setValue('number', data.number);
        setValue('content', data.content);
        setValue('contributionLevel', data.contributionLevel);
        setValue('facultyId', data.Department.Faculty.id);
        setValue('facultyName', data.Department.Faculty.name);
        setValue('departmentId', data.departmentId);
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
                <FormControl id="facultyId" mb={3}>
                  <FormLabel>Fakülte</FormLabel>
                  <Select
                    isDisabled
                    value={getValues('facultyId')}
                    bg={'white'}
                  >
                    <option
                      key={getValues('facultyId')}
                      value={getValues('facultyId')}
                    >
                      {getValues('facultyName')}
                    </option>
                  </Select>
                </FormControl>
                <FormControl id="departmentId" mb={3}>
                  <FormLabel>Bölüm</FormLabel>
                  <Select
                    isDisabled
                    value={getValues('departmentId')}
                    bg={'white'}
                  >
                    <option
                      key={getValues('departmentId')}
                      value={getValues('departmentId')}
                    >
                      {getValues('departmentName')}
                    </option>
                  </Select>
                </FormControl>
                <FormControl id="number" mb={3} isRequired>
                  <FormLabel>Numara</FormLabel>
                  <Input
                    isDisabled
                    {...register('number')}
                    type="number"
                    bg={'white'}
                  />
                </FormControl>
                <FormControl id="content" mb={3} isRequired>
                  <FormLabel>İçerik</FormLabel>
                  <Input {...register('content')} type="text" bg={'white'} />
                </FormControl>
                <FormControl id="contributionLevel" mb={3} isRequired>
                  <FormLabel>Katkı Düzeyi</FormLabel>
                  <NumberInput defaultValue={1} min={1} max={5} bg={'white'}>
                    <NumberInputField {...register('contributionLevel')} />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
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

export default DepartmentMaterialFeaturesMenu;
