import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import NavigationBar from "./Header";
import { Box } from "@chakra-ui/react";
const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />

        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />

        <title>{title}</title>
      </Helmet>
      <Box overflowX="hidden">
        <NavigationBar  />
        <Box minHeight={"70vh"} width={"100vw"} pt={{base:"70px", md:"none"}} zIndex='0'>
          {children}
        </Box>
        <Footer />
      </Box>
    </>
  );
};

Layout.defaultProps = {
  title: "Miniature Mansion - Shop Now",
  description: "ecommerce project",
  keywords: "miniature, mansion, node, mongodb, react, kits,luxury",
  author: "Swechha",
};

export default Layout;
