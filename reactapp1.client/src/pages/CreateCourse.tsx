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
import {
  getInstructorsByUniversityId,
  Instructor,
} from "../services/instructorService";
import { addCourse, Course } from "../services/courseService";

export default function CreateCourse() {
  const store = useContext(Store);
  const bgColor = useColorModeValue("gray.50", "gray.700");
  const borderColor = useColorModeValue("gray.300", "gray.600");
  const [course, setCourse] = useState<Course>({
    code: "",
    title: "",
    description: "",
    instructorId: 0,
  } as Course);
  const { data: instructors } = useQuery({
    queryKey: ["instructors By UniversityId", store.state.universityID!],
    queryFn: () => getInstructorsByUniversityId(store.state.universityID!),
  });
  const { mutate } = useMutation({
    mutationFn: () => addCourse(course, course.instructorId),
    onSuccess: (payload) => {
      setCourse({} as Course);
      alert("Course Created Successfully with ID " + payload.data.id);
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

      <FormControl id="instructor" isRequired>
        <FormLabel>Instructor</FormLabel>
        <Select
          placeholder="Select Instructor"
          value={course.instructorId}
          onChange={(e) =>
            setCourse((prev: Course) => ({
              ...prev,
              instructorId: parseInt(e.target.value),
            }))
          }
        >
          {instructors?.data.map((instructor: Instructor) => (
            <option key={instructor.id} value={instructor.id}>
              {instructor.name}
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
        Create Course
      </Button>
    </Box>
  );
}
