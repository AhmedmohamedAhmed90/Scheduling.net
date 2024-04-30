import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  Text,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";

function LoginPage() {
  const bgColor = useColorModeValue("gray.50", "gray.700");
  const borderColor = useColorModeValue("gray.300", "gray.600");

  return (
    <Box
      shadow="lg"
      borderWidth="1px"
      rounded="lg"
      p={8}
      mt={20}
      mx={40}
      bg={bgColor}
      borderColor={borderColor}
    >
      <Heading as="h2" size="lg" mb={6} textAlign="center">
        Sign In
      </Heading>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input type="email" placeholder="Enter your email" />
      </FormControl>
      <FormControl id="password" isRequired mt={4}>
        <FormLabel>Password</FormLabel>
        <Input type="password" placeholder="Enter your password" />
      </FormControl>
      <Button mt={8} colorScheme="blue" width="full" type="submit">
        Login
      </Button>
      <Text mt={4} textAlign="center">
        Forgot your password?{" "}
        <Link color="teal.500" href="#">
          Click here
        </Link>
      </Text>
    </Box>
  );
}

export default LoginPage;
