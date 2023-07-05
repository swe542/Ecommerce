import { Flex, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";

const PageNotFound = () => {
  return (
    <Layout title={"404 - Page not found | Miniature Mansion"}>
      <Flex
        align="center"
        justify="center"
        h="50vh"
        direction="column"
        mt="10vh"
        textAlign="center"
      >
        <Text fontSize="9xl" fontWeight="bold" color="grey">
          404
        </Text>
        <Text fontSize="2xl" mb={8}>
          Page Not Found
        </Text>
        <Link to="/">
          <Button
            py={4}
            px={8}
            bg="rgba(255, 255, 255, 0.1)"
            color="white"
            fontWeight="bold"
            borderRadius="lg"
            border="1px solid rgba(255, 255, 255, 0.1)"
            _hover={{
              bg: "rgba(255, 255, 255, 0.2)",
            }}
          >
            Go Back
          </Button>
        </Link>
      </Flex>
    </Layout>
  );
};

export default PageNotFound;
