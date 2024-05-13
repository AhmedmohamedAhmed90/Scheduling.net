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
import { addGroup, Group } from "../services/groupService";
import { Course, getCourses } from "../services/courseService";

export default function CreateGroup() {
  const store = useContext(Store);
  const bgColor = useColorModeValue("gray.50", "gray.700");
  const borderColor = useColorModeValue("gray.300", "gray.600");
  const [group, setGroup] = useState<Group>({
    code: "",
    instructorid: 0,
    courseid: 0,
  } as Group);
  const { data: instructors } = useQuery({
    queryKey: ["instructors By UniversityId", store.state.universityID!],
    queryFn: () => getInstructorsByUniversityId(store.state.universityID!),
  });

  const { data: courses } = useQuery({
    queryKey: ["courses By UniversityId", store.state.universityID!],
    queryFn: () => getCourses(),
  });
  const { mutate } = useMutation({
    mutationFn: () => addGroup(group),
    onSuccess: (payload) => {
      setGroup({
        code: "",
        instructorid: 0,
        courseid: 0,
      } as Group);
      alert("Group Created Successfully with ID " + payload.data.id);
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
        Create Group Using University ID: {store.state.universityID}
      </Heading>

      <FormControl id="code" isRequired>
        <FormLabel>Code</FormLabel>
        <Input
          type="text"
          placeholder="Enter Code Name"
          value={group.code}
          onChange={(e) => {
            setGroup((prev: Group) => ({
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
          value={group.instructorid}
          onChange={(e) =>
            setGroup((prev: Group) => ({
              ...prev,
              instructorid: parseInt(e.target.value),
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

      <FormControl id="course" isRequired>
        <FormLabel>Course</FormLabel>
        <Select
          placeholder="Select Course"
          value={group.courseid}
          onChange={(e) =>
            setGroup((prev: Group) => ({
              ...prev,
              courseid: parseInt(e.target.value),
            }))
          }
        >
          {courses?.data.map((course: Course) => (
            <option key={course.id} value={course.id}>
              {course.title + " " + course.code}
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
        Create Group
      </Button>
    </Box>
  );
}
