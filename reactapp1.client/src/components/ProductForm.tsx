import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
} from "@chakra-ui/react";

type Props = { isOpen: boolean; onClose: () => void };

function ProductForm({ isOpen, onClose }: Props) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader shadow={"sm"}>Add Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <input type="text" placeholder="Name" />
            <Textarea placeholder="Description" />
            <input type="text" placeholder="Price" />
            <input type="checkbox" />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ProductForm;
