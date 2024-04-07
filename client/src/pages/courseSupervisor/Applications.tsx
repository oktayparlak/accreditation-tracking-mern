import React, { useEffect, useState } from 'react';
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
  Button,
} from '@chakra-ui/react';
import { Select, Form, Upload, Button as AntButton, Input } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import apiClient from '../../services/api-client';
import { FieldValues, useForm } from 'react-hook-form';
import FormItem from 'antd/es/form/FormItem';

interface Questions {
  Vize: string[];
  Final: string[];
}

interface Course {
  Course: any;
  id: string;
  name: string;
}

export const Applications = () => {
  const toast = useToast();
  const [isFirstFormSelected, setIsFirstFormSelected] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<string>('');
  const [learningMaterials, setLearningMaterials] = useState<any[]>([]);
  const [measuringTools, setMeasuringTools] = useState<any[]>([]);
  const { register, handleSubmit, setValue, getValues } = useForm();

  useEffect(() => {
    if (selectedCourse) {
      apiClient
        .get(`/measuring-tools/course/${selectedCourseId}`)
        .then((response) => {
          setMeasuringTools(response.data);
        })
        .catch((error) => {
          console.error('Error fetching learning materials:', error);
        });
    }
  }, [selectedCourse]);

  useEffect(() => {
    if (selectedCourse) {
      apiClient
        .get(`/learning-materials/course/${selectedCourseId}`)
        .then((response) => {
          setLearningMaterials(response.data);
        })
        .catch((error) => {
          console.error('Error fetching learning materials:', error);
        });
    }
  }, [selectedCourse]);

  useEffect(() => {
    apiClient
      .get('/course-supervisors/my')
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        toast({
          title: 'Dersler getirilirken bir hata oluştu!',
          status: 'error',
          duration: 1500,
          isClosable: true,
        });
      });
  }, []);

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

  const handleForm1Select = (value: string, option: any) => {
    setSelectedCourse(value);
    setSelectedCourseId(option.key);
    setIsFirstFormSelected(false);
  };

  const onSubmit = (data: FieldValues) => {
    console.log(data);
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
                <Text style={{ fontWeight: 'bold' }}>Ders Seçim:</Text>
                <Select
                  showSearch
                  placeholder="Ders Seçiniz"
                  optionFilterProp="children"
                  onSelect={handleForm1Select}
                >
                  {courses.map((course, index) => (
                    <Select.Option
                      key={course.Course.id}
                      value={course.Course.name}
                    >
                      {course.Course.name}
                    </Select.Option>
                  ))}
                </Select>
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
                    <Form onFinish={onSubmit}>
                      {measuringTools.map((material, index) => (
                        <Center>
                          <Box key={index}>
                            <Heading size="sm" mt={3}>
                              Adı: {material.name}
                            </Heading>
                            <VStack spacing={2} align="start">
                              {Array.from(
                                { length: material.questionCount },
                                (_, i) => (
                                  <>
                                    <Text style={{ marginTop: '3px' }} key={i}>
                                      Soru {i + 1}
                                    </Text>
                                    <div
                                      style={{
                                        justifyContent: 'space-between',
                                        flexDirection: 'row',
                                        display: 'flex',
                                      }}
                                    >
                                      <div style={{ marginRight: '10px' }}>
                                        <Text>Tam Puan</Text>
                                        <FormItem
                                          name={`measuringTools[${i},${material.name}].totalScore`}
                                        >
                                          <Input
                                            {...register(
                                              `measuringTools[${i}].totalScore`,
                                              { required: true }
                                            )}
                                            placeholder="Puan giriniz."
                                            style={{ width: '100px' }}
                                          />
                                        </FormItem>
                                      </div>
                                      <div
                                        style={{
                                          marginRight: '10px',
                                          marginLeft: '10px',
                                        }}
                                      >
                                        <Text>Ortalama Puan</Text>
                                        <FormItem
                                          name={`measuringTools[${i}, ${material.name}].averageScore`}
                                        >
                                          <Input
                                            {...register(
                                              `measuringTools[${i}].averageScore`,
                                              { required: true }
                                            )}
                                            placeholder="Puan giriniz."
                                            style={{ width: '100px' }}
                                          />
                                        </FormItem>
                                      </div>
                                      <div style={{ marginLeft: '10px' }}>
                                        <Text>Etkilediği Madde</Text>
                                        <FormItem
                                          name={`measuringTools[${i}, ${material.name}].affectedMaterials`}
                                        >
                                          <Select
                                            {...register(
                                              `measuringTools[${i}].affectedMaterials`
                                            )}
                                            placeholder="Seçiniz"
                                            style={{ width: '200px' }}
                                            mode="multiple"
                                            maxCount={3}
                                            onChange={(value) =>
                                              setValue(
                                                `measuringTools[${i}].affectedMaterials`,
                                                value
                                              )
                                            }
                                          >
                                            {learningMaterials.map(
                                              (material) => (
                                                <Select.Option
                                                  key={material.id}
                                                  value={material.id}
                                                >
                                                  {material.content}
                                                </Select.Option>
                                              )
                                            )}
                                          </Select>
                                        </FormItem>
                                      </div>
                                    </div>
                                  </>
                                )
                              )}
                            </VStack>
                          </Box>
                        </Center>
                      ))}
                      <Center>
                        <Button
                          mt={3}
                          borderRadius={'full'}
                          size={'lg'}
                          type="submit"
                          colorScheme="blue"
                        >
                          Ata
                        </Button>
                      </Center>
                    </Form>
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
