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
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  useToast,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Product } from "./types/Product";
import axios from "axios";
import ProductSkeleton from "./components/ProductSkeleton";
import ProductForm from "./components/ProductForm";
import { useState } from "react";
import ViewDetail from "./components/ViewDetail";

function App() {
  const toast = useToast();
  const [productDeatil, setProductDetail] = useState<Product | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenDetail,
    onOpen: onOpenDetail,
    onClose: onCloseDetail,
  } = useDisclosure();

  const [product, setProduct] = useState<Product | null>(null);
  const { refetch, isPending, error, data } = useQuery({
    queryKey: ["Get All Products"],
    queryFn: () => axios.get("/api/Product").then((res) => res.data),
  });

  const getProduct = async (id: number) => {
    const response = await axios.get(`/api/Product/${id}`);
    setProduct(response.data);
  };

  const deleteProduct = async (id: number) => {
    await axios.delete(`/api/Product/${id}`);
    toast({
      title: "Product Deleted",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    refetch();
  };

  if (isPending) return ProductSkeleton();

  if (error) return "Error";

  return (
    <Box shadow="md" borderWidth="1px" rounded="md" m="32">
      <Flex
        alignItems={"center"}
        mb={5}
        px={5}
        justifyContent={"space-between"}
      >
        <Heading fontSize={20}>Product List</Heading>
        <Button
          mt={5}
          colorScheme="blue"
          leftIcon={<AddIcon />}
          onClick={() => {
            setProduct(null);
            onOpen();
          }}
        >
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
                    <EditIcon
                      color={"blue"}
                      boxSize={22}
                      onClick={async () => {
                        await getProduct(product.id!);
                        onOpen();
                      }}
                    />
                    <Popover>
                      <PopoverTrigger>
                        <DeleteIcon color={"red"} boxSize={22} />
                      </PopoverTrigger>
                      <PopoverContent>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverHeader>Confirmation!</PopoverHeader>
                        <PopoverBody>
                          Are you sure you want to delete this?
                        </PopoverBody>
                        <PopoverFooter>
                          <Button
                            float={"right"}
                            colorScheme="red"
                            onClick={() => deleteProduct(product.id!)}
                          >
                            Delete
                          </Button>
                        </PopoverFooter>
                      </PopoverContent>
                    </Popover>
                    <ViewIcon
                      onClick={async () => {
                        setProductDetail(product);
                        onOpenDetail();
                      }}
                      color={"green"}
                      boxSize={22}
                    />
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
      {isOpen && (
        <ProductForm
          isOpen={isOpen}
          editProduct={product}
          onClose={() => {
            refetch();
            onClose();
          }}
        />
      )}
      {isOpenDetail && (
        <ViewDetail
          isOpen={isOpenDetail}
          onClose={onCloseDetail}
          product={productDeatil!}
        />
      )}
    </Box>
  );
}

export default App;
