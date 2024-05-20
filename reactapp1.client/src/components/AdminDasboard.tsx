import React from 'react';
import {
  Box,
  Button,
  VStack,
  Grid,
  GridItem,
  Heading,
  IconButton,
  useColorMode,
  useColorModeValue
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import {
  FaSun,
  FaMoon,
  FaUserPlus,
  FaExclamationTriangle,
  FaCalendarPlus,
  FaUniversity,
  FaChalkboardTeacher,
  FaUsers
} from 'react-icons/fa';

const AdminDashboard: React.FC = () => {
  const { toggleColorMode } = useColorMode();
  const bg = useColorModeValue('gray.100', 'gray.700');
  const color = useColorModeValue('black', 'white');
  const iconColor = useColorModeValue('gray.600', 'gray.300');

  return (
    <Box p={4} bg={bg} minH="100vh">
      <Box textAlign="right">
        <IconButton
          aria-label="Toggle color mode"
          icon={useColorModeValue(<FaMoon />, <FaSun />)}
          onClick={toggleColorMode}
          variant="ghost"
          color={iconColor}
        />
      </Box>
      <VStack spacing={8}>
        <Heading as="h1" size="xl" color={color}>
          Admin Dashboard
        </Heading>
        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          <GridItem>
            <Button
              as={RouterLink}
              to="/"
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
              to="/admin/course/create"
              leftIcon={<FaCalendarPlus />}
              colorScheme="teal"
              size="lg"
              w="100%"
              h="100px"
            >
              Create Course
            </Button>
          </GridItem>
          <GridItem>
            <Button
              as={RouterLink}
              to="/admin/faculty/create"
              leftIcon={<FaUniversity />}
              colorScheme="teal"
              size="lg"
              w="100%"
              h="100px"
            >
              Create Faculty
            </Button>
          </GridItem>
          <GridItem>
            <Button
              as={RouterLink}
              to="/admin/instructor/create"
              leftIcon={<FaChalkboardTeacher />}
              colorScheme="teal"
              size="lg"
              w="100%"
              h="100px"
            >
              Create Instructor
            </Button>
          </GridItem>
          <GridItem>
            <Button
              as={RouterLink}
              to="/admin/university/create"
              leftIcon={<FaUniversity />}
              colorScheme="teal"
              size="lg"
              w="100%"
              h="100px"
            >
              Create University
            </Button>
          </GridItem>
          <GridItem>
            <Button
              as={RouterLink}
              to="/admin/group/create"
              leftIcon={<FaUsers />}
              colorScheme="teal"
              size="lg"
              w="100%"
              h="100px"
            >
              Create Group
            </Button>
          </GridItem>
        </Grid>
      </VStack>
    </Box>
  );
};

export default AdminDashboard;