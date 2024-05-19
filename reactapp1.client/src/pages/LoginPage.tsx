// src/LoginPage.tsx
import React, { useState } from 'react';
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
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();
  const bgColor = useColorModeValue("gray.50", "gray.700");
  const borderColor = useColorModeValue("gray.300", "gray.600");

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5261/api/account/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
       
        throw new Error( 'You have enter a wrong username or password');
      }

      const data = await response.json();
      console.log(data);
      localStorage.setItem('token', data.token);
      localStorage.setItem('UserName', data.userName);
      localStorage.setItem('id', data.id);
      navigate('/');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
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
          <FormControl id="username" isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
          {error && <Text color="red.500" mt={4}>{error}</Text>}
          <Button mt={8} colorScheme="blue" width="full" type="submit">
            Login
          </Button>
        </form>
      </Box>
    </Box>
  );
}

export default LoginPage;
