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
import { addCourse, Course } from "../services/courseService";
import {
  Faculty,
  getFacultiesByUniversityId,
} from "../services/facultyService";

export default function CreateCourse() {
  const store = useContext(Store);
  const bgColor = useColorModeValue("gray.50", "gray.700");
  const borderColor = useColorModeValue("gray.300", "gray.600");
  const [course, setCourse] = useState<Course>({
    code: "",
    title: "",
    description: "",
    departmeant: "",
    facultyid: 0,
  } as Course);

  const { mutate } = useMutation({
    mutationFn: () => addCourse(course),
    onSuccess: (payload) => {
      setCourse({
        code: "",
        title: "",
        description: "",
        departmeant: "",
        facultyid: 0,
      } as Course);
      alert("Course Created Successfully with ID " + payload.data.id);
    },
  });
  const { data: faculties } = useQuery({
    queryKey: ["Faculties By UniversityId", store.state.universityID!],
    queryFn: () => getFacultiesByUniversityId(store.state.universityID!),
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
        Create Course Using University ID: {store.state.universityID}
      </Heading>

      <FormControl id="title" isRequired>
        <FormLabel>Title</FormLabel>
        <Input
          type="text"
          placeholder="Enter Course Title"
          value={course.title}
          onChange={(e) => {
            setCourse((prev: Course) => ({
              ...prev,
              title: e.target.value,
            }));
          }}
        />
      </FormControl>
      <FormControl id="faculty" isRequired>
        <FormLabel>Faculty</FormLabel>
        <Select
          placeholder="Select faculty"
          value={course.facultyid}
          onChange={(e) =>
            setCourse((prev: Course) => ({
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
      <FormControl id="departmeant" isRequired>
        <FormLabel>Departmeant</FormLabel>
        <Input
          type="text"
          placeholder="Enter departmeant Name"
          value={course.departmeant}
          onChange={(e) => {
            setCourse((prev: Course) => ({
              ...prev,
              departmeant: e.target.value,
            }));
          }}
        />
      </FormControl>

      <FormControl id="code" isRequired>
        <FormLabel>Code</FormLabel>
        <Input
          type="text"
          placeholder="Enter Code Name"
          value={course.code}
          onChange={(e) => {
            setCourse((prev: Course) => ({
              ...prev,
              code: e.target.value,
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
        Create Course
      </Button>
    </Box>
  );
}
