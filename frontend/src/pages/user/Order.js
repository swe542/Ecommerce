import React, { useEffect, useState } from "react";
import UserMenu from "../../components/layout/UserMenu";
import { Grid, Card, GridItem, Text, CardBody, Box } from "@chakra-ui/react";
import Layout from "../../components/layout/Layout";
import GridLayout from "../../components/common/GridLayout";
import { useAuth } from "../../context/auth";
import axios from "axios";

const Order = () => {
  return (
    <Layout title={"Dashboard - Order"}>
      <GridLayout Menu={<UserMenu />} Content={<OrderTable />} />
    </Layout>
  );
};
const OrderTable = () => {
  return (
    <Box mt={1}>
      <Text fontSize={"xl"}>My orders</Text>
      <Text mt={2}>You haven't placed any orders.</Text>
    </Box>
  );
};
export default Order;
