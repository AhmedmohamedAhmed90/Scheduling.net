import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  Table,
  Box,
  Flex,
  Heading,
  TableContainer,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  HStack,
  Text,
  Skeleton,
  SkeletonCircle,
} from "@chakra-ui/react";

function ProductSkeleton() {
  return (
    <Box shadow="md" borderWidth="1px" rounded="md" m="32">
      <Flex
        alignItems={"center"}
        mb={5}
        px={5}
        justifyContent={"space-between"}
      >
        <Heading fontSize={18}>
          <Skeleton>Product List</Skeleton>
        </Heading>
        <Skeleton>
          <Button colorScheme="blue" leftIcon={<AddIcon />}>
            Add Product
          </Button>
        </Skeleton>
      </Flex>
      <TableContainer>
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>
                <Skeleton>ID</Skeleton>
              </Th>
              <Th>
                <Skeleton>Name</Skeleton>
              </Th>
              <Th>
                <Skeleton>Description</Skeleton>
              </Th>
              <Skeleton></Skeleton>
              <Th>
                <Skeleton>Is In Store?</Skeleton>
              </Th>
              <Th>
                <Skeleton>Price</Skeleton>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {Array.from({ length: 5 }).map((_, index) => (
              <Tr key={index}>
                <Td isNumeric>
                  <Skeleton>01</Skeleton>
                </Td>
                <Td>
                  <HStack>
                    <SkeletonCircle>AD</SkeletonCircle>
                    <Text>
                      <Skeleton>Product Name</Skeleton>
                    </Text>
                  </HStack>
                </Td>
                <Td>
                  <Skeleton>Product Description</Skeleton>
                </Td>
                <Td>
                  <Skeleton>Yes</Skeleton>
                </Td>
                <Td>
                  <Skeleton>123</Skeleton>
                </Td>
                <Td>
                  <HStack gap={3}>
                    <SkeletonCircle>edit icon</SkeletonCircle>
                    <SkeletonCircle>delete icon</SkeletonCircle>
                    <SkeletonCircle>vire icon</SkeletonCircle>
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default ProductSkeleton;
