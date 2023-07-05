import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import { useAuth } from "../context/auth";
import { useCart } from "../context/cart";
import { Link, useNavigate } from "react-router-dom";
import {
  Flex,
  Text,
  Box,
  Button,
  Card,
  Grid,
  GridItem,
  Stack,
  Image,
  Divider,
} from "@chakra-ui/react";
import { toast } from "react-hot-toast";

export const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  // const totalPrice = () => {
  //   try {
  //     let total = 0;
  //     cart?.map((item) => {
  //       total = total + item.price;
  //     });
  //     return total.toLocaleString("en-US", {
  //       style: "currency",
  //       currency: "USD",
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const getProductQuantity = (productId) => {
    let quantity = 0;

    cart.forEach((item) => {
      if (item._id === productId) {
        quantity++;
      }
    });

    return quantity;
  };

  const totalPrice = () => {
    try {
      let total = 0;
      const productQuantities = {};

      cart.forEach((item) => {
        // Count the quantity of each product
        if (productQuantities[item._id]) {
          productQuantities[item._id] += 1;
        } else {
          productQuantities[item._id] = 1;
        }
      });

      // Calculate the total price based on quantity and price of each item
      Object.keys(productQuantities).forEach((productId) => {
        const quantity = productQuantities[productId];
        const item = cart.find((item) => item._id === productId);
        total += item.price * quantity;
      });

      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      toast.error("An Error occured");
    }
  };

  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);

      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };
  const totalPrices = totalPrice();
  return (
    <Layout>
      <Box mx={10} my={5}>
        <Text
          textAlign={"center"}
          fontSize={"xl"}
          fontWeight={"semibold"}
        >{`Welcome ${auth?.token && auth?.user?.name}`}</Text>
        <Text textAlign={"center"} mb={4}>
          {" "}
          {cart?.length
            ? `You Have ${cart.length} items in your cart ${
                auth?.token ? "" : "please login to checkout"
              }`
            : " Your Cart Is Empty"}
        </Text>

        <Grid templateColumns={{ base: "100%", md: "60% 40%" }} gap={4}>
          <GridItem>
            {/* {cart?.map((p) => (
              <Card flexDirection={"row"} m={1} p={3} w={"full"}>
                <Image
                  boxSize={"150px"}
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <Stack ml={5} gap={2}>
                  <p>{p.name}</p>
                  <p>{p.description}</p>
                  <p>Price : ${p.price}</p>

                  <Button
                    bg={"pink"}
                    color={"black"}
                    width={{ base: "full", md: "200px" }}
                    onClick={() => removeCartItem(p._id)}
                  >
                    Remove
                  </Button>
                </Stack>
              </Card>
            ))}
          </GridItem> */}
            {[...new Set(cart?.map((p) => p._id))].map((productId) => {
              const product = cart.find((item) => item._id === productId);
              const quantity = getProductQuantity(productId);

              return (
                <Card
                  flexDirection={"row"}
                  m={1}
                  p={3}
                  w={"full"}
                  key={productId}
                >
                  <Image
                    boxSize={"150px"}
                    src={`/api/v1/product/product-photo/${product._id}`}
                    className="card-img-top"
                    alt={product.name}
                  />
                  <Stack ml={5} gap={2}>
                    <p>{product.name}</p>
                    <p>{product.description}</p>
                    <p>Price: ${product.price}</p>
                    <p>Quantity: {quantity}</p>

                    <Button
                      bg={"pink"}
                      color={"black"}
                      width={{ base: "full", md: "200px" }}
                      onClick={() => removeCartItem(product._id)}
                    >
                      Remove
                    </Button>
                  </Stack>
                </Card>
              );
            })}
          </GridItem>
          <GridItem textAlign={"center"} mt={6}>
            <Text fontSize={"3xl"}> Cart Summary</Text>
            <Text fontSize={"sm"}>Total | Checkout | Payment</Text>
            <Divider my={2} />
            <Text fontSize={"xl"}>Total: {totalPrices} </Text>
            {auth?.user?.address ? (
              <>
                <Stack mt={4} gap={4}>
                  <Box>
                    <Text fontWeight={"bold"}>Current Address</Text>
                    <Text>{auth?.user?.address}</Text>
                  </Box>
                  <Button onClick={() => navigate("/dashboard/user/profile")}>
                    Update Address
                  </Button>

                  <Link to={"https://esewa.com.np/"}>
                    {" "}
                    <Button w={"100%"}>Make Payment</Button>
                  </Link>
                </Stack>
              </>
            ) : (
              <Box>
                {auth?.token ? (
                  <Button onClick={() => navigate("/dashboard/user/profile")}>
                    Update Address
                  </Button>
                ) : (
                  <Stack mt={4} gap={4}>
                    <Button>Please login to checkout</Button>

                    {/* <Button disabled={!auth.user}>Make Payment</Button> */}
                  </Stack>
                )}
              </Box>
            )}
          </GridItem>
        </Grid>
      </Box>
    </Layout>
  );
};
