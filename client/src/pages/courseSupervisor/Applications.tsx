import React, { useEffect, useRef, useState } from 'react';
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

interface Course {
  Course: any;
  id: string;
  name: string;
}

export const Applications = () => {
  const count = useRef(0);
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
    const affectedMaterialsFields = Object.keys(data).filter((key) =>
      key.includes('affectedMaterials')
    );
    const hasEmptyAffectedMaterials = affectedMaterialsFields.some(
      (field) => !data[field] || data[field].length === 0
    );

    if (hasEmptyAffectedMaterials) {
      toast({
        title: 'Etkilediği Madde alanı boş bırakılamaz!',
        status: 'error',
        duration: 1500,
        isClosable: true,
      });
      return;
    }

    const transformedData = {
      courseId: selectedCourseId,
      measuringTools: measuringTools.map((tool) => ({
        id: tool.id,
        questions: Array.from({ length: tool.questionCount }, (_, i) => ({
          number: i + 1,
          average: data[`measuringTools[${i}, ${tool.name}].averageScore`],
          fullPoint: data[`measuringTools[${i}, ${tool.name}].totalScore`],
          releatedItems:
            data[`measuringTools[${i}, ${tool.name}].affectedMaterials`],
        })),
      })),
    };
    const formData = new FormData();

    data.files.fileList.forEach((fileData: any, index: number) => {
      formData.append(`reports`, fileData.originFileObj);
    });
    formData.append('data', JSON.stringify(transformedData));

    apiClient
      .post('/applications', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((response) => {
        toast({
          title: 'Başvuru başarıyla oluşturuldu!',
          status: 'success',
          duration: 1500,
          isClosable: true,
        });
      })
      .catch((error) => {
        toast({
          position: 'bottom-right',
          status: 'error',
          title: `${
            error.response
              ? error.response.data?.error.message
              : 'Sunucu Hatası'
          }`,
          duration: 1500,
        });
      });
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
                    <Form onFinish={onSubmit}>
                      <Flex justifyContent={'center'}>
                        <VStack>
                          <Heading mt={4} size="md" mb={3}>
                            Ölçme Araçları
                          </Heading>
                        </VStack>
                      </Flex>
                      <Flex justify={'center'}>
                        <FormItem name="files">
                          <Upload
                            beforeUpload={() => false}
                            listType="text"
                            onChange={handleUploadChange}
                            key={count.current++}
                          >
                            <AntButton icon={<UploadOutlined />}>
                              Dosya Yükle
                            </AntButton>
                          </Upload>
                        </FormItem>
                      </Flex>
                      {measuringTools.map((material, index) => (
                        <Center>
                          <Box key={index}>
                            <VStack spacing={2}>
                              <Heading size="sm" mt={3}>
                                Ölçme Aracı Adı: {material.name}
                              </Heading>
                              {Array.from(
                                { length: material.questionCount },
                                (_, i) => (
                                  <>
                                    <Text mt={2} key={i}>
                                      Soru: {i + 1}
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
                                          name={`measuringTools[${i}, ${material.name}].totalScore`}
                                        >
                                          <Input
                                            type="number"
                                            {...register(
                                              `measuringTools[${i}].totalScore`,
                                              { required: true }
                                            )}
                                            placeholder="Puan giriniz."
                                            style={{ width: '100px' }}
                                            required
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
                                            type="number"
                                            {...register(
                                              `measuringTools[${i}].averageScore`,
                                              {
                                                required:
                                                  'Ortalama Puan alanı boş bıraklamaz!  ',
                                              }
                                            )}
                                            placeholder="Puan giriniz."
                                            style={{ width: '100px' }}
                                            required
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
                          Gönder
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
