import React, { useState } from "react";
import { useAuth } from "../../context/auth";
import useCategory from "../../hooks/useCategory";
import { BsCart3 } from "react-icons/bs";
import { BiBox, BiUserCircle } from "react-icons/bi";
import { BsChevronDown } from "react-icons/bs";
import SignUpModal from "../auth/SignUpModal";
import { Link, NavLink } from "react-router-dom";
import Login from "../auth/Login";
import { Toast, toast } from "react-hot-toast";
import ForgotPassword from "../auth/ForgotPassword";

import {
  Box,
  Flex,
  Text,
  Button,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Spacer,
  useDisclosure,
  Circle,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, ChevronDownIcon } from "@chakra-ui/icons";
import SearchInput from "../form/SearchInput";
import { useCart } from "../../context/cart";

const NavigationBar = () => {
  const { isOpen, onToggle } = useDisclosure();
  const categories = useCategory();
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const [isSignUpOpen, setSignUpOpen] = useState(false);
  const [isForgotPasswordModalOpen, setForgotPasswordModalOpen] =
    useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const handleLoginModalOpen = () => {
    setLoginModalOpen(true);
  };

  const handleLoginModalClose = () => {
    setLoginModalOpen(false);
  };
  const handleLinkClick = () => {
    setLoginModalOpen(false);
    setSignUpOpen(true);
  };

  const handleSignUpClose = () => {
    setSignUpOpen(false);
  };
  const handleForgotPasswordModalOpen = () => {
    setLoginModalOpen(false);
    setForgotPasswordModalOpen(true);
  };

  const handleForgotPasswordModalClose = () => {
    setForgotPasswordModalOpen(false);
  };

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logged out successfully");
  };

  return (
    <Flex
      position={"fixed"}
      top={0}
      zIndex="1"
      bg="#1A202C"
      w={"100%"}
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding={4}
      color="white"
      boxShadow="0 2px 10px rgba(0, 0, 0, 0.3), 0 6px 20px rgba(0, 0, 0, 0.3)"
    >
      <Flex align="center">
        <IconButton
          aria-label="Toggle menu"
          variant="ghost"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          display={{ base: "block", md: "none" }}
          onClick={onToggle}
        />

        <Text fontSize="lg" fontWeight="bold" pl={{ base: "none", md: "4" }}>
          MiniMansion
        </Text>
      </Flex>

      <Box
        display={{ base: isOpen ? "block" : "none", md: "block" }}
        width={{ base: "full", md: "auto" }}
        mt={{ base: 4, md: 0 }}
        ml={{ base: "0", md: "6" }}
      >
        <Flex
          align="center"
          justify={{ base: "center", md: "flex-end" }}
          direction={{ base: "column", md: "row" }}
          gap={{ base: "1", md: "6" }}
        >
          <NavLink to="/">
            {" "}
            <Text>Home</Text>
          </NavLink>
          <NavLink to="/about">
            {" "}
            <Text>About Us</Text>
          </NavLink>
          <NavLink to="/contact">
            {" "}
            <Text>Contact</Text>
          </NavLink>
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              bg="transparent"
              fontWeight={"none"}
            >
              Category
            </MenuButton>
            <MenuList>
              {categories.map((c) => (
                <Link to={`/category/${c.slug}`}>
                  <MenuItem>{c.name}</MenuItem>
                </Link>
              ))}
            </MenuList>
          </Menu>
          <SearchInput />
          <Box position={"relative"}>
            <NavLink to="/cart">
              <IconButton
                aria-label="Cart"
                variant="ghost"
                icon={<BsCart3 size={22} />}
                marginRight={2}
              />

              <Circle
                maxH={"20px"}
                bg={"red"}
                position={"absolute"}
                top={"1px"}
                ml={"22px"}
                borderRadius={"50px"}
                px={"2px"}
              >
                {cart?.length}
              </Circle>
            </NavLink>
          </Box>
        </Flex>
      </Box>

      <Flex align="center">
        <IconButton
          aria-label="User"
          variant="ghost"
          icon={
            !auth.user ? (
              <>
                <BiUserCircle size={26} onClick={handleLoginModalOpen} />
                <SignUpModal
                  isOpen={isSignUpOpen}
                  onClose={handleSignUpClose}
                />
                <Login
                  isOpen={isLoginModalOpen}
                  onClose={handleLoginModalClose}
                  onLinkClick={handleLinkClick}
                  onForgotPasswordClick={handleForgotPasswordModalOpen}
                />
                <ForgotPassword
                  isOpen={isForgotPasswordModalOpen}
                  onClose={handleForgotPasswordModalClose}
                />
              </>
            ) : (
              <>
                <Menu>
                  <MenuButton
                    as={Button}
                    rightIcon={<BsChevronDown />}
                    bg="transparent"
                  >
                    {auth?.user?.name}
                  </MenuButton>
                  <MenuList zIndex="999">
                    {/* <NavLink to="/dashboard/admin"> */}
                    <NavLink
                      to={`/dashboard/${
                        auth?.user?.role === 1 ? "admin" : "user"
                      }`}
                    >
                      <MenuItem>Dashboard</MenuItem>
                    </NavLink>
                    <NavLink onClick={handleLogout} to="/">
                      <MenuItem>Logout</MenuItem>
                    </NavLink>
                  </MenuList>
                </Menu>
              </>
            )
          }
        />
      </Flex>
    </Flex>
  );
};

export default NavigationBar;
