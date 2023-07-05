import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import Hero from "../components/home/Hero";
import FeaturedProducts from "./../components/home/FeaturedProducts";
import {
  Checkbox,
  CheckboxGroup,
  Box,
  Card,
  Grid,
  GridItem,
  CardBody,
  SimpleGrid,
  Text,
  Heading,
  Stack,
  Image,
  CardFooter,
  Button,
  ButtonGroup,
  Divider,
  Flex,
} from "@chakra-ui/react";
import axios from "axios";
import { Prices } from "../components/common/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import { toast } from "react-hot-toast";

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setcart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);
  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //getTOtal COunt
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length) getAllProducts();
  }, [checked.length]);

  useEffect(() => {
    if (checked.length) filterProduct();
  }, [checked]);

  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"All Products - Best Offer"}>
      <Hero />
      <Heading as="h2" size="lg" mb={4} px={4} textAlign={"center"}>
        Unleash Your Inner Architect with DIY Kits and Build-Your-Own
        Masterpieces
      </Heading>

      <Grid
        templateColumns={{ base: "1fr", md: "25% 75%" }}
        mt="30px"
        mr={{ base: "0", md: "70px" }}
        ml={{ base: "20px", md: "50px" }}
      >
        <GridItem textAlign={"center"}>
          <Text fontSize={"xl"} mt={6}>
            {" "}
            Filter By Category
          </Text>
          <Flex flexDirection={"column"} mt={2} ml="20%">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </Flex>
          <Flex ml={"20%"} mt={3}>
            <Button onClick={() => window.location.reload()}>
              Reset Filter
            </Button>
          </Flex>
        </GridItem>
        <GridItem>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} mt={4}>
            {products?.map((p) => (
              <Card
                maxW={"xs"}
                boxShadow="2px 0 10px rgba(0, 0, 0, 0.3)"
                mb={3}
                height="100%"
                key={p._id} // Added key prop for optimization
              >
                <CardBody mb="-20px">
                  <Image
                    margin={"auto"}
                    height={{ base: "fit-content", md: "200px" }}
                    src={`/api/v1/product/product-photo/${p._id}`}
                    alt="Green double couch with wooden legs"
                    borderRadius="lg"
                  />
                  <Stack mt="3" spacing="1">
                    <Heading size="md">{p.name}</Heading>
                    <Text>{p.description.substring(0, 27)}...</Text>
                    <Flex gap={2}>
                      <Text
                        color="pink.400"
                        fontSize="xl"
                        textDecoration={"line-through"}
                      >
                        ${`${p.price + 200}`}
                      </Text>
                      <Text color="blue.600" fontSize="xl">
                        ${p.price}
                      </Text>
                    </Flex>
                  </Stack>
                </CardBody>
                <Divider color={"gray.600"} />
                <CardFooter>
                  <ButtonGroup spacing="2">
                    <Button
                      variant="solid"
                      colorScheme="blue"
                      onClick={() => {
                        setcart([...cart, p]);

                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Item added to cart");
                      }}
                    >
                      Add to cart
                    </Button>
                    <Button
                      variant="ghost"
                      colorScheme="blue"
                      onClick={() => navigate(`/products/${p.slug}`)}
                    >
                      More Details
                    </Button>
                  </ButtonGroup>
                </CardFooter>
              </Card>
            ))}
          </SimpleGrid>
          <Flex mt={6} justifyContent="center">
            {products && products.length < total && (
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Loadmore"}
              </Button>
            )}
          </Flex>
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default HomePage;
