import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";

import {
  useDisclosure,
  Box,
  Card,
  Grid,
  GridItem,
  CardBody,
  Text,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  ButtonGroup,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import AdminMenu from "../../components/layout/AdminMenu";
import { toast } from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/form/CategoryForm";
import { useAuth } from "../../context/auth";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [auth] = useAuth();
  const [name, setname] = useState("");
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [visible, setVisible] = useState(false);
  const token = auth?.token;

  const config = {
    headers: {
      Authorization: token,
    },
  };

  const payload = {
    name,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "/api/v1/category/create-category",
        payload,
        config
      );
      if (data?.success) {
        toast.success(`${name} is created`);
        getAllCategory();
        setname("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("somthing went wrong in input form");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/v1/category/update-category/${selected._id}`,
        { name: updatedName },
        config
      );
      if (data.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Somtihing went wrong");
    }
  };

  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/category/delete-category/${pId}`,
        config
      );
      if (data.success) {
        toast.success(`category is deleted`);

        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Somtihing went wrong");
    }
  };

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data.success) {
        setCategories(data.category);
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
    <Layout title={"Dashboard - Create Category"}>
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
              <Box>
                <Text fontStyle={"bold"} fontSize={"2xl"}>
                  Manage Category
                </Text>
                <Box height={"20px"}></Box>
                <CategoryForm
                  handleSubmit={handleSubmit}
                  value={name}
                  setValue={setname}
                />
              </Box>
              <TableContainer mt={6} border={"1px solid white"}>
                <Table size={"sm"} variant="simple" colorScheme="whiteAlpha">
                  <Thead height={"45px"}>
                    <Tr>
                      <Th fontSize={"md"}>Name</Th>
                      <Th fontSize={"md"}>Actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {categories.map((c) => (
                      <Tr key={c._id}>
                        <Td>{c.name}</Td>
                        <Td>
                          <ButtonGroup size={"sm"} gap={2}>
                            <Button
                              onClick={() => {
                                setVisible(true);
                                setUpdatedName(c.name);
                                setSelected(c);
                              }}
                            >
                              Edit
                            </Button>
                            <Button
                              onClick={() => {
                                handleDelete(c._id);
                              }}
                            >
                              Delete
                            </Button>
                          </ButtonGroup>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </CardBody>
          </Card>
          <Modal onClose={() => setVisible(false)} isOpen={visible}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Update Category</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <CategoryForm
                  value={updatedName}
                  setValue={setUpdatedName}
                  handleSubmit={handleUpdate}
                />
              </ModalBody>
              <Box height={"30px"}></Box>
            </ModalContent>
          </Modal>
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default CreateCategory;
