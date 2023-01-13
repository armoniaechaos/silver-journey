import { useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import UsersModal from "./UsersModal/UsersModal";
import { Link, useRouter } from "@tanstack/react-router";

interface IAppProps {
  isUsersModalOpen?: boolean;
}

function App(props: IAppProps) {
  const router = useRouter();

  function onCloseModal() {
    router.navigate({ params: {}, search: {}, to: "/" });
  }

  return (
    <Box w="100%">
      <Link to="/users">
        <Button>Open modal</Button>
      </Link>
      <UsersModal isOpen={!!props.isUsersModalOpen} onClose={onCloseModal} />
    </Box>
  );
}

export default App;
