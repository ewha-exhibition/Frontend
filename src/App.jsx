import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Scrap from "./pages/Scrap.jsx";
import CreateReview from "./pages/review/CreateReview.jsx";
import GuestBook from "./pages/guestBook/GuestBook.jsx";
import Detail from "./pages/Detail.jsx";

import MyPage from "./pages/myPage/MyPage.jsx";
import MyReviews from "./pages/myPage/MyReviews.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/scrap" element={<Scrap />} />
      <Route path="/createReview" element={<CreateReview />} />
      <Route path="/guestBook" element={<GuestBook />} />
      <Route path="/detail" element={<Detail />} />

      <Route path="/mypage" element={<MyPage />} />
      <Route path="/mypage/myReviews" element={<MyReviews />} />
    </Routes>
  );
}
