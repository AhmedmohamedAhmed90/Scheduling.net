import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { BASE_URL } from "../constant";
import { Store } from "../Store"; // Adjust the import path to your Store context
import { useNavigate } from "react-router-dom";

const SendException: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { state } = useContext(Store);
  const [studentId, setStudentId] = useState("");
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [notification, setNotification] = useState<{ message: string, type: 'success' | 'error' | '' }>({ message: '', type: '' });

  useEffect(() => {
    if (state.id) {
      setStudentId(state.id);
    }
  }, [state.id]);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      setError("");

      const data = {
        studentId,
        reason,
        description,
      };

      await axios.post(`${BASE_URL}Exceptions`, data);

      // Clear form fields
      setReason("");
      setDescription("");
      toast({
        title: "Exception submitted successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/studentdashboard");
      // Show success message or perform any other action
    } catch (error) {
      // Show error message
      setNotification({ message: 'Failed to submit exception. Please try again.', type: 'error' });
      setError("Failed to submit exception. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Function to hide the notification after a certain time
  useEffect(() => {
    if (notification.message) {
      const timer = setTimeout(() => {
        setNotification({ message: '', type: '' });
      }, 5000); // Set the timeout duration in milliseconds
      return () => clearTimeout(timer);
    }
  }, [notification.message]);

  return (
    <Box maxWidth="400px" margin="0 auto">
      <Box position="relative">
        <form onSubmit={handleFormSubmit}>
          <Input type="hidden" value={studentId} readOnly />

          <FormControl id="reason" isRequired>
            <FormLabel>Reason</FormLabel>
            <Select value={reason} onChange={(e) => setReason(e.target.value)}>
              <option value="">Select Reason</option>
              <option value="sick">Sick</option>
              <option value="case of death">Case of Death</option>
            </Select>
          </FormControl>

        <FormControl id="description" isRequired>
          <FormLabel>Description</FormLabel>
          <Input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormControl>

        {error && (
          <FormErrorMessage mt={2} mb={4}>
            {error}
          </FormErrorMessage>
        )}

          <Button
            type="submit"
            colorScheme="blue"
            isLoading={isLoading}
            loadingText="Submitting..."
            mt={4}
          >
            Submit
          </Button>
        </form>

        {notification.message && (
          <Box
            position="absolute"
            bottom="-40px"
            left="50%"
            transform="translateX(-50%)"
            textAlign="center"
            p={4}
            bg={notification.type === 'success' ? 'green.400' : 'red.400'}
            color="white"
            borderRadius="md"
            boxShadow="md"
            animation="fadeInDown 0.5s ease-out"
          >
            <span>{notification.message}</span>
            <Button
              position="absolute"
              top="0"
              right="0"
              size="sm"
              variant="ghost"
              onClick={() => setNotification({ message: '', type: '' })}
            >
              Close
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default SendException;
