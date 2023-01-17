import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import React, { PropsWithChildren } from "react";
import { APIUser } from "../../../model/APIUser";

interface IToggleBarProps {
  users: APIUser[];
  selectedProfile?: APIUser;
  changeUserProfile: (id: number) => void;
}

function ProfileToggle(
  props: PropsWithChildren<{ isActive: boolean; numberOfItemsInRow: number }>
) {
  const { isActive, numberOfItemsInRow } = props;
  console.log(numberOfItemsInRow, typeof numberOfItemsInRow);

  return (
    <Box
      w="100%"
      sx={{
        backgroundColor: isActive ? "gray.200" : "gray.100",
        padding: "0.5rem",
        textAlign: "center",
        fontSize: "1rem",

        // This selector is selecting the first element of each row when the number of items in a row is 4
        ".grid-item:nth-child(4n + 1) &":
          numberOfItemsInRow === 4
            ? {
                borderRadius: "0.5rem 0 0 0.5rem",
              }
            : {},

        // This selector is selecting the last element of each row
        ".grid-item:nth-child(4n) &, .grid-item:last-child &":
          numberOfItemsInRow === 4
            ? {
                borderRadius: "0 0.5rem 0.5rem 0",
              }
            : {},

        // This selector is selecting the first element of each row when the number of items in a row is 5
        ".grid-item:nth-child(5n + 1) &":
          numberOfItemsInRow === 5
            ? {
                borderRadius: "0.5rem 0 0 0.5rem",
              }
            : {},

        // This selector is selecting the last element of each row
        ".grid-item:nth-child(5n) &, .grid-item:last-child &":
          numberOfItemsInRow === 5
            ? {
                borderRadius: "0 0.5rem 0.5rem 0",
              }
            : {},
      }}
    >
      <Text noOfLines={1}>{props.children}</Text>
    </Box>
  );
}

export default function ToggleBar(props: IToggleBarProps) {
  const { users } = props;

  const numberOfItemsInRow = React.useMemo(() => {
    const numberOfUsers = users.length;

    // Modulo of 4
    const modulo4 = numberOfUsers % 4;
    // Modulo of 5

    const modulo5 = numberOfUsers % 5;

    // If the number of users is a multiple of 5, we can display 5 items per row
    if (modulo5 === 0) {
      return 5;
    }

    // If the number of users is a multiple of 4, we can display 4 items per row
    if (modulo4 === 0) {
      return 4;
    }

    // And if the number of users is not a multiple of 4 or 5, we can display 5 items per row
    return 5;
  }, [users]);

  return (
    <Grid
      p={1}
      gridTemplateColumns={`repeat(${numberOfItemsInRow}, 1fr)`}
      gridRowGap={1}
    >
      {users.map((user) => (
        <GridItem
          className="grid-item"
          onClick={() => props.changeUserProfile(user.id)}
        >
          <ProfileToggle
            isActive={user.id === props.selectedProfile?.id}
            numberOfItemsInRow={numberOfItemsInRow}
          >
            {user.first_name}
          </ProfileToggle>
        </GridItem>
      ))}
    </Grid>
  );
}
