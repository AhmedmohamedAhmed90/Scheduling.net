import React, { useContext } from "react";
import {
  Box,
  Button,
  VStack,
  Grid,
  GridItem,
  Heading,
  IconButton,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import {
  FaSun,
  FaMoon,
  FaUserPlus,
  FaExclamationTriangle,
  FaCalendarPlus,
  FaUniversity,
  FaChalkboardTeacher,
  FaSignOutAlt,
} from "react-icons/fa";
import axios from "axios";
import { Store } from "../Store"; // Adjust the import path to your Store context
import { BASE_URL } from "../constant"; // Adjust the import path to your constant file
import { useQuery } from "@tanstack/react-query";
import { getUniversity } from "../services/universityService";

const AdminDashboard: React.FC = () => {
  const store = useContext(Store);
  const { toggleColorMode } = useColorMode();
  const bg = useColorModeValue("gray.100", "gray.700");
  const color = useColorModeValue("black", "white");
  const iconColor = useColorModeValue("gray.600", "gray.300");
  const { dispatch } = useContext(Store);
  const { data } = useQuery({
    queryKey: ["Get University", store.state.universityID!],
    queryFn: () => getUniversity(store.state.universityID!.toString()),
  });

  const handleLogout = async () => {
    try {
      await axios.post(`${BASE_URL}account/logout`);
      dispatch({ type: "LOGOUT", payload: undefined });
      localStorage.clear();
      // Redirect to login page by navigating to "/login"
      window.location.href = "/";
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  const something = useColorModeValue(<FaMoon />, <FaSun />);
  if (!data) return "Loading...";

  return (
    <Box p={4} bg={bg} minH="100vh">
      <Box textAlign="right">
        <IconButton
          aria-label="Toggle color mode"
          icon={something}
          onClick={toggleColorMode}
          variant="ghost"
          color={iconColor}
        />
      </Box>
      <VStack spacing={8}>
        <Heading as="h1" size="xl" color={color}>
          Admin Dashboard {data!.data.name}
        </Heading>
        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          <GridItem>
            <Button
              as={RouterLink}
              to="/addstudent"
              leftIcon={<FaUserPlus />}
              colorScheme="teal"
              size="lg"
              w="100%"
              h="100px"
            >
              Create Student
            </Button>
          </GridItem>
          <GridItem>
            <Button
              as={RouterLink}
              to="/adminexceptionspanel"
              leftIcon={<FaExclamationTriangle />}
              colorScheme="teal"
              size="lg"
              w="100%"
              h="100px"
            >
              Manage Exceptions
            </Button>
          </GridItem>
          <GridItem>
            <Button
              as={RouterLink}
              to="/admin/faculty"
              leftIcon={<FaUniversity />}
              colorScheme="teal"
              size="lg"
              w="100%"
              h="100px"
            >
              Faculties
            </Button>
          </GridItem>
          <GridItem>
            <Button
              as={RouterLink}
              to="/admin/instructor"
              leftIcon={<FaChalkboardTeacher />}
              colorScheme="teal"
              size="lg"
              w="100%"
              h="100px"
            >
              Instructors
            </Button>
          </GridItem>
          <GridItem>
            <Button
              as={RouterLink}
              to="/admin/course"
              leftIcon={<FaCalendarPlus />}
              colorScheme="teal"
              size="lg"
              w="100%"
              h="100px"
            >
              Courses
            </Button>
          </GridItem>
          <GridItem>
            <Button
              as={RouterLink}
              to="/table"
              colorScheme="teal"
              size="lg"
              w="100%"
              h="100px"
            >
              Table
            </Button>
          </GridItem>
          <GridItem colSpan={2}>
            <Button
              onClick={handleLogout}
              leftIcon={<FaSignOutAlt />}
              colorScheme="red"
              size="lg"
              w="100%"
              h="100px"
            >
              Logout
            </Button>
          </GridItem>
        </Grid>
      </VStack>
    </Box>
  );
};

export default AdminDashboard;
