import { Box, Button, Flex, Heading, Link } from "@chakra-ui/core";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const router = useRouter();
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery({ pause: isServer() });
  let body = null;

  // Data is loading
  if (fetching) {
    // User is not logged in
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          <Link mr={2}>Login</Link>
        </NextLink>
        <NextLink href="/register">
          <Link>Register</Link>
        </NextLink>
      </>
    );

    // User is logged in
  } else {
    body = (
      <Flex align="center">
        <NextLink href="/create-post">
          <Button mr={5} as={Link}>
            create post
          </Button>
        </NextLink>
        <Box mr={2}>{data?.me.username}</Box>
        <Button
          isLoading={logoutFetching}
          variant="link"
          onClick={async () => {
            await logout();
            router.reload();
          }}
        >
          logout
        </Button>
      </Flex>
    );
  }

  return (
    <Flex zIndex={1} position="sticky" bg="tan" p={4} top={0}>
      <Flex maxW={800} align="center" flex={1} m="auto">
        <NextLink href="/">
          <Link>
            <Heading>Lireddit</Heading>
          </Link>
        </NextLink>
        <Box ml={"auto"}>{body}</Box>
      </Flex>
    </Flex>
  );
};
