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
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { Store } from "../Store";
import {
  Instructor,
  deleteInstructor,
  getInstructorsByUniversityId,
} from "../services/instructorService";
import { useNavigate } from "react-router-dom";
import FacultySkeleton from "../components/FacultySkeleton";

function InstructorPage() {
  const store = useContext(Store);
  const navigate = useNavigate();
  const toast = useToast();
  const { refetch, error, data } = useQuery<Instructor[], Error>({
    queryKey: ["Get Instructors for University", store.state.universityID!],
    queryFn: () =>
      getInstructorsByUniversityId(store.state.universityID!).then(
        (res) => res.data
      ),
  });

  const onDelete = async (facultyid: number, instructorID: number) => {
    await deleteInstructor(facultyid, instructorID);
    toast({
      title: "Instructor Deleted",
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
        <Flex alignItems={"center"} justifyContent={"start"}>
          <Button
            mt={5}
            colorScheme="blue"
            onClick={() => {
              navigate("/admindashboard");
            }}
          >
            Back
          </Button>
        </Flex>
        <Heading fontSize={20}>Instructor List</Heading>
        <Button
          mt={5}
          colorScheme="blue"
          leftIcon={<AddIcon />}
          onClick={() => {
            navigate("/admin/instructor/create");
          }}
        >
          Add Instructor
        </Button>
      </Flex>
      <TableContainer>
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Faculty Name</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((instructor: Instructor) => (
              <Tr key={instructor.id}>
                <Td>{instructor.name}</Td>
                <Td>{instructor.faculty!.name}</Td>
                <Td>
                  <HStack gap={3}>
                    <Box as="button">
                      <EditIcon
                        color={"blue"}
                        boxSize={22}
                        onClick={() =>
                          navigate(`/admin/instructor/edit/${instructor.id}`)
                        }
                      />
                    </Box>

                    <Popover>
                      <PopoverTrigger>
                        <Box as="button">
                          <DeleteIcon color={"red"} boxSize={22} />
                        </Box>
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
                            onClick={() =>
                              onDelete(instructor.facultyId, instructor.id!)
                            }
                          >
                            Delete
                          </Button>
                        </PopoverFooter>
                      </PopoverContent>
                    </Popover>
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      {data.length === 0 && (
        <Heading textAlign="center" p={5} fontSize={14}>
          No instructors found
        </Heading>
      )}
    </Box>
  );
}

export default InstructorPage;
