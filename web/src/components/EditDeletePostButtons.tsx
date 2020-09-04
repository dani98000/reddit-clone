import { Box, IconButton, Link } from "@chakra-ui/core";
import NextLink from "next/link";
import React from "react";
import { useDeletePostMutation, useMeQuery } from "../generated/graphql";

interface EditDeletePostButtonsProps {
  id: number;
  creatorId: number;
}

export const EditDeletePostButtons: React.FC<EditDeletePostButtonsProps> = ({
  id,
  creatorId,
}) => {
  const [, deletePost] = useDeletePostMutation();
  const [{ data }] = useMeQuery();

  if (data?.me?.id !== creatorId) {
    return null;
  }

  return (
    <Box>
      <IconButton
        icon="delete"
        aria-label="Delete Post"
        onClick={async () => {
          await deletePost({ id }).catch(() => {
            console.log("fuck");
          });
        }}
      />
      <NextLink href="/post/edit/[id]" as={`/post/edit/${id}`}>
        <IconButton as={Link} ml={2} icon="edit" aria-label="Edit Post" />
      </NextLink>
    </Box>
  );
};
