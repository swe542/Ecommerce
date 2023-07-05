import UserMenu from "../../components/layout/UserMenu";
import {
  Flex,
  Box,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";
import Layout from "../../components/layout/Layout";
import React, { useState, useEffect } from "react";

import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import GridLayout from "../../components/common/GridLayout";
import { useAuth } from "../../context/auth";

const Profile = () => {
  return (
    <Layout title={"Dashboard - Profile"}>
      <GridLayout Menu={<UserMenu />} Content={<UserProfile />} />
    </Layout>
  );
};

const UserProfile = () => {
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const token = auth?.token;
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        "/api/v1/auth/profile",
        {
          name,
          email,
          password,
          phone,
          address,
        },
        config
      );
      if (data?.errro) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  //get user data
  useEffect(() => {
    const { email, name, phone, address } = auth?.user;
    setName(name);
    setPhone(phone);
    setEmail(email);
    setAddress(address);
  }, [auth?.user]);

  return (
    <Box px={6}>
      <Text fontSize={"xl"} mb={4}>
        User Profile
      </Text>
      <FormControl>
        <FormLabel>Full Name</FormLabel>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </FormControl>
      <FormControl>
        <FormLabel>Email Address</FormLabel>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled
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

      <FormControl>
        <FormLabel>Address</FormLabel>
        <Input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </FormControl>
      <FormControl>
        <FormLabel>Phone Number</FormLabel>
        <Input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </FormControl>
      <Flex justifyContent="flex-end">
        <Button onClick={(e) => handleSubmit(e)} mt={5}>
          Update
        </Button>
      </Flex>
    </Box>
  );
};
export default Profile;
