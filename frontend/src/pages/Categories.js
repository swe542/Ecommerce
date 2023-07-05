import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import { useNavigate, useParams } from 'react-router-dom';
import { Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Flex, Heading, SimpleGrid,Box, Stack, Image, Text } from "@chakra-ui/react";

import axios from 'axios';
export const Categories = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);
  
    useEffect(() => {
      if (params?.slug) getPrductsByCat();
    }, [params?.slug]);

    const getPrductsByCat = async () => {
      try {
        const { data } = await axios.get(
          `/api/v1/product/product-category/${params.slug}`
        );
        setProducts(data?.products);
        setCategory(data?.category);
      } catch (error) {
        console.log(error);
      }
    };
  return (
    <Layout >
   <Box textAlign={'center'} mt={4} mx={"9"}>
          <Text fontSize={'xl'} fontWeight={'bold'}>Category - {category.name}</Text>
          <Text fontSize={'lg'} mt={1}>
            {products?.length < 1
              ? "No Products Found"
              : `Found ${products?.length}`}
          </Text>
          <SimpleGrid columns={{ base: 1, md: 4 }} spacing={2} mt={6}>
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
                    <Text >
                      {p.description.substring(0,27)}...
                    </Text>
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
                    <Button variant="solid" colorScheme="blue">
                      Add to cart
                    </Button>
                    <Button variant="ghost" colorScheme="blue" onClick={()=>navigate(`/products/${p.slug}`)}>
                      More Details
                    </Button>
                  </ButtonGroup>
                </CardFooter>
              </Card>

            
            ))}
          </SimpleGrid>
      
      </Box>
    </Layout>
  )
}
