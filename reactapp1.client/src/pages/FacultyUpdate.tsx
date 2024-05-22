import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  useColorModeValue,
  useToast,
  Flex,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Faculty, getFaculty, updateFaculty } from "../services/facultyService";
import { useNavigate, useParams } from "react-router-dom";

export default function FacultyUpdate() {
  const param = useParams();
  const { id } = param;
  const navigate = useNavigate();
  const toast = useToast();
  const bgColor = useColorModeValue("gray.50", "gray.700");
  const borderColor = useColorModeValue("gray.300", "gray.600");
  const [faculty, setFaculty] = useState<Faculty>({} as Faculty);

  const { mutate } = useMutation({
    mutationFn: () => updateFaculty(id!, faculty),
    onSuccess: () => {
      toast({
        title: "Faculty Updated",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/admin/faculty");
    },
  });

  const { data: facultyData, isSuccess: isFacultyDataSuccess } = useQuery({
    queryKey: ["Course By Id", id],
    queryFn: () => getFaculty(id!).then((res) => res.data),
    enabled: !!id, // Only run the query if the id exists
  });
  useEffect(() => {
    if (isFacultyDataSuccess && facultyData) {
      setFaculty(facultyData);
    }
  }, [isFacultyDataSuccess, facultyData]);

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
      <Flex alignItems={"center"} justifyContent={"start"}>
        <Button
          colorScheme="blue"
          onClick={() => {
            navigate("/admin/faculty");
          }}
        >
          Back
        </Button>
      </Flex>

      <Heading as="h2" size="lg" mb={6} textAlign="center">
        Update Faculty
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
        Update Faculty
      </Button>
    </Box>
  );
}
