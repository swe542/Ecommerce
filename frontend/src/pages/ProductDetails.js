import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardBody,
  Divider,
  CardFooter,
  ButtonGroup,
  Box,
  chakra,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  VisuallyHidden,
  List,
  ListItem,
} from "@chakra-ui/react";
import { MdLocalShipping } from "react-icons/md";
import { useCart } from "../context/cart";
import { toast } from "react-hot-toast";

export const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cart, setcart] = useCart();

  //initalp details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <Container maxW={"7xl"}>
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 18, md: "50px" }}
        >
          <Flex>
            <Image
              h="fit-content"
              alt={product.name}
              src={`/api/v1/product/product-photo/${product._id}`}
            />
          </Flex>
          <Stack spacing={{ base: 6, md: 10 }}>
            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={"column"}
              divider={
                <StackDivider
                  borderColor={useColorModeValue("gray.200", "gray.600")}
                />
              }
            >
              <Box>
                <Text
                  fontSize={{ base: "16px", lg: "18px" }}
                  color={useColorModeValue("yellow.500", "yellow.300")}
                  fontWeight={"500"}
                  textTransform={"uppercase"}
                  mb={"4"}
                >
                  Product Details
                </Text>

                <List spacing={2}>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Name:
                    </Text>{" "}
                    {product.name}
                  </ListItem>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Description:
                    </Text>{" "}
                    {product.description}
                  </ListItem>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Price:
                    </Text>{" "}
                    ${product.price}
                  </ListItem>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Category:
                    </Text>{" "}
                    {product?.category?.name}
                  </ListItem>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Material:
                    </Text>{" "}
                    High-quality wood and plastic
                  </ListItem>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Recommended Age Range:
                    </Text>{" "}
                    Suitable for ages 8 and above
                  </ListItem>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Dimensions:
                    </Text>{" "}
                    12 inches (H) x 10 inches (W) x 8 inches (D)
                  </ListItem>
                </List>
              </Box>
            </Stack>

            <Button
              rounded={"none"}
              w={{ base: "full", md: "96%" }}
              mt={8}
              size={"lg"}
              py={"7"}
              bg={useColorModeValue("gray.900", "gray.50")}
              color={useColorModeValue("white", "gray.900")}
              textTransform={"uppercase"}
              _hover={{
                transform: "translateY(2px)",
                boxShadow: "lg",
              }}
              onClick={() => {
                setcart([...cart, product]);
                localStorage.setItem(
                  "cart",
                  JSON.stringify([...cart, product])
                );
                toast.success("Item added to cart");
              }}
            >
              Add to cart
            </Button>

            <Stack
              direction="row"
              alignItems="center"
              justifyContent={"center"}
            >
              <MdLocalShipping />
              <Text>2-3 business days delivery</Text>
            </Stack>
          </Stack>
        </SimpleGrid>
        <Text fontSize={"xl"} ml={2}>
          Similar Products
        </Text>
        {relatedProducts.length < 1 && (
          <Text mt={4} textAlign={"center"}>
            No Similar Products found
          </Text>
        )}
        <Flex>
          {relatedProducts?.map((p) => (
            <Card
              ml={2}
              mt={4}
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
                      ${`${p.price + 1000}`}
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
        </Flex>
      </Container>
    </Layout>
  );
};
