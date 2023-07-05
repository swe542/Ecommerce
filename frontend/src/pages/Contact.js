import React from "react";
import Layout from "../components/layout/Layout";
import { Box, Container, Heading, Text, Flex } from "@chakra-ui/react";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import { ImFileText2 } from "react-icons/im";

const Contact = () => {
  return (
    <Layout title={"Contact Us- Miniature Mansion"}>
      <Box py={10}>
        <Container maxW="6xl" textAlign="center">
          <Heading fontSize="5xl" mb={4}>
            Contact Us
          </Heading>
          <Flex flexDirection="row" gap="10%" mt="9%" justify={"center"}>
            <Box align="center" justify="center">
              <FaMapMarkerAlt size={30} />
              <Text fontSize="lg" mt={2} mb={4}>
                ADDRESS
              </Text>
              <Text ml={2}>Kathmandu, Nepal</Text>
            </Box>
            <Box align="center" justify="center">
              <FaPhone size={30} />
              <Text fontSize="lg" mt={2} mb={4}>
                PHONE
              </Text>
              <Text ml={2}>+977 9812345679</Text>
            </Box>
            <Box align="center">
              <ImFileText2 size={30} />
              <Text fontSize="lg" mt={2} mb={4}>
                EMAIL
              </Text>
              <Text ml={2}>miniature@gmail.com</Text>
            </Box>
          </Flex>
        </Container>
      </Box>
    </Layout>
  );
};

export default Contact;
