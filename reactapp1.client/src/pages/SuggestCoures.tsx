import { useQuery } from "@tanstack/react-query";
import MultiSelect from "react-select";
import {
  Course,
  getCoursesByFacultyID,
  getCoursesByUniversityID,
} from "../services/courseService";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Center,
  CircularProgress,
  Heading,
  Select,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import axios, { AxiosResponse } from "axios";
import {
  CourseMultiSelect,
  findNameOfCourse,
  findOneGroupOfCourse,
} from "../utils/utils";
import { Store } from "../Store";
import { useNavigate } from "react-router-dom";

function SuggestCoures() {
  const navigate = useNavigate();
  const store = useContext(Store);
  const [subjectNum, setSubjectNum] = useState(0);

  const [selectedOptions, setSelectedOptions] = useState<CourseMultiSelect[]>(
    store.state.selectedSuggestedCourses
  );
  const onSuggestCourses = async () => {
    setIsLoading(true);
    const newSelectedOptions: Course[] = selectedOptions.map((a) => a.value);
    const arr = newSelectedOptions.map((course: Course) => {
      const gps = course.groups?.map((group) => {
        const lcs = group.lectures?.map((lecture) => {
          return {
            start_time: lecture.startTime.trim(),
            end_time: lecture.endTime.trim(),
            day: lecture.day.trim(),
            room: lecture.room,
          };
        });
        return {
          group_code: group.code,
          professor: group.instructor?.name,
          lectures: lcs,
        };
      });
      return {
        subject_id: course.id,
        subject_name: course.title,
        subject_code: course.code,
        subject_department: course.departmeant,
        groups: gps,
      };
    });
    console.log({
      subjects_per_solution: arr.length,
      subjects: arr,
    });
    const res: AxiosResponse<
      {
        conflict_count: number;
        conflicts: string[][];
        subjects: Record<string, string>;
      }[]
    > = await axios.post(
      "https://horizon-engine-315b0e6bd87c.herokuapp.com/get-schedule",
      {
        subjects_per_solution: subjectNum != 0 ? subjectNum : arr.length,
        subjects: arr,
      }
    );
    const allSuggestedCourses = res.data.map((oneSchedule) => {
      {
        return Object.entries(oneSchedule.subjects).map(([key, value]) => {
          return findOneGroupOfCourse(
            key,
            value,
            courses!.data,
            oneSchedule.conflict_count
          );
        });
      }
    });
    store.dispatch({
      type: "SET_SUGGESTED_COURSES",
      payload: allSuggestedCourses as Course[][],
    });
    store.dispatch({
      type: "SET_SELECTED_SUGGESTED_COURSES",
      payload: selectedOptions,
    });
    setSchedule(res.data);
    setIsLoading(false);
  };
  const [isLoading, setIsLoading] = useState(false);
  const [schedule, setSchedule] = useState<
    {
      conflict_count: number;
      conflicts: string[][];
      subjects: Record<string, string>;
    }[]
  >([]);
  const [message] = useState("");
  const { data: courses } = useQuery({
    queryKey: ["All courses By Univertyu ", store.state.universityID!],
    queryFn: () =>
      store.state.role === "Admin"
        ? getCoursesByUniversityID(store.state.universityID!)
        : getCoursesByFacultyID(store.state.facultyID!),
  });
  if (!courses) {
    return (
      <Box rounded="md" m="32" marginTop={5}>
        <Skeleton>
          <MultiSelect
            options={[]}
            isMulti
            className="basic-multi-select"
            classNamePrefix="select"
          />
        </Skeleton>
        <Button marginBottom={4} marginTop={3}>
          <Skeleton>Suggest Courses</Skeleton>
        </Button>
      </Box>
    );
  }
  const options = courses.data.map((course: Course) => {
    return {
      value: course,
      label: course.title,
    };
  });
  return (
    <Box rounded="md" m="32" marginTop={5} marginBottom={4}>
      <MultiSelect
        options={options}
        isMulti
        className="basic-multi-select"
        classNamePrefix="select"
        value={selectedOptions}
        onChange={(e) => {
          setSelectedOptions(e as never[]);
        }}
      />
      <Select
        placeholder="Select option"
        value={subjectNum}
        onChange={(e) => setSubjectNum(parseInt(e.target.value))}
      >
        <option value={selectedOptions.length}>All</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
      </Select>
      <Button marginBottom={4} marginTop={3} onClick={onSuggestCourses}>
        Suggest Courses
      </Button>
      {!isLoading ? (
        schedule.length === 0 ? (
          <h1>{message}</h1>
        ) : (
          schedule.map((oneSchedule, index) => {
            return (
              <Card
                direction={{ base: "column", sm: "row" }}
                overflow="hidden"
                variant="outline"
                marginBottom={4}
              >
                <Stack>
                  <CardBody>
                    <Heading size="md">Schedule {index + 1}</Heading>

                    <br />
                    <Text py="2">
                      {Object.entries(oneSchedule.subjects).map(
                        ([key, value]) => {
                          const isConflict = oneSchedule.conflicts
                            .flat()
                            .includes(key);
                          return (
                            <Text key={key}>
                              {findNameOfCourse(key, courses.data)} ({value}) |
                              {isConflict ? (
                                <span
                                  style={{
                                    color: isConflict ? "red" : "black",
                                  }}
                                >
                                  {" "}
                                  Conflict
                                </span>
                              ) : (
                                " No Conflict"
                              )}
                            </Text>
                          );
                        }
                      )}
                    </Text>
                    {oneSchedule.conflict_count === 0 ? (
                      <Text
                        py="2"
                        style={{
                          color: "green",
                        }}
                      >
                        No conflicts
                      </Text>
                    ) : (
                      <Text
                        py="2"
                        style={{
                          color: "red",
                        }}
                      >
                        Number of conflicts : {oneSchedule.conflict_count}
                      </Text>
                    )}
                  </CardBody>
                  <CardFooter>
                    <Button
                      onClick={() => {
                        store.dispatch({
                          type: "SET_TABLEINDEX",
                          payload: index,
                        });
                        navigate("/suggestedtable");
                      }}
                    >
                      View Schedule
                    </Button>
                  </CardFooter>
                </Stack>
              </Card>
            );
          })
        )
      ) : (
        <Center marginTop={100}>
          <CircularProgress isIndeterminate color="green.300" />
        </Center>
      )}
    </Box>
  );
}

export default SuggestCoures;
