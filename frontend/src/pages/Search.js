import React from "react";
import Layout from "../components/layout/Layout";
import { useSearch } from "../context/search";
import { Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Flex, Heading, SimpleGrid,Box, Stack, Image, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [values, setValues] = useSearch();
  const navigate=useNavigate()
  return (
    <Layout title={"Search results"}>
 
       <Box textAlign={'center'} mt={4} mx={"9"}>
          <Text fontSize={'2xl'} fontWeight={'bold'}>Search Results</Text>
          <Text fontSize={'lg'} mt={1}>
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length}`}
          </Text>
          <SimpleGrid columns={{ base: 1, md: 4 }} spacing={2} mt={6}>
            {values?.results.map((p) => (
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
  );
};

export default Search;
