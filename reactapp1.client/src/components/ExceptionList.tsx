import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { BASE_URL } from "../constant";

interface Exception {
  exceptionId: number;
  student: Student;
  reason: string;
  description: string;
  status: string;
}

const ExceptionList: React.FC = () => {
  const [exceptions, setExceptions] = useState<Exception[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const toast = useToast();

  const getExceptions = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(`${BASE_URL}Exceptions`);
      const data = response.data;

      if (!data) {
        throw new Error("Invalid response format");
      }

      // Extract exceptions array from the response
      const exceptions: Exception[] = data;

      exceptions.sort((a, b) => {
        if (a.reason === "case of death" && b.reason !== "case of death") {
          return -1;
        } else if (
          a.reason !== "case of death" &&
          b.reason === "case of death"
        ) {
          return 1;
        }
        // If none of the above conditions met, maintain current order
        return 0;
      });

      setExceptions(exceptions);
    } catch (error) {
      setError("Failed to fetch exceptions");
      console.error("Failed to fetch exceptions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleExceptionAction = async (
    exceptionId: number,
    action: "approve" | "reject"
  ) => {
    const actionVerb = action === "approve" ? "Approved" : "Rejected";
    try {
      await axios.post(`${BASE_URL}Exceptions/${exceptionId}/${action}`);
      toast({
        title: "Exception Approved",
        description: `Exception with ID ${exceptionId} has been approved.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      getExceptions();
    } catch (error) {
      console.error("Failed to approve exception:", error);
      toast({
        title: "Failed to Approve Exception",
        description: "An error occurred while approving the exception.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Handle rejection of an exception
  const rejectException = async (exceptionId: number) => {
    try {
      await axios.post(`${BASE_URL}Exceptions/${exceptionId}/reject`);
      toast({
        title: "Exception Rejected",
        description: `Exception with ID ${exceptionId} has been rejected.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      // Refresh the exceptions list after the update
      getExceptions();
    } catch (error) {
      console.error("Failed to reject exception:", error);
      toast({
        title: "Failed to Reject Exception",
        description: "An error occurred while rejecting the exception.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    getExceptions();
  }, []);

  if (loading) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <CircularProgress isIndeterminate color="blue.500" />
      </Flex>
    );
  }

  if (error) {
    return <Text color="red.500">{error}</Text>;
  }

  return (
    <Box maxWidth="800px" margin="0 auto" p={5}>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Exceptions List
      </Text>
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>Student Name</Th>
            <Th>Reason</Th>
            <Th>Description</Th>
            <Th>Status</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {exceptions.map((exception) => (
            <Tr key={exception.exceptionId}>
              <Td>{exception.student.name}</Td>
              <Td>{exception.reason}</Td>
              <Td>{exception.description}</Td>
              <Td>{exception.status}</Td>
              <Td>
                {exception.status === "pending" && (
                  <Flex gap={2}>
                    <Tooltip
                      label="Approve this exception"
                      aria-label="Approve"
                    >
                      <Button
                        colorScheme="green"
                        size="sm"
                        onClick={() =>
                          handleExceptionAction(
                            exception.exceptionId,
                            "approve"
                          )
                        }
                        _hover={{ bg: "green.400" }}
                      >
                        Approve
                      </Button>
                    </Tooltip>
                    <Tooltip label="Reject this exception" aria-label="Reject">
                      <Button
                        colorScheme="red"
                        size="sm"
                        onClick={() =>
                          handleExceptionAction(exception.exceptionId, "reject")
                        }
                        _hover={{ bg: "red.400" }}
                      >
                        Reject
                      </Button>
                    </Tooltip>
                  </Flex>
                )}
                {exception.status === "approved" && (
                  <Text>Requset was approved</Text>
                )}
                {exception.status === "rejected" && (
                  <Text>Requset was rejected</Text>
                )}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {exceptions.length === 0 && (
        <Text textAlign="center" mt={4}>
          No exceptions found.
        </Text>
      )}
    </Box>
  );
};

export default ExceptionList;
