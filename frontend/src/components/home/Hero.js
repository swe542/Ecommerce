import React from "react";
import hero from "../../assets/images/hero.png";
import {
  Box,
  Select,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Button,
  Heading,
} from "@chakra-ui/react";
const Hero = () => {
  return (
    <>
      <Box py={4}>
        <Flex
          maxW="6xl"
          mx="auto"
          px={4}
          align="center"
          justify="space-between"
          flexDirection={["column", "column", "row"]} // Responsive flexDirection
        >
          <Box flex="1" ml={5}>
            <Heading as="h1" size="2xl" mb={4}>
              Welcome to MiniMansion
            </Heading>
            <Text fontSize="lg" mb={6}>
              Explore and build your favorite Miniature Mansion.
            </Text>
            <Button colorScheme="pink" size="lg">
              Shop Now
            </Button>
          </Box>
          <Box flex="1" mt={[10, 10, 0]}>
            <img src={hero} alt="Hero" width="100%" />
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default Hero;
