import React from "react";
import { Spinner, Flex, Text } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const CenterSpinner = ({ path = "" }) => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => --prev);
    }, 1000);
    count === 0 &&
      navigate(`/${path}`, {
        state: location.pathname,
      });
    return () => clearInterval(interval);
  }, [count, navigate, location, path]);
  return (
    <Flex
      height="100vh"
      alignItems="center"
      justifyContent="center"
      flexDirection={"column"}
    >
      <Text fontSize="2xl">Redirecting to you in {count} second</Text>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="lg"
      />
    </Flex>
  );
};

export default CenterSpinner;
