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
  Text,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Group, getGroupsByCourseId } from "../services/groupService";
import { useNavigate, useParams } from "react-router-dom";
import FacultySkeleton from "../components/FacultySkeleton";
import { deleteLecture } from "../services/lectureService";
import { getCourse } from "../services/courseService";

function GroupPage() {
  const param = useParams();
  const { courseID } = param;
  const navigate = useNavigate();
  const toast = useToast();
  const { refetch, error, data } = useQuery<Group[], Error>({
    queryKey: ["Get Groups for Course", courseID],
    queryFn: () => getGroupsByCourseId(courseID!).then((res) => res.data),
  });

  const { data: courseData } = useQuery({
    queryKey: ["Course By Id", courseID],
    queryFn: () => getCourse(parseInt(courseID!)),
  });

  const onDelete = async (groupID: number) => {
    await deleteLecture(groupID);
    toast({
      title: "Lecture Deleted",
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
        <Heading fontSize={20}>Group List for {courseData.title}</Heading>
        <HStack>
          <Button
            mt={5}
            colorScheme="blue"
            leftIcon={<AddIcon />}
            onClick={() => {
              navigate("/admin/group/create");
            }}
          >
            Add Group
          </Button>
          <Button
            mt={5}
            colorScheme="blue"
            leftIcon={<AddIcon />}
            onClick={() => {
              navigate("/admin/lecture/create");
            }}
          >
            Add Lecture
          </Button>
        </HStack>
      </Flex>
      <TableContainer>
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>Group</Th>
              <Th>Lecture Start Time</Th>
              <Th>Lecture End Time</Th>
              <Th>Lecture Day</Th>
              <Th>Lecture Room</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((group: Group) =>
              group.lectures?.map((lecture) => (
                <Tr key={group.id}>
                  <Td>{group.code}</Td>
                  <Td>{lecture.startTime}</Td>
                  <Td>{lecture.endTime}</Td>
                  <Td>{lecture.day}</Td>
                  <Td>
                    <Text
                      style={{
                        wordWrap: "break-word",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {lecture.room}
                    </Text>
                  </Td>
                  <Td>
                    <HStack gap={3}>
                      <EditIcon
                        color={"blue"}
                        boxSize={22}
                        onClick={() =>
                          navigate(`/admin/lecture/edit/${lecture.id!}`)
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
                              onClick={() => onDelete(lecture.id!)}
                            >
                              Delete
                            </Button>
                          </PopoverFooter>
                        </PopoverContent>
                      </Popover>
                    </HStack>
                  </Td>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </TableContainer>
      {data.length === 0 && (
        <Heading textAlign="center" p={5} fontSize={14}>
          No Groups found
        </Heading>
      )}
    </Box>
  );
}

export default GroupPage;
