import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
} from '@chakra-ui/react';
import axios from 'axios';
import { BASE_URL } from '../constant';

interface ExceptionFormProps {
  // No need to pass baseUrl as a prop
}

const SendException: React.FC<ExceptionFormProps> = () => {
  const [studentId, setStudentId] = useState('');
  const [reason, setReason] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      setError('');

      const data = {
        studentId,
        reason,
        description,
      };

      await axios.post(`${BASE_URL}Exceptions`, data);

      // Clear form fields
      setStudentId('');
      setReason('');
      setDescription('');

      // Show success message or perform any other action
    } catch (error) {
      setError('Failed to submit exception. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box maxWidth="400px" margin="0 auto">
      <form onSubmit={handleFormSubmit}>
        <FormControl id="studentId" isRequired>
          <FormLabel>Student ID</FormLabel>
          <Input
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          />
        </FormControl>

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
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default SendException;