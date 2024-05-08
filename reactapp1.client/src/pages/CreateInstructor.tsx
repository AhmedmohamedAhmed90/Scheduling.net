import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  useColorModeValue,
  Select,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { Store } from "../Store";
import { addInstructor, Instructor } from "../services/instructorService";
import {
  Faculty,
  getFacultiesByUniversityId,
} from "../services/facultyService";

export default function CreateInstructor() {
  const store = useContext(Store);
  const bgColor = useColorModeValue("gray.50", "gray.700");
  const borderColor = useColorModeValue("gray.300", "gray.600");
  const [instructor, setInstructor] = useState<Instructor>({
    facultyid: 0,
    department: "",
    name: "",
  } as Instructor);
  const { data: faculties } = useQuery({
    queryKey: ["Faculties By UniversityId", store.state.universityID!],
    queryFn: () => getFacultiesByUniversityId(store.state.universityID!),
  });
  const { mutate } = useMutation({
    mutationFn: () => addInstructor(instructor, instructor.facultyid),
    onSuccess: (payload) => {
      setInstructor({} as Instructor);
      alert("Instructor Created Successfully with ID " + payload.data.id);
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
        Create Instructor Using University ID: {store.state.universityID}
        {JSON.stringify(faculties?.data)}
        {JSON.stringify(instructor)}
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

      <FormControl id="department" isRequired>
        <FormLabel>Department</FormLabel>
        <Input
          type="text"
          placeholder="Enter Department Name"
          value={instructor.department}
          onChange={(e) => {
            setInstructor((prev: Instructor) => ({
              ...prev,
              department: e.target.value,
            }));
          }}
        />
      </FormControl>

      <FormControl id="faculty" isRequired>
        <FormLabel>Faculty</FormLabel>
        <Select
          placeholder="Select faculty"
          value={instructor.facultyid}
          onChange={(e) =>
            setInstructor((prev: Instructor) => ({
              ...prev,
              facultyid: parseInt(e.target.value),
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
