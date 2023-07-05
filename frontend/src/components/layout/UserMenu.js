import React from "react";
import {
  Box,
  Flex,
  Text,
  IconButton,
  List,
  ListItem,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

import { NavLink } from "react-router-dom";
const UserMenu = () => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Flex>
      <Box
        as="aside"
        w={{ base: isOpen ? "200px" : "0", md: "20%" }}
        bg="gray.800"
        color="white"
        h="fit-content"
        position={{ base: "fixed", md: "absolute" }}
        overflowY="auto"
        transition="width 0.2s"
        display={{ base: "block", md: "block" }}
        boxShadow="2px 0 10px rgba(0, 0, 0, 0.3)"
        zIndex="0.5"
      >
        <List mt={{ base: "5%", md: "5%" }} ml={9}>
          <Text fontSize={{ base: "xl", md: "2xl" }} mb={5}>
            {" "}
            Dashboard
          </Text>
          <NavLink to="/dashboard/user/profile">
            <ListItem mb={6}>Profile</ListItem>
          </NavLink>
          <NavLink to="/dashboard/user/order">
            <ListItem mb={6}>Orders</ListItem>
          </NavLink>
        </List>
      </Box>

      {isOpen && (
        <IconButton
          aria-label="Close sidebar"
          variant="ghost"
          icon={<CloseIcon />}
          display={{ base: "block", md: "none" }}
          onClick={onToggle}
          zIndex="999"
          ml="160px"
        />
      )}

      {!isOpen && (
        <IconButton
          aria-label="Open sidebar"
          variant="ghost"
          icon={<HamburgerIcon />}
          display={{ base: "block", md: "none" }}
          onClick={onToggle}
          zIndex="999"
        />
      )}
    </Flex>
  );
};

export default UserMenu;
