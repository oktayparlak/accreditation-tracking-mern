import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import {
  Box,
  Center,
  Container,
  Heading,
  useToast,
  FormLabel,
  VStack,
  Flex,
  Text,
} from '@chakra-ui/react';
import { Select, Form, Upload, Button as AntButton, Input } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

interface Questions {
  Vize: string[];
  Final: string[];
}

interface Data {
  [key: string]: Questions;
}

export const Applications = () => {
  const toast = useToast();
  const [isFirstFormSelected, setIsFirstFormSelected] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState<string>('');

  const handleUploadChange = async (info: any) => {
    const { status } = info.file;
    if (status === 'done') {
      toast({
        title: 'Dosya Yükleme Başarılı!',
        status: 'success',
        duration: 1500,
        isClosable: true,
      });
    } else if (status === 'error') {
      toast({
        title: 'Dosya Yükleme Başarısız!',
        status: 'error',
        duration: 1500,
        isClosable: true,
      });
    }
  };

  const handleForm1Select = (value: string) => {
    setSelectedCourse(value);
    setIsFirstFormSelected(false);
  };

  const data: Data = {
    matematik: {
      Vize: ['Soru 1', 'Soru 2', 'Soru 3'],
      Final: ['Soru 1', 'Soru 2', 'Soru 3'],
    },
    fizik: {
      Vize: ['Soru 1', 'Soru 2', 'Soru 3', 'Soru 4'],
      Final: ['Soru 1', 'Soru 2', 'Soru 3', 'Soru 4', 'Soru 5'],
    },
  };

  return (
    <>
      <Navbar />
      <Center h="110vh">
        <Container maxW="container.md" maxH="container.md" minH="container.md">
          <Box
            py={{ base: '0', sm: '8' }}
            px={{ base: '4', sm: '10' }}
            bg={{ base: 'gray.50', sm: 'bg.surface' }}
            boxShadow={{ base: 'none', sm: 'md' }}
            borderRadius={{ base: 'none', sm: 'xl' }}
          >
            <VStack>
              <Heading mb={4}>Başvuru Oluştur</Heading>
              <VStack spacing={4} align="center">
                <Upload
                  action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                  listType="text"
                  maxCount={6}
                  onChange={handleUploadChange}
                >
                  <AntButton icon={<UploadOutlined />}>
                    Dosya Yükle (Maksimum: 6)
                  </AntButton>
                </Upload>
                <Form layout="vertical" style={{ width: 300 }} size="large">
                  <FormLabel>Ders Seçim:</FormLabel>
                  <Form.Item name="user">
                    <Select
                      showSearch
                      placeholder="Ders Seçiniz"
                      optionFilterProp="children"
                      onSelect={handleForm1Select}
                    >
                      <Select.Option value="matematik">Matematik</Select.Option>
                      <Select.Option value="fizik">Fizik</Select.Option>
                    </Select>
                  </Form.Item>
                </Form>
                {isFirstFormSelected && (
                  <Text width="300px" color="gray.500">
                    Ölçme aracını kullanabilmek için önce ders seçimi
                    yapmalısınız!
                  </Text>
                )}
                {!isFirstFormSelected && selectedCourse && (
                  <Box width="500px">
                    <Center>
                      <Heading size="md" mb={3}>
                        Ölçme Aracı
                      </Heading>
                    </Center>
                    {Object.entries(data[selectedCourse]).map(
                      ([category, questions], index) => (
                        <Box key={index}>
                          <Heading size="sm" mt={3}>
                            Adı: {category}
                          </Heading>
                          <ul>
                            {questions.map(
                              (question: string, questionIndex: number) => (
                                <>
                                  <li style={{ margin: 5 }}>{question}</li>
                                  <Flex
                                    key={questionIndex}
                                    direction="row"
                                    justify="space-between"
                                    align="center"
                                  >
                                    <div>
                                      <Text>Tam Puan</Text>
                                      <Input
                                        placeholder="Puan Giriniz"
                                        style={{
                                          width: '100px',
                                        }}
                                      />
                                    </div>
                                    <div>
                                      <Text>Ortalama Puan</Text>
                                      <Input
                                        placeholder="Puan Giriniz"
                                        style={{
                                          width: '100px',
                                        }}
                                      />
                                    </div>
                                    <div>
                                      <Text>Etkilediği Madde</Text>
                                      <Select
                                        showSearch
                                        placeholder="Madde Seçiniz"
                                        style={{ width: '200px' }}
                                      >
                                        <Select.Option value="1">
                                          Madde 1
                                        </Select.Option>
                                        <Select.Option value="2">
                                          Madde 2
                                        </Select.Option>
                                        <Select.Option value="3">
                                          Madde 3
                                        </Select.Option>
                                        <Select.Option value="4">
                                          Madde 4
                                        </Select.Option>
                                        <Select.Option value="5">
                                          Madde 5
                                        </Select.Option>
                                      </Select>
                                    </div>
                                  </Flex>
                                </>
                              )
                            )}
                          </ul>
                        </Box>
                      )
                    )}
                  </Box>
                )}
              </VStack>
            </VStack>
          </Box>
        </Container>
      </Center>
    </>
  );
};
