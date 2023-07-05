import React from "react";
import Layout from "../components/layout/Layout";
import {
  Box,
  Container,
  Heading,
  Image,
  Flex,
  Text,
  Center,
} from "@chakra-ui/react";
import mansion from "../assets/images/Fairy_House.jpg";
const About = () => {
  return (
    <Layout title={"About Us- Miniature Mansion"}>
      <Box py={10}>
        <Container maxW="6xl">
          <Heading as="h1" mb={10}>
            The Miniature Story
          </Heading>
          <Flex flexDirection={{ base: "column", md: "row" }}>
            <Box mr={{ base: 0, md: 8 }} mb={{ base: 4, md: 0 }} maxWidth="sm">
              <Image src={mansion} w="80%" alt="Miniature Mansion" />
            </Box>
            <Box flex="1" mt={7}>
              <Text fontSize="lg">
                Welcome to Miniature Mansion! We are passionate about creating
                detailed and exquisite miniature models that bring joy and
                wonderment to people of all ages. Our love for miniatures began
                with a simple hobby and has now evolved into a full-fledged
                endeavor to share the beauty and craftsmanship of these tiny
                worlds.
              </Text>
              <Text mt={4} fontSize="lg">
                Each miniature model we create is meticulously crafted with
                precision and care. From dollhouses and dioramas to miniature
                landscapes and architectural structures, our collection features
                a diverse range of themes and styles.Whether you're an avid
                collector, a hobbyist, or simply looking for a unique gift, we
                invite you to explore our world of miniatures.
              </Text>
            </Box>
          </Flex>
        </Container>
      </Box>
    </Layout>
  );
};

export default About;
