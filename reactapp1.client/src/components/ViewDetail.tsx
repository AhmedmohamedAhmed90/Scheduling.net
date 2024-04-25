import {
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Text,
  Avatar,
  HStack,
  Heading,
  VStack,
} from "@chakra-ui/react";
import { Product } from "../types/Product";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
};

const ViewDetail = ({ isOpen, onClose, product }: Props) => {
  return (
    <>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>View Detail {product.name}</DrawerHeader>

          <DrawerBody>
            <HStack>
              <Avatar size={"lg"} name={product.name} />
              <VStack alignItems={"self-start"}>
                <Heading fontSize={16}>{product.name}</Heading>
                <Heading fontSize={18}>{product.price} EGP</Heading>
                <Text>{product.description}</Text>
              </VStack>
            </HStack>
          </DrawerBody>

          <DrawerFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ViewDetail;
