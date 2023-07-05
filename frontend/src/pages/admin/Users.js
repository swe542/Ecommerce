import React from "react";
import Layout from "../../components/layout/Layout";
import {
  Box,
  Card,
  Grid,
  GridItem,
  CardBody,
  Text,
  Heading,
} from "@chakra-ui/react";
import AdminMenu from "./../../components/layout/AdminMenu";
const Users = () => {
  return (
    <Layout title={"Dashboard - All Users"}>
      <Grid
        templateColumns={{ base: "10% 90%", md: "25% 75%" }}
        mt="30px"
        ml={{ base: "0", md: "30px" }}
        gap={0}
      >
        <GridItem>
          <AdminMenu />
        </GridItem>
        <GridItem>
          <Card w={"90%"}>
            <CardBody>
              <Text fontStyle={"bold"} fontSize={"2xl"} mb={6}>
                All Users
              </Text>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default Users;
