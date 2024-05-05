import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { addUniversity, University } from "../services/universityService";
import { Store } from "../Store";

export default function CreateFaculty() {
  const store = useContext(Store);
  const { dispatch } = store;
  const bgColor = useColorModeValue("gray.50", "gray.700");
  const borderColor = useColorModeValue("gray.300", "gray.600");
  const [university, setUniversity] = useState<University>({} as University);
  const { mutate } = useMutation({
    mutationFn: () => addUniversity(university),
    onSuccess: (payload) => {
      dispatch({
        type: "SET_UNIVERSITYID",
        payload: payload.data.id,
      });
      setUniversity({} as University);
      alert("University Created Successfully with ID " + payload.data.id);
    },
  });
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
      <form
        onSubmit={() => {
          mutate();
        }}
      >
        <FormControl id="name" isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            placeholder="Enter University Name"
            value={university.name}
            onChange={(e) => {
              setUniversity((prev: University) => ({
                ...prev,
                name: e.target.value,
              }));
            }}
          />
        </FormControl>
        <FormControl id="address" isRequired mt={4}>
          <FormLabel>Address</FormLabel>
          <Input
            type="text"
            placeholder="Enter University Address"
            value={university.address}
            onChange={(e) => {
              setUniversity((prev: University) => ({
                ...prev,
                address: e.target.value,
              }));
            }}
          />
        </FormControl>
        <FormControl id="phoneNumber" isRequired mt={4}>
          <FormLabel>Phone Number</FormLabel>
          <Input
            type="text"
            placeholder="Enter University Phone Number"
            value={university.phoneNumber}
            onChange={(e) => {
              setUniversity((prev: University) => ({
                ...prev,
                phoneNumber: e.target.value,
              }));
            }}
          />
        </FormControl>
        <Button mt={8} colorScheme="blue" width="full" type="submit">
          Create University
        </Button>
      </form>
    </Box>
  );
}
