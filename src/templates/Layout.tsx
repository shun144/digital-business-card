import { Box } from "@chakra-ui/react";
import React from "react";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <Box height="100vh" bg="gray.100" overflowY={"scroll"}>
      <Outlet />
    </Box>
  );
};

export default Layout;
