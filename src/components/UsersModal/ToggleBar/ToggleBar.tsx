import { Box, Button, Wrap, WrapItem } from "@chakra-ui/react";
import React from "react";
import { APIUser } from "../../../model/APIUser";

interface IToggleBarProps {
  users: APIUser[];
  selectedProfile?: APIUser;
  changeUserProfile: (id: number) => void;
}

export default function ToggleBar(props: IToggleBarProps) {
  const { users } = props;
  return (
    <Wrap>
      {users.map((user) => (
        <WrapItem
          key={user.id}
          onClick={() => props.changeUserProfile(user.id)}
          sx={{
            width: "20%",
          }}
        >
          <Button
            w="100%"
            variant="outline"
            isActive={user.id === props.selectedProfile?.id}
          >
            {user.first_name}
          </Button>
        </WrapItem>
      ))}
    </Wrap>
  );
}
