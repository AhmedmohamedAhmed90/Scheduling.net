import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  useColorModeValue,
  Select,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { Store } from "../Store";
import { getLecture, Lecture, updateLecture } from "../services/lectureService";
import {
  Course,
  getCourse,
  getCoursesByFacultyID,
} from "../services/courseService";
import { Group } from "../services/groupService";
import { useNavigate, useParams } from "react-router-dom";

// const days = ["السبت", "ألاحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس"];
const days = [
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
];
export default function LectureEdit() {
  const store = useContext(Store);
  const navigate = useNavigate();
  const toast = useToast();
  // store.dispatch({
  //   type: "SET_UNIVERSITYID",
  //   payload: 1,
  // });
  // store.dispatch({
  //   type: "SET_FACULTYID",
  //   payload: 1,
  // });
  const param = useParams();
  const { id } = param;
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
    mutationFn: () => updateLecture(lecture.id!.toString(), lecture),
    onSuccess: () => {
      toast({
        title: "Lecture Updated",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      navigate(`/admin/group/bycourse/${courseID}`);
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
  const { data: lectureData, isSuccess: isLectureDataSuccess } = useQuery({
    queryKey: ["Lecture By Id", id],
    queryFn: () => getLecture(id!).then((res) => res.data.lecture),
    enabled: !!id, // Only run the query if the id exists
  });
  useEffect(() => {
    if (isLectureDataSuccess && lectureData) {
      setTime(`${lectureData.startTime} - ${lectureData.endTime}`);
      setCourseID(lectureData.group!.courseId!);
      setLecture({
        ...lectureData,
        groupId: lectureData.group!.id!,
      } as Lecture);
    }
  }, [isLectureDataSuccess, lectureData, id]);
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
        Edit Lecture
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
          {groups?.groups?.length === 0 && (
            <option value={0} disabled>
              No Groups Found
            </option>
          )}
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
        Update Lecture
      </Button>
    </Box>
  );
}
