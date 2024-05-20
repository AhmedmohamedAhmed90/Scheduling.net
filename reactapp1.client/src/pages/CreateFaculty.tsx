import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { Store } from "../Store";
import { addFaculty, Faculty } from "../services/facultyService";
import { useNavigate } from "react-router-dom";

export default function CreateFaculty() {
  const store = useContext(Store);
  const toast = useToast();
  const navigate = useNavigate();
  const bgColor = useColorModeValue("gray.50", "gray.700");
  const borderColor = useColorModeValue("gray.300", "gray.600");
  const [faculty, setFaculty] = useState<Faculty>({} as Faculty);

  const { mutate } = useMutation({
    mutationFn: () => addFaculty(faculty, store.state.universityID!),
    onSuccess: () => {
      toast({
        title: "Faculty Created",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/admin/faculty");
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
        Create Faculty
      </Heading>

      <FormControl id="name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          type="text"
          placeholder="Enter Faculty Name"
          value={faculty.name}
          onChange={(e) => {
            setFaculty((prev: Faculty) => ({
              ...prev,
              name: e.target.value,
            }));
          }}
        />
      </FormControl>
      <Button
        mt={8}
        colorScheme="blue"
        width="full"
        onClick={() => {
          mutate();
        }}
      >
        Create Faculty
      </Button>
    </Box>
  );
}
