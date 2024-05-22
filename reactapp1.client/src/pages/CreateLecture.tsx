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
import { addLecture, Lecture } from "../services/lectureService";
import {
  Course,
  getCourse,
  getCoursesByUniversityID,
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
  const store = useContext(Store);
  // store.dispatch({
  //   type: "SET_UNIVERSITYID",
  //   payload: 1,
  // });
  // store.dispatch({
  //   type: "SET_FACULTYID",
  //   payload: 1,
  // });

  const bgColor = useColorModeValue("gray.50", "gray.700");
  const borderColor = useColorModeValue("gray.300", "gray.600");
  const [lecture, setLecture] = useState<Lecture>({
    startTime: "",
    endTime: "",
    day: "",
    room: "",
    groupId: 0,
  } as Lecture);
  const [courseID, setCourseID] = useState(0);
  const [time, setTime] = useState("");

  const { mutate } = useMutation({
    mutationFn: () => addLecture(lecture),
    onSuccess: () => {
      setLecture({
        startTime: "",
        endTime: "",
        day: "",
        room: "",
        groupId: 0,
      } as Lecture);
      setCourseID(0);
      history.back();
    },
  });

  const { data: courses } = useQuery({
    queryKey: ["Courses By University", store.state.universityID!],
    queryFn: () => getCoursesByUniversityID(store.state.universityID!),
  });
  const { data: groups } = useQuery({
    queryKey: ["Groups By Course", courseID],
    queryFn: () => getCourse(courseID),
    enabled: courseID !== 0,
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
            history.back();
          }}
        >
          Back
        </Button>
      </Flex>
      <Heading as="h2" size="lg" mb={6} textAlign="center">
        Create Lecture
      </Heading>

      <FormControl id="lecture-time" isRequired>
        <FormLabel>Lecture Time</FormLabel>
        <Select
          placeholder="Select Lecture Time"
          value={time}
          onChange={(e) => {
            setTime(e.target.value);
            const [startTime, endTime] = e.target.value.split(" - ");
            setLecture((prev: Lecture) => ({
              ...prev,
              startTime,
              endTime,
            }));
          }}
        >
          {[
            "8:00 - 9:30",
            "9:30 - 11:00",
            "11:00 - 12:30",
            "12:30 - 2:00",
            "2:00 - 3:30",
            "3:30 - 5:00",
          ].map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </Select>
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
          placeholder="Select day"
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
          {courses?.data.map((course: Course) => (
            <option key={course.id} value={course.id}>
              {course.title} - {course.code}
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
          {groups?.groups?.map((group: Group) => (
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
