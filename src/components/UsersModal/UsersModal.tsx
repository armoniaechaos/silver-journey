import React, { ChangeEvent, useEffect, useMemo } from "react";
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
  Flex,
  IconButton,
  Tooltip,
  NumberInput,
  NumberInputField,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { RepeatIcon } from "@chakra-ui/icons";
import { useGetUsers } from "../../queries/useGetUsers";
import UserCard from "../UserCard/UserCard";
import ToggleBar from "./ToggleBar/ToggleBar";
import { useQueryClient } from "@tanstack/react-query";

interface IUsersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DEFAULT_SIZE = 10;

export default function UsersModal(props: IUsersModalProps) {
  const { isOpen, onClose } = props;

  // This is the size of the data we want to fetch
  const [size, setSize] = React.useState(DEFAULT_SIZE);

  const [sizeInput, setSizeInput] = React.useState(DEFAULT_SIZE);

  const queryClient = useQueryClient();

  const [selectedId, setSelectedId] = React.useState(0);

  const { data, isLoading, error, isError } = useGetUsers({
    size,
    enabled: isOpen,
  });

  const selectedProfile = useMemo(() => {
    if (data && selectedId) {
      return data?.find((user) => user.id === selectedId);
    } else if (data) {
      return data[0];
    }
  }, [data, selectedId]);

  useEffect(() => {
    if (data) {
      setSelectedId(data[0].id);
    }
  }, [data]);

  function changeUserProfile(id: number) {
    setSelectedId(id);
  }

  function refreshData() {
    queryClient.invalidateQueries(["users"]);
  }

  function changeSize(valueAsString: string, valueAsNumber: number) {
    setSizeInput(valueAsNumber);
  }

  function submitSize() {
    setSize(sizeInput);
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <ToggleBar
            users={data || []}
            selectedProfile={selectedProfile}
            changeUserProfile={changeUserProfile}
          />
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <>
            {isError ? (
              <Alert status="error" variant="top-accent">
                <AlertIcon />
                {error.message}
              </Alert>
            ) : isLoading || !selectedProfile ? (
              <CircularProgress />
            ) : (
              <Stack>
                <UserCard {...selectedProfile} />
              </Stack>
            )}
          </>
        </ModalBody>

        <ModalFooter w="100%">
          <Flex w="100%">
            <Tooltip label="Refresh data">
              <IconButton
                onClick={refreshData}
                aria-label="refresh data"
                icon={<RepeatIcon />}
                sx={{
                  marginRight: "auto",
                }}
              />
            </Tooltip>

            <NumberInput
              variant="filled"
              min={0}
              maxWidth="100px"
              value={sizeInput || ""}
              onChange={changeSize}
            >
              <NumberInputField />
            </NumberInput>
            <Button sx={{ marginLeft: 2 }} onClick={submitSize}>
              Update size
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
