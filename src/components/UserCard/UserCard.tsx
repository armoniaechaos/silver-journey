import {
  Card,
  CardBody,
  Flex,
  Heading,
  Image,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { APIUser } from "../../model/APIUser";

interface IUserCardProps extends APIUser {}

export default function UserCard(props: IUserCardProps) {
  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
    >
      <Image
        objectFit="cover"
        maxW={{ base: "100%", sm: "120px" }}
        src={props.avatar}
        alt={`${props.username}'s avatar`}
      />

      <Stack>
        <CardBody>
          <Heading size="md" as="b">
            {props.first_name} {props.last_name}
          </Heading>

          <Stack>
            <Flex>
              <Text as="b">Email:</Text>
              <Link href={`mailto:${props.email}`}> {props.email}</Link>
            </Flex>
            <Flex>
              <Text as="b">Username:</Text>
              <Text> {props.username}</Text>
            </Flex>
          </Stack>
        </CardBody>
      </Stack>
    </Card>
  );
}
