import { AddIcon } from "@chakra-ui/icons";
import "./App.css";
import {
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Flex,
  Heading,
  Button,
  HStack,
  Avatar,
  Text,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Product } from "./types/Product";
import axios from "axios";

function App() {
  const { isPending, error, data } = useQuery({
    queryKey: ["Get All Products"],
    queryFn: () => axios.get("/api/Product").then((res) => res.data),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;
  return (
    <Box shadow="md" borderWidth="1px" rounded="md" m="32">
      <Flex
        alignItems={"center"}
        mb={5}
        px={5}
        justifyContent={"space-between"}
      >
        <Heading>Product List</Heading>
        <Button colorScheme="blue" leftIcon={<AddIcon />}>
          Add Product
        </Button>
      </Flex>
      <TableContainer>
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th isNumeric>ID</Th>
              <Th>Name</Th>
              <Th>Description</Th>
              <Th>Is In Store?</Th>
              <Th isNumeric>Price</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((product: Product) => (
              <Tr key={product.id}>
                <Td isNumeric>{product.id}</Td>
                <Td>
                  <HStack>
                    <Avatar name={product.name} />
                    <Text>{product.name}</Text>
                  </HStack>
                </Td>
                <Td>{product.description}</Td>
                <Td>{product.isInStore ? "Yes" : "No"}</Td>
                <Td isNumeric>{product.price}</Td>
                <Td>
                  <Button colorScheme="blue">Edit</Button>
                  <Button colorScheme="red">Delete</Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      {data.length === 0 && (
        <Heading textAlign="center" p={5} fontSize={14}>
          No products found
        </Heading>
      )}
    </Box>
  );
}

export default App;
