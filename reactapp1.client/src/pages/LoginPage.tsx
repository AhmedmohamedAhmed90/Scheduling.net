// src/LoginPage.tsx
import React, { useContext, useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { Store } from "../Store";

function LoginPage() {
  const store = useContext(Store);
  const { dispatch } = store;
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const bgColor = useColorModeValue("gray.50", "gray.700");
  const borderColor = useColorModeValue("gray.300", "gray.600");

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/account/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("You have enter a wrong username or password");
      }

      const data = await response.json();
      console.log(data);
      dispatch({ type: "LOGIN", payload: data });
      if (data.role === "Admin") {
        navigate("/admindashboard");
      } else {
        navigate("/studentdashboard");
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  return (
    <Box
      width="100vw"
      height="100vh"
      backgroundImage="url('../assets/images/university.jpg')"
      backgroundSize="cover"
      backgroundPosition="center"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        shadow="lg"
        borderWidth="1px"
        rounded="lg"
        p={8}
        bg={bgColor}
        borderColor={borderColor}
        maxWidth="400px"
        width="full"
      >
        <Heading as="h2" size="lg" mb={6} textAlign="center">
          Login 
        </Heading>
        <form onSubmit={handleLogin}>
          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your username"
            />
          </FormControl>
          <FormControl id="password" isRequired mt={4}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </FormControl>
          {error && (
            <Text color="red.500" mt={4}>
              {error}
            </Text>
          )}
          <Button mt={8} colorScheme="blue" width="full" type="submit">
            Login
          </Button>
        </form>
        <Text mt={4} textAlign="center">
          or Get an account?{" "}
          <Link to="/signup" color="teal.500">
            Sign Up
          </Link>
        </Text>
      </Box>
    </Box>
  );
}

export default LoginPage;
