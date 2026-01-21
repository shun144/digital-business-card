import App from "@/App";
import Cards from "@/pages/cards/Cards";
import Register from "@/pages/Register";
import Layout from "@/templates/Layout";
import { BrowserRouter, Route, Routes } from "react-router";

const RouteProvider = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<App />} />
          <Route path="/cards/register" element={<Register />} />
          <Route path="/cards/:id" element={<Cards />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RouteProvider;
