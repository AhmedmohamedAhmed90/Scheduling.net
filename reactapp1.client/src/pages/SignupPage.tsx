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
import { Link } from "react-router-dom";

// Define the Register interface
interface Register {
  email: string;
  password: string;
  UniversityName: string;
  UniversityAddress: string;
  UniversityPhoneNumber: string;
}

// Define the addUser function
const addUser = async (registerData: Register) => {
  return await axios.post(`/api/account/register`, registerData);
};

const SignupPage: React.FC = () => {
  // State variables for form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [UniversityName, setUniversityName] = useState("");
  const [UniversityAddress, setUniversityAddress] = useState("");
  const [UniversityPhoneNumber, setUniversityPhoneNumber] = useState("");
  const [error, setError] = useState("");

  // Theme-related variables
  const bgColor = useColorModeValue("gray.50", "gray.700");
  const borderColor = useColorModeValue("gray.300", "gray.600");

  // Form submission handler
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const registerData: Register = {
      email,
      password,
      UniversityName,
      UniversityAddress,
      UniversityPhoneNumber,
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
        {error && (
          <Text color="red.500" mb={4}>
            {error}
          </Text>
        )}
        <Grid templateColumns="1fr 1fr" gap={4}>
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

          <FormControl id="UniversityName" isRequired>
            <FormLabel>University Name</FormLabel>
            <Input
              type="text"
              placeholder="Enter your University Name"
              value={UniversityName}
              onChange={(e) => setUniversityName(e.target.value)}
            />
          </FormControl>
          <FormControl id="UniversityAddress" isRequired>
            <FormLabel>University Address</FormLabel>
            <Input
              type="number"
              placeholder="Enter your University Address"
              value={UniversityAddress}
              onChange={(e) => setUniversityAddress(e.target.value)}
            />
          </FormControl>
          <FormControl id="UniversityPhoneNumber" isRequired>
            <FormLabel>University Phone Number</FormLabel>
            <Input
              type="text"
              placeholder="Enter your University Phone Number"
              value={UniversityPhoneNumber}
              onChange={(e) => setUniversityPhoneNumber(e.target.value)}
            />
          </FormControl>
        </Grid>
        <Button mt={8} colorScheme="blue" width="full" type="submit">
          Sign up
        </Button>
        <Text mt={4} textAlign="center">
          Already have an account?{" "}
          <Link to="/" color="teal.500">
            Login
          </Link>
        </Text>
      </Box>
    </Box>
  );
};

export default SignupPage;
