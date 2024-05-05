import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Textarea,
  Flex,
  Spacer,
} from '@chakra-ui/react';
import { BASE_URL } from '../constant';



interface ExceptionFormProps {}

const SendException: React.FC<ExceptionFormProps> = () => {
  const [studentId, setStudentId] = useState('');
  const [reason, setReason] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${BASE_URL}Exceptions`, {
        studentId,
        reason,
        description,
      });

      console.log('Exception submitted successfully:', response.data);
    } catch (error) {
      console.error('Error submitting exception:', error);
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <FormControl id="studentId">
          <FormLabel>Student ID</FormLabel>
          <Input
            type="text"
            value={studentId}
            onChange={(event) => setStudentId(event.target.value)}
          />
        </FormControl>
        <FormControl id="reason">
          <FormLabel>Reason</FormLabel>
          <Select
            placeholder="Select reason"
            value={reason}
            onChange={(event) => setReason(event.target.value)}
          >
            <option value="seek">Seek</option>
            <option value="family_case_of_death">Family Case of Death</option>
          </Select>
        </FormControl>
        <FormControl id="description">
          <FormLabel>Description</FormLabel>
          <Textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </FormControl>
        <Flex>
          <Spacer />
          <Button type="submit" colorScheme="blue">
            Submit
          </Button>
        </Flex>
      </form>
    </Box>
  );
};

export default SendException;