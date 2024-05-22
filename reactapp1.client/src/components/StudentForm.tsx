import React, { useEffect, useState, useContext } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  Heading,
  useToast,
  Flex,
  Spacer,
  Tooltip,
  Icon,
} from '@chakra-ui/react';
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaPhone, FaUniversity, FaCalendarAlt } from 'react-icons/fa';
import axios from 'axios';
import { Store } from '../Store'; // Adjust the import path to your Store context
import { getFacultiesByUniversityId } from '../services/facultyService'; // Adjust the import path to your faculty service

interface Faculty {
  id?: number;
  name: string;
  universityId?: number;
}

const StudentForm: React.FC = () => {
  const { state } = useContext(Store);
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const initialStudentState = {
    name: '',
    email: '',
    address: '',
    age: 0,
    year: '',
    faculty: '',
    phoneNumber: '',
    universityId: state.universityID,
  };
  const [student, setStudent] = useState(initialStudentState);
  const toast = useToast();

  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        const response = await getFacultiesByUniversityId(state.universityID);
        setFaculties(response.data);
      } catch (error) {
        console.error('Failed to fetch faculties:', error);
      }
    };

    fetchFaculties();
  }, [state.universityID]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setStudent(prevStudent => ({ ...prevStudent, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`/api/Student/CreateStudents`, student);
      toast({
        title: 'Student created.',
        description: 'The student has been created successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      // Reset the form to its initial state
      setStudent(initialStudentState);
    } catch (error) {
      toast({
        title: 'Error.',
        description: 'There was an error creating the student.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      console.error('Failed to create student:', error);
    }
  };

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      h="100vh"
      bg="gray.100"
      p={4}
      bgImage="url('/path-to-your-image.jpg')"
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
      position="relative"
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bg: 'rgba(0, 0, 0, 0.5)',
      }}
    >
      <Box
        maxW="lg"
        w="full"
        p={8}
        borderWidth={1}
        borderRadius="lg"
        boxShadow="2xl"
        bgGradient="linear(to-r, teal.500, green.500)"
        position="relative"
        zIndex={1}
      >
        <Heading mb={6} color="white" textAlign="center">Student Registration Form</Heading>
        <Stack as="form" spacing={6} onSubmit={handleSubmit}>
          <FormControl id="name" isRequired>
            <FormLabel color="white">
              <Icon as={FaUser} mr={2} /> Name
            </FormLabel>
            <Input
              type="text"
              name="name"
              value={student.name}
              onChange={handleChange}
              focusBorderColor="white"
              bg="whiteAlpha.800"
            />
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel color="white">
              <Icon as={FaEnvelope} mr={2} /> Email
            </FormLabel>
            <Input
              type="email"
              name="email"
              value={student.email}
              onChange={handleChange}
              focusBorderColor="white"
              bg="whiteAlpha.800"
            />
          </FormControl>
          <FormControl id="address">
            <FormLabel color="white">
              <Icon as={FaMapMarkerAlt} mr={2} /> Address
            </FormLabel>
            <Input
              type="text"
              name="address"
              value={student.address}
              onChange={handleChange}
              focusBorderColor="white"
              bg="whiteAlpha.800"
            />
          </FormControl>
          <FormControl id="age" isRequired>
            <FormLabel color="white">
              <Icon as={FaCalendarAlt} mr={2} /> Age
            </FormLabel>
            <Input
              type="number"
              name="age"
              value={student.age}
              onChange={handleChange}
              focusBorderColor="white"
              bg="whiteAlpha.800"
            />
          </FormControl>
          <FormControl id="year">
            <FormLabel color="white">
              <Icon as={FaUniversity} mr={2} /> Year
            </FormLabel>
            <Input
              type="text"
              name="year"
              value={student.year}
              onChange={handleChange}
              focusBorderColor="white"
              bg="whiteAlpha.800"
            />
          </FormControl>
          <FormControl id="faculty" isRequired>
            <FormLabel color="white">
              <Icon as={FaUniversity} mr={2} /> Faculty
            </FormLabel>
            <Select
              name="faculty"
              placeholder="Select faculty"
              value={student.faculty}
              onChange={handleChange}
              focusBorderColor="white"
              bg="whiteAlpha.800"
            >
              {faculties.map(faculty => (
                <option key={faculty.name} value={faculty.name}>
                  {faculty.name}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl id="phoneNumber">
            <FormLabel color="white">
              <Icon as={FaPhone} mr={2} /> Phone Number
            </FormLabel>
            <Input
              type="text"
              name="phoneNumber"
              value={student.phoneNumber}
              onChange={handleChange}
              focusBorderColor="white"
              bg="whiteAlpha.800"
            />
          </FormControl>
          <Input type="hidden" name="universityId" value={student.universityId} />
          <Flex>
            <Spacer />
            <Tooltip label="Create Student" aria-label="Create Student Tooltip">
              <Button type="submit" colorScheme="whiteAlpha" size="lg" rightIcon={<Icon as={FaUser} />}>
                Create Student
              </Button>
            </Tooltip>
          </Flex>
        </Stack>
      </Box>
    </Flex>
  );
};

export default StudentForm;
