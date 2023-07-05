import React from 'react';
import { Box, Grid, GridItem, Heading, Text, Image } from '@chakra-ui/react';
import dollhouse from '../../assets/images/dollhouse.jpg';
import teahouse from '../../assets/images/Tea_house.jpg';
import coffeehouse from '../../assets/images/coffee.jpg';
const FeaturedProducts = () => {
  return (
    <Box py={8} ml={8} mr={8} mt={5}>
      <Heading as="h2" size="lg" mb={4} px={4} textAlign={'center'}>
      Unleash Your Inner Architect with DIY Kits and Build-Your-Own Masterpieces
      </Heading>
      <Grid templateColumns={['1fr', '1fr 1fr', '1fr 1fr 1fr']} gap={4}>
        <GridItem>
          {/* First Product */}
          <Box p={4} borderWidth={1} borderRadius="md">
            <Image  src={dollhouse}/>
            {/* <Text align={'center'} py={4}>Doll House Kit</Text> */}
          </Box>
        </GridItem>
        <GridItem>
          {/* Second Product */}
          <Box p={4} borderWidth={1} borderRadius="md">
           <Image src={teahouse}/>
            
          </Box>
        </GridItem>
        <GridItem>
          {/* Third Product */}
          <Box p={4} borderWidth={1} borderRadius="md">
          <Image src={coffeehouse} />
           
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default FeaturedProducts;
