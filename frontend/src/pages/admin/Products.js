import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Image,
  Stack,
  Divider,
  Box,
  Button,
  Card,
  CardHeader,
  ButtonGroup,
  CardBody,
  CardFooter,
  Grid,
  GridItem,
  Text,
  Heading,
  Flex,
} from "@chakra-ui/react";
import AdminMenu from "../../components/layout/AdminMenu";
import { Link } from "react-router-dom";
const Products = () => {
  const [products, setProducts] = useState([]);

  //getall products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Someething Went Wrong");
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout title={"Dashboard - Products"}>
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
          <Card w={"90%"} bg={"none"}>
            <CardBody>
              <Text align={"center"} fontStyle={"bold"} fontSize={"2xl"} mb={6}>
                All Products
              </Text>
              <Flex flexWrap="wrap">
                {products?.map((p) => (
                  <Card
                    boxShadow="2px 0 10px rgba(0, 0, 0, 0.3)"
                    width={{ base: "100%", md: "45%" }}
                    margin="auto"
                    mb={3}
                  >
                    <CardBody>
                      <Link
                        to={`/dashboard/admin/products/${p.slug}`}
                        key={p._id}
                      >
                        <Image
                          margin={"auto"}
                          height={{ base: "fit-content", md: "300px" }}
                          src={`/api/v1/product/product-photo/${p._id}`}
                          alt="Green double couch with wooden legs"
                          borderRadius="lg"
                        />
                        <Stack mt="6" spacing="3">
                          <Heading size="md">{p.name}</Heading>
                          <Text>{p.description}</Text>
                          <Text color="blue.600" fontSize="2xl">
                            ${p.price}
                          </Text>
                        </Stack>
                      </Link>
                    </CardBody>
                  </Card>
                ))}
              </Flex>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default Products;
