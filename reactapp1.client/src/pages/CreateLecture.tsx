import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  useColorModeValue,
  FormErrorMessage,
  Select,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { Store } from "../Store";
import { addLecture, Lecture } from "../services/lectureService";
import {
  Course,
  getCourse,
  getCoursesByFacultyID,
} from "../services/courseService";
import { Group } from "../services/groupService";

// const days = ["السبت", "ألاحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس"];
const days = [
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
];
export default function CreateLecture() {
  const timeRegex = /^\d{1,2}:\d{2}$/;
  const store = useContext(Store);
  const bgColor = useColorModeValue("gray.50", "gray.700");
  const borderColor = useColorModeValue("gray.300", "gray.600");
  const [lecture, setLecture] = useState<Lecture>({
    startTime: "",
    endTime: "",
    day: "",
    room: "",
    groupId: 0,
  } as Lecture);
  const [errorStartTime, setErrorStartTime] = useState("");
  const [errorEndTime, setErrorEndTime] = useState("");
  const [courseID, setCourseID] = useState(0);

  const { mutate } = useMutation({
    mutationFn: () => addLecture(lecture),
    onSuccess: (payload) => {
      setLecture({
        startTime: "",
        endTime: "",
        day: "",
        room: "",
        groupId: 0,
      } as Lecture);
      setCourseID(0);
      alert("Lecture Created Successfully with ID " + payload.data.id);
    },
  });

  const { data: courses } = useQuery({
    queryKey: ["Courses By Faculty", store.state.facultyID!],
    queryFn: () => getCoursesByFacultyID(store.state.facultyID!),
  });
  const { data: groups } = useQuery({
    queryKey: ["Groups By Course", courseID],
    queryFn: () => getCourse(courseID),
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
        Create Lecture Using University ID: {store.state.universityID}
      </Heading>

      <FormControl isInvalid={errorStartTime !== ""} isRequired>
        <FormLabel htmlFor="lecture-time">Lecture Start Time</FormLabel>
        <Input
          type="text"
          placeholder="Enter Lecture Start Time"
          value={lecture.startTime}
          onChange={(e) => {
            setLecture((prev) => ({
              ...prev,
              startTime: e.target.value,
            }));
          }}
          onBlur={(e) => {
            if (!timeRegex.test(e.target.value)) {
              setErrorStartTime("Enter a valid time (e.g., 8:00, 10:00)");
            } else {
              setErrorStartTime("");
            }
          }}
        />
        <FormErrorMessage>{errorStartTime}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errorEndTime !== ""} isRequired>
        <FormLabel htmlFor="lecture-time">Lecture End Time</FormLabel>
        <Input
          type="text"
          placeholder="Enter Lecture End Time"
          value={lecture.endTime}
          onChange={(e) => {
            setLecture((prev) => ({
              ...prev,
              endTime: e.target.value,
            }));
          }}
          onBlur={(e) => {
            if (!timeRegex.test(e.target.value)) {
              setErrorEndTime("Enter a valid time (e.g., 8:00, 10:00)");
            } else {
              setErrorEndTime("");
            }
          }}
        />
        <FormErrorMessage>{errorEndTime}</FormErrorMessage>
      </FormControl>

      <FormControl id="room" isRequired>
        <FormLabel>Room</FormLabel>
        <Input
          type="text"
          placeholder="Enter Room"
          value={lecture.room}
          onChange={(e) => {
            setLecture((prev: Lecture) => ({
              ...prev,
              room: e.target.value,
            }));
          }}
        />
      </FormControl>

      <FormControl id="day" isRequired>
        <FormLabel>Day</FormLabel>
        <Select
          placeholder="Select faculty"
          value={lecture.day}
          onChange={(e) =>
            setLecture((prev: Lecture) => ({
              ...prev,
              day: e.target.value,
            }))
          }
        >
          {days.map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </Select>
      </FormControl>

      <FormControl id="course" isRequired>
        <FormLabel>Course</FormLabel>
        <Select
          placeholder="Select Course"
          value={courseID}
          onChange={(e) => setCourseID(parseInt(e.target.value))}
        >
          {courses?.data.map(({ course }: { course: Course }) => (
            <option key={course.id} value={course.id}>
              {course.code}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl id="group" isRequired>
        <FormLabel>Group</FormLabel>
        <Select
          placeholder="Select Group"
          value={lecture.groupId}
          onChange={(e) =>
            setLecture((prev: Lecture) => ({
              ...prev,
              groupId: parseInt(e.target.value),
            }))
          }
        >
          {groups?.data?.groups?.map((group: Group) => (
            <option key={group.id} value={group.id}>
              {group.code}
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
        Create Lecture
      </Button>
    </Box>
  );
}
