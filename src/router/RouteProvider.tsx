import App from "@/App";
import Cards from "@/pages/cards/Cards";
import Register from "@/pages/cards/Register";
import Search from "@/pages/cards/Search";
import CardsLayout from "@/templates/CardsLayout";
import Layout from "@/templates/Layout";
import { BrowserRouter, Route, Routes } from "react-router";

const RouteProvider = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<App />} />

          <Route element={<CardsLayout />}>
            <Route path="/cards/id" element={<Search />} />
            <Route path="/cards/register" element={<Register />} />
            <Route path="/cards/:id" element={<Cards />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RouteProvider;
