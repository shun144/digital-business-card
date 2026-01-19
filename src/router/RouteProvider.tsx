import App from "@/App";
import Cards from "@/pages/cards/Cards";
import { BrowserRouter, Route, Routes } from "react-router";

const RouteProvider = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path="/cards/:id" element={<Cards />} />
        {/* <Route element={<App />}>
          <Route path="sample" element={<Sample />} />
        </Route> */}
      </Routes>
    </BrowserRouter>
  );
};

export default RouteProvider;
