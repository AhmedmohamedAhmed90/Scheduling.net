import React from 'react';
import { Box, Button, VStack, Grid, GridItem, Heading, IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaSun, FaMoon, FaExclamation, FaEye, FaCalendarAlt, FaRegCalendarAlt } from 'react-icons/fa';

const StudentDashboard: React.FC = () => {
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
          Student Dashboard
        </Heading>
        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          <GridItem>
            <Button
              as={RouterLink}
              to="/sendexception"
              leftIcon={<FaExclamation />}
              colorScheme="teal"
              size="lg"
              w="100%"
              h="100px"
            >
              Send Exception
            </Button>
          </GridItem>
          <GridItem>
            <Button
              as={RouterLink}
              to="/studentexceptions"
              leftIcon={<FaEye />}
              colorScheme="teal"
              size="lg"
              w="100%"
              h="100px"
            >
              View Exceptions
            </Button>
          </GridItem>
          <GridItem>
            <Button
              as={RouterLink}
              to="/suggest"
              leftIcon={<FaCalendarAlt />}
              colorScheme="teal"
              size="lg"
              w="100%"
              h="100px"
            >
              Create Schedule
            </Button>
          </GridItem>
          <GridItem>
            <Button
              as={RouterLink}
              to="/table"
              leftIcon={<FaRegCalendarAlt />}
              colorScheme="teal"
              size="lg"
              w="100%"
              h="100px"
            >
              View Faculty Table
            </Button>
          </GridItem>
        </Grid>
      </VStack>
    </Box>
  );
};

export default StudentDashboard;
