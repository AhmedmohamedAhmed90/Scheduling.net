import React, { useContext, useState } from "react";
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
  FormHelperText,
} from "@chakra-ui/react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Store } from "../Store";

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
  const navigate = useNavigate();
  const store = useContext(Store);
  const { dispatch } = store;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [UniversityName, setUniversityName] = useState("");
  const [passwordError, setPasswordError] = useState("");
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
      dispatch({ type: "LOGIN", payload: response.data });
      navigate("/admindashboard");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data || error.message);
        setError(error.response?.data || error.message);
      } else {
        console.error("Unexpected error:", JSON.stringify(error, null, 2));
        setError("An unexpected error occurred");
      }
    }
  };

  const validatePassword = (password: string) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
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
              onChange={(e) => {
                const newPassword = e.target.value;
                setPassword(newPassword);

                if (!validatePassword(newPassword)) {
                  setPasswordError(
                    "Password must be minimum 8 characters, contain 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character"
                  );
                } else {
                  setPasswordError("");
                }
              }}
            />
            {passwordError && <FormHelperText>{passwordError}</FormHelperText>}
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
              type="text"
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
          <Link to="/login" color="teal.500">
            Login
          </Link>
        </Text>
      </Box>
    </Box>
  );
};

export default SignupPage;
