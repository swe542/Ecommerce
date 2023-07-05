import { Grid, GridItem, Box, Card, CardBody } from "@chakra-ui/react";

const GridLayout = ({ Menu, Content }) => {
  return (
    <Grid
      templateColumns={{ base: "10% 90%", md: "25% 75%" }}
      mt="30px"
      ml={{ base: "0", md: "30px" }}
      gap={0}
    >
      <GridItem>{Menu}</GridItem>
      <GridItem>
        <Card w={"90%"} bg={"none"}>
          <CardBody>{Content}</CardBody>
        </Card>
      </GridItem>
    </Grid>
  );
};
export default GridLayout;
