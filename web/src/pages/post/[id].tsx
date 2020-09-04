import { Box, Heading } from "@chakra-ui/core";
import { withUrqlClient } from "next-urql";
import React from "react";
import { EditDeletePostButtons } from "../../components/EditDeletePostButtons";
import { Layout } from "../../components/Layout";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useGetPostFromUrl } from "../../utils/useGetPostFromUrl";

interface PostProps {}

const Post: React.FC<PostProps> = ({}) => {
  const [{ data, fetching, error }] = useGetPostFromUrl();

  if (fetching) {
    return (
      <Layout>
        <div>loading...</div>
      </Layout>
    );
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  if (!data?.post) {
    return (
      <Layout>
        <Box>could not find post</Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Heading mb={8}>{data.post.title}</Heading>
      <Box mb={4}>{data.post.text}</Box>
      <Box>
        <EditDeletePostButtons
          id={data.post.id}
          creatorId={data.post.creator.id}
        />
      </Box>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Post);
