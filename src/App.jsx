import { Routes, Route } from "react-router-dom";
import { MenuProvider } from "./components/menu/MenuProvider.jsx";
import AppLayout from "./components/layout/AppLayout.jsx";

import Home from "./pages/Home.jsx";
import Scrap from "./pages/Scrap.jsx";
import CreateReview from "./pages/review/CreateReview.jsx";
import GuestBook from "./pages/guestBook/GuestBook.jsx";
import Detail from "./pages/Detail.jsx";
import EnrollEvent from "./pages/enrollEvent/EnrollEvent.jsx";

import MyPage from "./pages/myPage/MyPage.jsx";
import MyReviews from "./pages/myPage/MyReviews.jsx";
import Watched from "./pages/myPage/Watched.jsx";
import MyExpectations from "./pages/myPage/MyExpectations.jsx";
import EnterCode from "./pages/myPage/EnterCode.jsx";
import MyShow from "./pages/myPage/MyShow.jsx";
import MyQuestions from "./pages/myPage/MyQuestions.jsx";

import Search from "./pages/Search.jsx";

export default function App() {
  return (
    <MenuProvider>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/scrap" element={<Scrap />} />
          <Route
            path="/createReview/:exhibitionId"
            element={<CreateReview />}
          />

          <Route path="/guestBook" element={<GuestBook />} />

          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/enrollEvent" element={<EnrollEvent />} />

          <Route path="/myShow" element={<MyShow />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/mypage/myReviews" element={<MyReviews />} />
          <Route path="/mypage/expectations" element={<MyExpectations />} />
          <Route path="/mypage/questions" element={<MyQuestions />} />
          <Route path="/mypage/watched" element={<Watched />} />
          <Route path="/mypage/enterCode" element={<EnterCode />} />

          <Route path="/search/" element={<Search />} />
        </Routes>
      </AppLayout>
    </MenuProvider>
  );
}
