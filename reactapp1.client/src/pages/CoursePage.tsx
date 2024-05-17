// import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
// import {
//   TableContainer,
//   Table,
//   Thead,
//   Tbody,
//   Tr,
//   Th,
//   Td,
//   Box,
//   Flex,
//   Heading,
//   Button,
//   HStack,
//   Popover,
//   PopoverTrigger,
//   PopoverContent,
//   PopoverArrow,
//   PopoverCloseButton,
//   PopoverHeader,
//   PopoverBody,
//   PopoverFooter,
//   useToast,
// } from "@chakra-ui/react";
// import { useQuery } from "@tanstack/react-query";
// import { useContext } from "react";
// import { Store } from "../Store";
// import {
//   Course,
//   deleteCourse,
//   getCoursesByUniversityId,
// } from "../services/courseService";
// import { useNavigate } from "react-router-dom";
// import FacultySkeleton from "../components/FacultySkeleton";

// function CoursePage() {
//   const store = useContext(Store);
//   const navigate = useNavigate();
//   const toast = useToast();
//   const { refetch, error, data } = useQuery<Course[], Error>({
//     queryKey: ["Get Courses for University", store.state.universityID!],
//     queryFn: () =>
//       getCoursesByUniversityId(store.state.universityID!).then(
//         (res) => res.data
//       ),
//   });

//   const onDelete = async (facultyid: number, courseID: number) => {
//     await deleteCourse(facultyid, courseID);
//     toast({
//       title: "Course Deleted",
//       status: "success",
//       duration: 3000,
//       isClosable: true,
//     });
//     refetch();
//   };
//   if (!data) return <FacultySkeleton />;
//   if (error) return "Error";
//   return (
//     <Box shadow="md" borderWidth="1px" rounded="md" m="32">
//       <Flex
//         alignItems={"center"}
//         mb={5}
//         px={5}
//         justifyContent={"space-between"}
//       >
//         <Heading fontSize={20}>Course List</Heading>
//         <Button
//           mt={5}
//           colorScheme="blue"
//           leftIcon={<AddIcon />}
//           onClick={() => {
//             navigate("/admin/course/create");
//           }}
//         >
//           Add Course
//         </Button>
//       </Flex>
//       <TableContainer>
//         <Table variant="striped">
//           <Thead>
//             <Tr>
//               <Th>Name</Th>
//               <Th>Faculty Name</Th>
//               <Th>Actions</Th>
//             </Tr>
//           </Thead>
//           <Tbody>
//             {data.map((course: Course) => (
//               <Tr key={course.id}>
//                 <Td>{course.name}</Td>
//                 <Td>{course.faculty!.name}</Td>
//                 <Td>
//                   <HStack gap={3}>
//                     <EditIcon
//                       color={"blue"}
//                       boxSize={22}
//                       onClick={() =>
//                         navigate(`/admin/course/edit/${course.id}`)
//                       }
//                     />
//                     <Popover>
//                       <PopoverTrigger>
//                         <DeleteIcon color={"red"} boxSize={22} />
//                       </PopoverTrigger>
//                       <PopoverContent>
//                         <PopoverArrow />
//                         <PopoverCloseButton />
//                         <PopoverHeader>Confirmation!</PopoverHeader>
//                         <PopoverBody>
//                           Are you sure you want to delete this?
//                         </PopoverBody>
//                         <PopoverFooter>
//                           <Button
//                             float={"right"}
//                             colorScheme="red"
//                             onClick={() =>
//                               onDelete(course.facultyId, course.id!)
//                             }
//                           >
//                             Delete
//                           </Button>
//                         </PopoverFooter>
//                       </PopoverContent>
//                     </Popover>
//                   </HStack>
//                 </Td>
//               </Tr>
//             ))}
//           </Tbody>
//         </Table>
//       </TableContainer>
//       {data.length === 0 && (
//         <Heading textAlign="center" p={5} fontSize={14}>
//           No courses found
//         </Heading>
//       )}
//     </Box>
//   );
// }

// export default CoursePage;
