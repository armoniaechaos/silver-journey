import { useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import UsersModal from "./UsersModal/UsersModal";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function onCloseModal() {
    setIsOpen(false);
  }

  return (
    <Box w="100%">
      <Button onClick={openModal}>Open modal</Button>
      <UsersModal isOpen={isOpen} onClose={onCloseModal} />
    </Box>
  );
}

export default App;
