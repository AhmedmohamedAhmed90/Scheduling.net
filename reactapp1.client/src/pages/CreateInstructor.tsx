import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  useColorModeValue,
  Select,
  Flex,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { Store } from "../Store";
import { addInstructor, Instructor } from "../services/instructorService";
import {
  Faculty,
  getFacultiesByUniversityId,
} from "../services/facultyService";
import { useNavigate } from "react-router-dom";

export default function CreateInstructor() {
  const navigate = useNavigate();
  const store = useContext(Store);
  const bgColor = useColorModeValue("gray.50", "gray.700");
  const borderColor = useColorModeValue("gray.300", "gray.600");
  const [instructor, setInstructor] = useState<Instructor>({
    facultyId: 0,
    name: "",
  } as Instructor);
  const { data: faculties } = useQuery({
    queryKey: ["Faculties By UniversityId", store.state.universityID!],
    queryFn: () => getFacultiesByUniversityId(store.state.universityID!),
  });
  const { mutate } = useMutation({
    mutationFn: () => addInstructor(instructor, instructor.facultyId),
    onSuccess: () => {
      setInstructor({
        facultyId: 0,
        name: "",
      } as Instructor);
      navigate("/admin/instructor");
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
      <Flex alignItems={"center"} justifyContent={"start"}>
        <Button
          colorScheme="blue"
          onClick={() => {
            navigate("/admin/instructor");
          }}
        >
          Back
        </Button>
      </Flex>
      <Heading as="h2" size="lg" mb={6} textAlign="center">
        Create Instructor
      </Heading>

      <FormControl id="name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          type="text"
          placeholder="Enter Instructor Name"
          value={instructor.name}
          onChange={(e) => {
            setInstructor((prev: Instructor) => ({
              ...prev,
              name: e.target.value,
            }));
          }}
        />
      </FormControl>

      <FormControl id="faculty" isRequired>
        <FormLabel>Faculty</FormLabel>
        <Select
          placeholder="Select faculty"
          value={instructor.facultyId}
          onChange={(e) =>
            setInstructor((prev: Instructor) => ({
              ...prev,
              facultyId: parseInt(e.target.value),
            }))
          }
        >
          {faculties?.data.map((faculty: Faculty) => (
            <option key={faculty.id} value={faculty.id}>
              {faculty.name}
            </option>
          ))}
        </Select>
      </FormControl>

      <Button
        mt={8}
        colorScheme="blue"
        width="full"
        onClick={() => {
          mutate();
        }}
      >
        Create Instructor
      </Button>
    </Box>
  );
}
