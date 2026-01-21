import { Stack } from "@chakra-ui/react";
import { Outlet } from "react-router";

const CardsLayout = () => {
  return (
    <Stack align={"center"} justify={"center"} px="24px" py="48px">
      <Outlet />
    </Stack>
  );
};

export default CardsLayout;
