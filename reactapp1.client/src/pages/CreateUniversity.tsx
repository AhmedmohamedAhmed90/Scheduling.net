import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";

export default function CreateUniversity() {
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
        Create University
      </Heading>
      <FormControl id="name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input type="text" placeholder="Enter University Name" />
      </FormControl>
      <FormControl id="address" isRequired mt={4}>
        <FormLabel>Address</FormLabel>
        <Input type="text" placeholder="Enter University Address" />
      </FormControl>
      <FormControl id="phoneNumber" isRequired mt={4}>
        <FormLabel>Phone Number</FormLabel>
        <Input type="text" placeholder="Enter University Phone Number" />
      </FormControl>
      <Button mt={8} colorScheme="blue" width="full" type="submit">
        Create University
      </Button>
    </Box>
  );
}
