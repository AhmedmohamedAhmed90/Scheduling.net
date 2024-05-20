import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  Text,
  Grid,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import {Link}   from 'react-router-dom';

// Define the Register interface
interface Register {
  name: string;
  username: string;
  email: string;
  password: string;
  address: string;
  age: number;
  year: string;
  faculty: string;
  phoneNumber: string;
  UniversityId:string;
  
}

// Define the addUser function
const addUser = async (registerData: Register) => {
  return await axios.post(`http://localhost:5261/api/account/register`, registerData);
};

const SignupPage: React.FC = () => {
  // State variables for form fields
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [age, setAge] = useState("");
  const [year, setYear] = useState("");
  const [faculty, setFaculty] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [UniversityId, setUniversityId] = useState("");

  const [error, setError] = useState("");

  // Theme-related variables
  const bgColor = useColorModeValue("gray.50", "gray.700");
  const borderColor = useColorModeValue("gray.300", "gray.600");

  // Form submission handler
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const registerData: Register = {
      name,
      username,
      email,
      password,
      address,
      age: parseInt(age, 10),
      year,
      faculty,
      phoneNumber,
      UniversityId,
      
    };

    try {
      const response = await addUser(registerData);
      console.log("Success:", response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data || error.message);
        setError(error.response?.data || error.message);
      } else {
        console.error("Unexpected error:", error);
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <Box
      backgroundImage="url('/path/to/your/image.jpg')" // Adjust the path to your background image
      backgroundSize="cover"
      backgroundPosition="center"
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      px={4}
    >
      <Box
        shadow="lg"
        borderWidth="1px"
        rounded="lg"
        p={8}
        mt={20}
        bg={bgColor}
        borderColor={borderColor}
        maxWidth="800px"
        width="full"
        as="form"
        onSubmit={handleSubmit}
      >
        <Heading as="h2" size="lg" mb={6} textAlign="center">
          Sign up
        </Heading>
        {error && <Text color="red.500" mb={4}>{error}</Text>}
        <Grid templateColumns="1fr 1fr" gap={4}>
          <FormControl id="name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
          <FormControl id="username" isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <FormControl id="address" isRequired>
            <FormLabel>Address</FormLabel>
            <Input
              type="text"
              placeholder="Enter your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </FormControl>
          <FormControl id="age" isRequired>
            <FormLabel>Age</FormLabel>
            <Input
              type="number"
              placeholder="Enter your age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </FormControl>
          <FormControl id="year" isRequired>
            <FormLabel>Year</FormLabel>
            <Input
              type="text"
              placeholder="Enter your year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </FormControl>
          <FormControl id="faculty" isRequired>
            <FormLabel>Faculty</FormLabel>
            <Input
              type="text"
              placeholder="Enter your faculty"
              value={faculty}
              onChange={(e) => setFaculty(e.target.value)}
            />
          </FormControl>
          <FormControl id="phoneNumber" isRequired>
            <FormLabel>Phone Number</FormLabel>
            <Input
              type="text"
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </FormControl>
          <FormControl id="UniversityId" isRequired>
            <FormLabel>UniversityId</FormLabel>
            <Input
              type="text"
              placeholder="Enter your UniversityId"
              value={UniversityId}
              onChange={(e) => setUniversityId(e.target.value)}
            />
          </FormControl>
        </Grid>
        <Button mt={8} colorScheme="blue" width="full" type="submit">
          Sign up
        </Button>
        <Text mt={4} textAlign="center">
        Already have an account? {' '}
      <Link  to="/login" color="teal.500">
        Login
      </Link>
    </Text>
      </Box>
    </Box>
  );
};

export default SignupPage;
