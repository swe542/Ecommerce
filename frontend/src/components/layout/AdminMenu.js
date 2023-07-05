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
import { useEffect, useState } from "react";

const AdminMenu = () => {
  const { isOpen, onToggle } = useDisclosure();
  const [selectedItem, setSelectedItem] = useState(0);

  const handleItemClick = (index) => {
    setSelectedItem(selectedItem === index ? 0 : index);
  };

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
        <List mt={{ base: "5%", md: "5%" }} ml={9} mr={9}>
          <Text fontSize={{ base: "xl", md: "2xl" }} mb={5}>
            {" "}
            Admin Panel
          </Text>
          <NavLink to="/dashboard/admin/create-category">
            <ListItem
              mb={6}
              bg={selectedItem === 3 ? "gray.600" : "transparent"}
              _hover={{ bg: "gray.600" }}
              onClick={() => handleItemClick(3)}
            >
              Create Category
            </ListItem>
          </NavLink>
          <NavLink to="/dashboard/admin/create-product">
            <ListItem
              mb={6}
              bg={selectedItem === 1 ? "gray.600" : "transparent"}
              _hover={{ bg: "gray.600" }}
              onClick={() => handleItemClick(1)}
            >
              Create Product
            </ListItem>
          </NavLink>
          <NavLink to="/dashboard/admin/users">
            <ListItem
              mb={6}
              bg={selectedItem === 2 ? "gray.600" : "transparent"}
              _hover={{ bg: "gray.600" }}
              onClick={() => handleItemClick(2)}
            >
              Users
            </ListItem>
          </NavLink>
          <NavLink to="/dashboard/admin/products">
            <ListItem
              mb={6}
              bg={selectedItem === 4 ? "gray.600" : "transparent"}
              _hover={{ bg: "gray.600" }}
              onClick={() => handleItemClick(2)}
            >
              Products
            </ListItem>
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

export default AdminMenu;
