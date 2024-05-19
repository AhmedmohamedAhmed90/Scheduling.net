import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Flex,
  Heading,
  Button,
  HStack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  useToast,
  Link,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { Store } from "../Store";
import {
  Course,
  deleteCourse,
  getCoursesByUniversityID,
} from "../services/courseService";
import { useNavigate } from "react-router-dom";
import FacultySkeleton from "../components/FacultySkeleton";

function CoursePage() {
  const store = useContext(Store);
  const navigate = useNavigate();
  const toast = useToast();
  const { refetch, error, data } = useQuery<Course[], Error>({
    queryKey: ["Get Courses for University", store.state.universityID!],
    queryFn: () =>
      getCoursesByUniversityID(store.state.universityID!).then(
        (res) => res.data
      ),
  });

  const onDelete = async (courseID: number) => {
    await deleteCourse(courseID);
    toast({
      title: "Course Deleted",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    refetch();
  };
  if (!data) return <FacultySkeleton />;
  if (error) return "Error";
  return (
    <Box shadow="md" borderWidth="1px" rounded="md" m="32">
      <Flex
        alignItems={"center"}
        mb={5}
        px={5}
        justifyContent={"space-between"}
      >
        <Heading fontSize={20}>Course List</Heading>
        <Button
          mt={5}
          colorScheme="blue"
          leftIcon={<AddIcon />}
          onClick={() => {
            navigate("/admin/course/create");
          }}
        >
          Add Course
        </Button>
      </Flex>
      <TableContainer>
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>Course Code</Th>
              <Th>Course Title</Th>
              <Th>Course Departmeant</Th>
              <Th>Actions</Th>
              <Th>Groups</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((course: Course) => (
              <Tr key={course.id}>
                <Td>{course.code}</Td>
                <Td>{course.title}</Td>
                <Td>{course.departmeant}</Td>
                <Td>
                  <HStack gap={3}>
                    <EditIcon
                      color={"blue"}
                      boxSize={22}
                      onClick={() =>
                        navigate(`/admin/course/edit/${course.id}`)
                      }
                    />
                    <Popover>
                      <PopoverTrigger>
                        <DeleteIcon color={"red"} boxSize={22} />
                      </PopoverTrigger>
                      <PopoverContent>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverHeader>Confirmation!</PopoverHeader>
                        <PopoverBody>
                          Are you sure you want to delete this?
                        </PopoverBody>
                        <PopoverFooter>
                          <Button
                            float={"right"}
                            colorScheme="red"
                            onClick={() => onDelete(course.id!)}
                          >
                            Delete
                          </Button>
                        </PopoverFooter>
                      </PopoverContent>
                    </Popover>
                  </HStack>
                </Td>
                <Td>
                  <Link
                    onClick={() =>
                      navigate(`/admin/group/bycourse/${course.id}`)
                    }
                  >
                    Click here
                  </Link>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      {data.length === 0 && (
        <Heading textAlign="center" p={5} fontSize={14}>
          No Courses found
        </Heading>
      )}
    </Box>
  );
}

export default CoursePage;
