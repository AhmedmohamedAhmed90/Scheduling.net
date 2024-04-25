import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Switch,
  Text,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { Product } from "../types/Product";
import { useState } from "react";
import axios from "axios";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  editProduct: Product | null;
};

function ProductForm({ isOpen, onClose, editProduct }: Props) {
  const toast = useToast();
  const [product, setProduct] = useState<Product>({
    id: editProduct?.id,
    name: editProduct?.name || "",
    description: editProduct?.description || "",
    price: editProduct?.price || 0,
    isInStore: editProduct?.isInStore || false,
  } as Product);
  const onAdd = async () => {
    await axios.post("api/Product", product);
    toast({
      title: "Product Added",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    onClose();
  };
  const onEdit = async () => {
    await axios.put(`api/Product/${editProduct!.id}`, product);
    toast({
      title: "Product Updated",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader shadow={"sm"}>Add Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack gap={3} align={"self-start"}>
              <Input
                type="text"
                placeholder="Name"
                value={product.name}
                onChange={(e) =>
                  setProduct({ ...product, name: e.target.value })
                }
              />
              <Textarea
                placeholder="Description"
                value={product.description}
                onChange={(e) =>
                  setProduct({ ...product, description: e.target.value })
                }
              />
              <Input
                type="number"
                placeholder="Price"
                value={product.price}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    price: Math.abs(parseInt(e.target.value)) || 0,
                  })
                }
              />
              <Text>Is In Store?</Text>
              <Switch
                isChecked={product.isInStore}
                onChange={(e) =>
                  setProduct({ ...product, isInStore: e.target.checked })
                }
              ></Switch>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button onClick={editProduct ? onEdit : onAdd} colorScheme="blue">
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ProductForm;
