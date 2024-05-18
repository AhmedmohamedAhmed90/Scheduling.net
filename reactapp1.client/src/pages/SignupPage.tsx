import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  Text,
  Link,
  Select,
  Grid,
  
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";

// Define the Register interface
export interface Register {
  Name: string;
  Username: string;
  Email: string;
  Password: string;
  Address: string;
  Age: number;
  Year: string;
  Faculty: string;
  PhoneNumber: string;
}

// Define the addUniversity function
export const addUser = async (registerData: Register, notificationMethod: string) => {
  return await axios.post(`/api/account/register?notificationMethod=${notificationMethod}`, registerData);
};

function SignupPage() {
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
  const [notificationMethod, setNotificationMethod] = useState("email"); // Default to "email"

  // Theme-related variables
  const bgColor = useColorModeValue("gray.50", "gray.700");
  const borderColor = useColorModeValue("gray.300", "gray.600");

  // Form submission handler
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const registerData: Register = {
      Name: name,
      Username: username,
      Email: email,
      Password: password,
      Address: address,
      Age: parseInt(age, 10),
      Year: year,
      Faculty: faculty,
      PhoneNumber: phoneNumber,
    };

    try {
      const response = await addUser(registerData, notificationMethod);
      console.log("Success:", response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data || error.message);
        if (error.response?.data?.errors) {
          console.error("Validation errors:", error.response.data.errors);
        }
      } 
    }
  };

  return (
    <Box
      backgroundImage="url('../assets/images/university.jpg')"
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
        maxWidth="1000px"
        width="full"
        as="form"
        onSubmit={handleSubmit}
      >
        <Heading as="h2" size="lg" mb={6} textAlign="center">
          Sign up
        </Heading>
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
          <FormControl id="notificationMethod" isRequired>
          <FormLabel>Notification Method</FormLabel>
            <Select
              placeholder="Select notification method"
              value={notificationMethod}
              onChange={(e) => setNotificationMethod(e.target.value)}
            >
              <option value="email">Email</option>
              <option value="whatsapp">WhatsApp</option>
            </Select>
          </FormControl>
        </Grid>
        <Button mt={8} colorScheme="blue" width="full" type="submit">
          Sign up
        </Button>
        <Text mt={4} textAlign="center">
          Already have an account?{" "}
          <Link color="teal.500" href="/login">
            Sign in
          </Link>
        </Text>
      </Box>
    </Box>
  );
}

export default SignupPage;
