import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Skeleton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

function FacultySkeleton() {
  return (
    <Box shadow="md" borderWidth="1px" rounded="md" m="32">
      <Skeleton>
        <Flex
          alignItems={"center"}
          mb={5}
          px={5}
          justifyContent={"space-between"}
        >
          <Heading fontSize={20}>Faculty List</Heading>
          <Button mt={5} colorScheme="blue" leftIcon={<AddIcon />}>
            Add Faculty
          </Button>
        </Flex>
      </Skeleton>
      <TableContainer>
        <Skeleton>
          <Table variant="striped">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td></Td>
                <Td>
                  <HStack gap={3}>
                    <EditIcon color={"blue"} boxSize={22} />
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
                          <Button float={"right"} colorScheme="red">
                            Delete
                          </Button>
                        </PopoverFooter>
                      </PopoverContent>
                    </Popover>
                  </HStack>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </Skeleton>
      </TableContainer>
    </Box>
  );
}

export default FacultySkeleton;
