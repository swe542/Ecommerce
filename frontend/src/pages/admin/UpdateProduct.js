import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";

import {
  Box,
  Card,
  Grid,
  GridItem,
  CardBody,
  Text,
  Heading,
  Select,
  Input,
  FormControl,
  FormLabel,
  Image,
  Textarea,
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Flex,
} from "@chakra-ui/react";

import AdminMenu from "../../components/layout/AdminMenu";
import { useAuth } from "../../context/auth";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const [auth] = useAuth();
  const params = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");
  const token = auth?.token;

  const config = {
    headers: {
      Authorization: token,
    },
  };
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setCategory(data.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, []);
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);
      console.log("Category", category);
      const { data } = axios.put(
        `/api/v1/product/update-product/${id}`,
        productData,
        config
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Updated Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      // Make API request to delete the product
      const { data } = await axios.delete(
        `/api/v1/product/delete-product/${id}`
      );
      toast.success("Product Deleted Successfully");
      navigate("/dashboard/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
      onClose();
    }
  };

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wwent wrong in getting catgeory");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);
  return (
    <Layout title={"Dashboard - Create Product"}>
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
                Update Products
              </Text>
              <Select
                placeholder="Select a Category"
                value={category} // Set the value to the category state
                onChange={(e) => {
                  setCategory(e.target.value); // Update the category state with the selected value
                }}
              >
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </Select>
              <FormControl mt={3} mb={3}>
                <FormLabel
                  htmlFor="photo"
                  border={"1px solid white"}
                  p={"5px"}
                  textAlign={"center"}
                  bg={"gray.600"}
                  borderRadius={"4px"}
                >
                  {photo ? photo.name : "Upload Photo"}
                  <Input
                    type="file"
                    id="photo"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </FormLabel>
                {photo ? (
                  <Image
                    margin={"auto"}
                    src={URL.createObjectURL(photo)}
                    alt="product_photo"
                    boxSize="200px"
                  />
                ) : (
                  <Image
                    margin={"auto"}
                    src={`/api/v1/product/product-photo/${id}`}
                    alt="product_photo"
                    boxSize="200px"
                  />
                )}
                <Box mb={3} mt={3}>
                  <Input
                    type="text"
                    placeholder="Enter the name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                </Box>
                <Box mb={3}>
                  <Textarea
                    type="text"
                    placeholder="Enter the description"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                  />
                </Box>
                <Box mb={3}>
                  <Input
                    type="number"
                    placeholder="Enter the price"
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                  />
                </Box>
                <Box mb={3}>
                  <Input
                    type="number"
                    placeholder="Enter the qunatity"
                    onChange={(e) => setQuantity(e.target.value)}
                    value={quantity}
                  />
                </Box>
                <Select
                  placeholder="Select Shipping"
                  onChange={(value) => setShipping(value)}
                  value={shipping ? "yes" : "No"}
                >
                  <option value="1">yes</option>
                  <option value="0">No</option>
                </Select>

                <Flex justifyContent="flex-end" gap={2}>
                  <Button mt={3} onClick={handleUpdate}>
                    Update Product
                  </Button>
                  <Button mt={3} onClick={onOpen}>
                    Delete Product
                  </Button>
                  <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>Confirm Delete</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                        Are you sure you want to delete this product?
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          colorScheme="red"
                          mr={3}
                          onClick={handleDelete}
                          isLoading={loading}
                        >
                          Yes
                        </Button>
                        <Button
                          variant="outline"
                          onClick={onClose}
                          disabled={loading}
                        >
                          No
                        </Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                </Flex>
              </FormControl>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default UpdateProduct;
