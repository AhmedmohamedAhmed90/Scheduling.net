import { AddIcon, DeleteIcon, EditIcon, ViewIcon } from "@chakra-ui/icons";
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
  useDisclosure,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Product } from "./types/Product";
import axios from "axios";
import ProductSkeleton from "./components/ProductSkeleton";
import ProductForm from "./components/ProductForm";

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { isPending, error, data } = useQuery({
    queryKey: ["Get All Products"],
    queryFn: () => axios.get("/api/Product").then((res) => res.data),
  });

  if (isPending) return ProductSkeleton();

  if (error) return ProductSkeleton();
  return (
    <Box shadow="md" borderWidth="1px" rounded="md" m="32">
      <Flex
        alignItems={"center"}
        mb={5}
        px={5}
        justifyContent={"space-between"}
      >
        <Heading fontSize={20}>Product List</Heading>
        <Button colorScheme="blue" leftIcon={<AddIcon />} onClick={onOpen}>
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
                    <Avatar size={"sm"} name={product.name} />
                    <Text>{product.name}</Text>
                  </HStack>
                </Td>
                <Td>{product.description}</Td>
                <Td>{product.isInStore ? "Yes" : "No"}</Td>
                <Td isNumeric>{product.price}</Td>
                <Td>
                  <HStack gap={3}>
                    <EditIcon color={"blue"} boxSize={22} />
                    <DeleteIcon color={"red"} boxSize={22} />
                    <ViewIcon color={"green"} boxSize={22} />
                  </HStack>
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
      {isOpen && <ProductForm isOpen={isOpen} onClose={onClose} />}
    </Box>
  );
}

export default App;
