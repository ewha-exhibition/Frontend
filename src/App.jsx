import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Scrap from "./pages/Scrap.jsx";
import CreateReview from "./pages/CreateReview.jsx";
import Detail from "./pages/Detail.jsx";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/scrap" element={<Scrap />} />
      <Route path="/createReview" element={<CreateReview />} />
      <Route path="/detail" element={<Detail />} />
    </Routes>
  );
}
