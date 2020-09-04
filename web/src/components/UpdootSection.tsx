import { Flex, IconButton, Text } from "@chakra-ui/core";
import React, { useState } from "react";
import { PostSnippetFragment, useVoteMutation } from "../generated/graphql";

interface UpdootSectionProps {
  post: PostSnippetFragment;
}

export const UpdootSection: React.FC<UpdootSectionProps> = ({ post }) => {
  const [loadingState, setLoadingState] = useState<
    "updoot-loading" | "downdoot-loading" | "not-loading"
  >("not-loading");
  const [, vote] = useVoteMutation();

  return (
    <Flex direction="column" justify="center" align="center" mr={4}>
      <IconButton
        icon="chevron-up"
        aria-label="updoot post"
        onClick={async () => {
          // if (post.voteStatus === 1) {
          //   return;
          // }
          setLoadingState("updoot-loading");
          await vote({
            postId: post.id,
            value: 1,
          });
          setLoadingState("not-loading");
        }}
        variantColor={post.voteStatus === 1 ? "green" : undefined}
        isLoading={loadingState === "updoot-loading"}
      />
      <Text>{post.points}</Text>
      <IconButton
        icon="chevron-down"
        aria-label="downdoot post"
        onClick={async () => {
          // if (post.voteStatus === -1) {
          //   return;
          // }
          setLoadingState("downdoot-loading");
          await vote({
            postId: post.id,
            value: -1,
          });
          setLoadingState("not-loading");
        }}
        isLoading={loadingState === "downdoot-loading"}
        variantColor={post.voteStatus === -1 ? "red" : undefined}
      />
    </Flex>
  );
};
