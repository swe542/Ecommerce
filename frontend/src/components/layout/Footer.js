import {
  Box,
  Container,
  Flex,
  Link,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
  Image,
} from "@chakra-ui/react";
import logo from "../../assets/images/logo.png";
const Footer = () => {
  return (
    <Box bg={useColorModeValue("gray.50", "gray.900")} mt={6}>
      <Stack as="footer" py={10} ml={{ base: "5px", md: "8%" }}>
        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 4 }}
          spacing={8}
          maxW="none"
          ml="5%"
        >
          <Stack align={"flex-start"}>
            <Text fontWeight={"bold"}>Product</Text>
            <Link href={"#"}>Overview</Link>
            <Link href={"#"}>Tutorials</Link>
            <Link href={"#"}>Releases</Link>
          </Stack>
          <Stack align={"flex-start"}>
            <Text fontWeight={"bold"}>Company</Text>
            <Link href={"#"}>About Us</Link>
            <Link href={"#"}>Contact Us</Link>
            <Link href={"#"}>Partners</Link>
          </Stack>
          <Stack align={"flex-start"}>
            <Text fontWeight={"bold"}>Legal</Text>
            <Link href={"#"}>Cookies Policy</Link>
            <Link href={"#"}>Privacy Policy</Link>
            <Link href={"#"}>Terms of Service</Link>
          </Stack>
          <Stack align={"flex-start"}>
            <Text fontWeight={"bold"}>Follow Us</Text>
            <Link href={"#"}>Facebook</Link>
            <Link href={"#"}>Twitter</Link>
            <Link href={"#"}>Instagram</Link>
          </Stack>
        </SimpleGrid>
      </Stack>
      <Box py={10}>
        <Flex
          align={"center"}
          _before={{
            content: '""',
            borderBottom: "1px solid",
            borderColor: useColorModeValue("gray.200", "gray.700"),
            flexGrow: 1,
            mr: 8,
          }}
          _after={{
            content: '""',
            borderBottom: "1px solid",
            borderColor: useColorModeValue("gray.200", "gray.700"),
            flexGrow: 1,
            ml: 8,
          }}
        >
          <Image src={logo} w={30} mr={3} alt="logo" />
          <Text>Miniature Mansion</Text>
        </Flex>
        <Text pt={6} fontSize={"sm"} textAlign={"center"}>
          © 2023 Swechha Shrestha. All rights reserved
        </Text>
      </Box>
    </Box>
  );
};

export default Footer;
