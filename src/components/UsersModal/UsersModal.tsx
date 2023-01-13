import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  CircularProgress,
  Stack,
} from "@chakra-ui/react";
import { useGetUsers } from "../../queries/useGetUsers";
import UserCard from "../UserCard/UserCard";

interface IUsersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UsersModal(props: IUsersModalProps) {
  const { isOpen, onClose } = props;
  const [size, setSize] = React.useState(20);

  const { data, isLoading } = useGetUsers({ size, enabled: isOpen });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Users</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <Stack>
              {data?.map((user) => (
                <UserCard {...user} />
              ))}
            </Stack>
          )}
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="ghost">Secondary Action</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
