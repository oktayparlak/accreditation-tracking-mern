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
import { FieldValues, set, useForm } from 'react-hook-form';
import { Course } from '../interfaces/types';

interface FeaturesMenuProps {
  dataId: string;
  dataUrl: string;
  setReset: React.Dispatch<React.SetStateAction<any>>;
}

const MeasuringToolsFeaturesMenu = ({
  dataId,
  dataUrl,
  setReset,
}: FeaturesMenuProps) => {
  const toast = useToast();
  const [courses, setCourses] = useState<Course[]>([]);

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
        ...newData,
        impactRate: newData.impactRate / 100,
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
        setValue('courseId', response.data.courseId);
        setValue('name', response.data.name);
        setValue('impactRate', response.data.impactRate * 100);
        setValue('questionCount', response.data.questionCount);
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
      .get('/courses')
      .then((response) => {
        setCourses(response.data);
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
                <FormControl id="courseId" mb={3}>
                  <FormLabel>Ders</FormLabel>
                  <Select isDisabled value={getValues('courseId')} bg={'white'}>
                    {courses.map((course: Course) => (
                      <option key={course.id} value={course.id}>
                        {course.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl id="name" mb={3} isRequired>
                  <FormLabel>Ad</FormLabel>
                  <Input {...register('name')} type="text" bg={'white'} />
                </FormControl>
                <FormControl id="impactRate" mb={3} isRequired>
                  <FormLabel>Etki oranı</FormLabel>
                  <Input
                    {...register('impactRate')}
                    type="number"
                    bg={'white'}
                  />
                </FormControl>
                <FormControl id="questionCount" mb={3} isRequired>
                  <FormLabel>Soru Sayısı</FormLabel>
                  <Input
                    {...register('questionCount')}
                    type="number"
                    bg={'white'}
                  />
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

export default MeasuringToolsFeaturesMenu;
