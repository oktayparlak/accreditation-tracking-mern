import React, { useEffect, useState } from 'react';
import apiClient from '../services/api-client';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Text,
  Box,
  VStack,
  Heading,
  Grid,
  useColorModeValue,
} from '@chakra-ui/react';
import { Flex } from 'antd';
import { Application } from '../interfaces/types';

interface ApplicationDetailsProps {
  dataId: string;
}

export const ApplicationDetails = ({ dataId }: ApplicationDetailsProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [details, setDetails] = useState<Application | null>(null);

  const triggerModal = () => {
    onOpen();
    apiClient
      .get(`/applications/${dataId}`)
      .then((response) => {
        setDetails(response.data);
        console.log(response.data, 'details');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClick = (data: any) => {
    apiClient
      .get(`applications/download/${data}`)
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'file.pdf');
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const cardBg = useColorModeValue('white', 'gray.800');
  const cardShadow = useColorModeValue('base', 'none');

  return (
    <>
      <Button
        onClick={triggerModal}
        borderRadius={'full'}
        color={'white'}
        bg={'blue.500'}
        colorScheme="blue"
      >
        İncele
      </Button>
      <Modal
        onClose={onClose}
        isOpen={isOpen}
        scrollBehavior="inside"
        size={'4xl'}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Başvuru Detayları</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={2} align="start">
              <Flex justify="space-between">
                <Box width={400}>
                  <Heading size="md">Kullanıcı Bilgileri</Heading>
                  <Text>İsim: {details?.User.firstName}</Text>
                  <Text>Soyisim: {details?.User.lastName}</Text>
                  <Text>Email: {details?.User.email}</Text>
                </Box>
                <Box width={300}>
                  <Text fontWeight="bold">Dosyalar</Text>
                  {details?.Files.map((file) => (
                    <Box key={`file-${file.id}`} mb={4}>
                      <Button
                        onClick={() => handleClick(file.id)}
                        variant="link"
                        colorScheme="blue"
                      >
                        <Text>{file.name}</Text>
                      </Button>
                    </Box>
                  ))}
                </Box>
              </Flex>
              <Heading size="md">Ders Bilgileri</Heading>
              <Text>Ders Adı: {details?.Course.name}</Text>
              <Text>Ders Kodu: {details?.Course.code}</Text>
              <Text>Ders Kredisi: {details?.Course.credit}</Text>
              <Text>Ders AKTS: {details?.Course.ects}</Text>
              <Text>Akademik Yıl: {details?.Course.academicYear}</Text>

              <Heading size="md">Ölçme Araçları</Heading>
              <Grid
                templateColumns={{
                  base: 'repeat(1, 1fr)',
                  md: 'repeat(3, 1fr)',
                }}
                gap={6}
              >
                {details?.MeasuringTools.map((tool) => (
                  <Box
                    key={`tool-${tool.id}`}
                    p={4}
                    shadow={cardShadow}
                    bg={cardBg}
                    borderRadius="md"
                  >
                    <Heading size="sm" mb={2}>
                      Ölçme Aracı: {tool.name}
                    </Heading>
                    <Text mb={4}>Etki Oranı: {tool.impactRate}</Text>
                    {tool.questions?.map((question) => (
                      <Box
                        key={`question-${tool.id}-${question.number}`}
                        mb={4}
                      >
                        <Text fontWeight="bold" mb={2}>
                          Soru {question.number}
                        </Text>
                        <Flex>
                          <Text mr={3}>Tam Puan: {question.fullPoint}</Text>
                          <Text>Ortalama Puan: {question.average}</Text>
                        </Flex>
                        <Grid templateColumns="repeat(1, 1fr)" gap={2}>
                          {question.relatedItems.map((item: any, index) => (
                            <Box
                              key={`item-${tool.id}-${question.number}-${index}`}
                              marginY={2}
                              p={2}
                              borderRadius="sm"
                              bg="#EDF2F7"
                            >
                              <Text>
                                Number: {item.LearningMaterial?.number}
                              </Text>
                              <Text>
                                Etkilediği Madde:{' '}
                                {item.LearningMaterial?.content}
                              </Text>
                              <Text>
                                Etki Düzeyi:{' '}
                                {item.LearningMaterial?.contributionLevel}
                              </Text>
                              <Text>
                                impactSum: {item.LearningMaterial?.impactSum}
                              </Text>
                              <Text>
                                impactTotal:{' '}
                                {item.LearningMaterial?.impactTotal}
                              </Text>
                              <Text>
                                successRate: {item.LearningMaterial?.succesRate}
                              </Text>
                              <Text>
                                successPoint:{' '}
                                {item.LearningMaterial?.succesPoint}
                              </Text>
                            </Box>
                          ))}
                        </Grid>
                      </Box>
                    ))}
                  </Box>
                ))}
              </Grid>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
