import React, { useContext, useEffect, useState } from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Text, Spinner } from '@chakra-ui/react';
import axios from 'axios';
import { Store } from '../Store'; // Adjust the import path to your Store context
import { BASE_URL } from '../constant'; // Adjust the import path to your constant file

interface Exception {
  id: number;
  studentId: string;
  reason: string;
  description: string;
  status: string;
}

const ExceptionsSummary: React.FC = () => {
  const { state } = useContext(Store);
  const [exceptions, setExceptions] = useState<Exception[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExceptions = async () => {
      try {
        const response = await axios.get(`${BASE_URL}Exceptions/${state.id}`);
        setExceptions(response.data);
      } catch (error) {
        setError('Failed to fetch exceptions. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (state.id) {
      fetchExceptions();
    }
  }, [state.id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" mt={5}>
        <Text fontSize="xl" color="red.500">
          {error}
        </Text>
      </Box>
    );
  }

  return (
    <Box maxWidth="600px" margin="0 auto" mt={5}>
      <Text fontSize="2xl" mb={5}>
        Exceptions Summary
      </Text>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Reason</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {exceptions.map((exception) => (
            <Tr key={exception.id}>
              <Td>{exception.reason}</Td>
              <Td>{exception.status}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default ExceptionsSummary;
