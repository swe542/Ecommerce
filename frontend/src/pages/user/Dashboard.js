import React from "react";
import Layout from "../../components/layout/Layout";
import UserMenu from "../../components/layout/UserMenu";
import {
  Card,
  Grid,
  GridItem,
  CardBody,
  Text,
  Heading,
} from "@chakra-ui/react";
import { useAuth } from "../../context/auth";
const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"Dashboard"}>
      <Grid
        templateColumns={{ base: "10% 90%", md: "25% 75%" }}
        mt="30px"
        ml={{ base: "0", md: "30px" }}
        gap={0}
      >
        <GridItem>
          <UserMenu />
        </GridItem>
        <GridItem>
          <Card w={"90%"}>
            <CardBody>
              <Text fontSize={"xl"}>User Name : {auth?.user?.name}</Text>
              <Text fontSize={"xl"}>User Email : {auth?.user?.email}</Text>
              <Text fontSize={"xl"}>User Contact : {auth?.user?.phone}</Text>
              <Text fontSize={"xl"}>User Address : {auth?.user?.address}</Text>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default Dashboard;
