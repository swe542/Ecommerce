import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  VStack,
  Flex,
} from "@chakra-ui/react";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const Login = ({ isOpen, onClose, onLinkClick, onForgotPasswordClick }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error("Try again");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Login</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Email Address</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </FormControl>

              <Button
                onClick={onForgotPasswordClick}
                variant="link"
                colorScheme="transparent"
                justifyContent={"flex-end"}
                fontWeight={"normal"}
              >
                <Text> Forgot password? Click here.</Text>
              </Button>

              <Button colorScheme="blue" type="submit" width={"100%"}>
                Login
              </Button>

              <Text>
                New here?{" "}
                <Text as="span" fontWeight="bold" textDecoration={"underline"}>
                  <Button
                    onClick={onLinkClick}
                    variant="link"
                    textDecoration="underline"
                    colorScheme="transparent"
                  >
                    Sign up.
                  </Button>
                </Text>
              </Text>
            </VStack>
          </ModalBody>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default Login;
