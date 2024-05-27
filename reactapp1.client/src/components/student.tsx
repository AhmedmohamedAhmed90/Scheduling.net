// import React, { useContext } from 'react';
// import {
//   Box,
//   Button,
//   VStack,
//   Grid,
//   GridItem,
//   Heading,
//   IconButton,
//   useColorMode,
//   useColorModeValue,
// } from '@chakra-ui/react';
// import { Link as RouterLink } from 'react-router-dom';
// import {
//   FaSun,
//   FaMoon,
//   FaExclamation,
//   FaEye,
//   FaCalendarAlt,
//   FaRegCalendarAlt,
//   FaSignOutAlt,
// } from 'react-icons/fa';
// import axios from 'axios';
// import { Store } from '../Store'; // Adjust the import path to your Store context
// import { BASE_URL } from '../constant'; // Adjust the import path to your constant file

// const StudentDashboard: React.FC = () => {
//   const { toggleColorMode } = useColorMode();
//   const bg = useColorModeValue('gray.100', 'gray.700');
//   const color = useColorModeValue('black', 'white');
//   const iconColor = useColorModeValue('gray.600', 'gray.300');
//   const { dispatch } = useContext(Store);

//   const handleLogout = async () => {
//     try {
//       await axios.post(`${BASE_URL}account/logout`);
//       dispatch({ type: 'LOGOUT', payload: undefined });
//       localStorage.clear();
//       window.location.href = '/';
//     } catch (error) {
//       console.error('Error logging out:', error);
//     }
//   };

//   return (
//     <Box p={4} bg={bg} minH="100vh">
//       <Box textAlign="right">
//         <IconButton
//           aria-label="Toggle color mode"
//           icon={useColorModeValue(<FaMoon />, <FaSun />)}
//           onClick={toggleColorMode}
//           variant="ghost"
//           color={iconColor}
//         />
//       </Box>
//       <VStack spacing={8}>
//         <Heading as="h1" size="xl" color={color}>
//           Student Dashboard
//         </Heading>
//         <Grid templateColumns="repeat(2, 1fr)" gap={6}>
//           <GridItem>
//             <Button
//               as={RouterLink}
//               to="/sendexception"
//               leftIcon={<FaExclamation />}
//               colorScheme="teal"
//               size="lg"
//               w="100%"
//               h="100px"
//             >
//               Send Exception
//             </Button>
//           </GridItem>
//           <GridItem>
//             <Button
//               as={RouterLink}
//               to="/studentexceptions"
//               leftIcon={<FaEye />}
//               colorScheme="teal"
//               size="lg"
//               w="100%"
//               h="100px"
//             >
//               View Exceptions
//             </Button>
//           </GridItem>
//           <GridItem>
//             <Button
//               as={RouterLink}
//               to="/suggest"
//               leftIcon={<FaCalendarAlt />}
//               colorScheme="teal"
//               size="lg"
//               w="100%"
//               h="100px"
//             >
//               Create Schedule
//             </Button>
//           </GridItem>
//           <GridItem>
//             <Button
//               as={RouterLink}
//               to="/table"
//               leftIcon={<FaRegCalendarAlt />}
//               colorScheme="teal"
//               size="lg"
//               w="100%"
//               h="100px"
//             >
//               View Faculty Table
//             </Button>
//           </GridItem>
//           <GridItem colSpan={2}>
//             <Button
//               onClick={handleLogout}
//               leftIcon={<FaSignOutAlt />}
//               colorScheme="red"
//               size="lg"
//               w="100%"
//               h="100px"
//             >
//               Logout
//             </Button>
//           </GridItem>
//         </Grid>
//       </VStack>
//     </Box>
//   );
// };

// export default StudentDashboard;
