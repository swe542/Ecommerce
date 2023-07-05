import React from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import {
  Card,
  Grid,
  GridItem,
  CardBody,
  Text,
  Heading,
} from "@chakra-ui/react";
import { useAuth } from "../../context/auth";
import AdminGrid from "../../components/common/AdminGrid";
const AdminDashboard = () => {
  return (
    <Layout title={"Dashboard"}>
      <AdminGrid Menu={<AdminMenu />} Content={<AdminProfile />} />
    </Layout>
  );
};
const AdminProfile = () => {
  const [auth] = useAuth();
  return (
    <>
      <Text fontSize={"xl"}>Admin Name : {auth?.user?.name}</Text>
      <Text fontSize={"xl"}>Admin Email : {auth?.user?.email}</Text>
      <Text fontSize={"xl"}>Admin Contact : {auth?.user?.phone}</Text>
    </>
  );
};
export default AdminDashboard;
