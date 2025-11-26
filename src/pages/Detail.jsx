import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import TopBar from "../components/Topbar";
import BookingBar from "../components/detail/BookingBar";
import ConfirmModal from "../components/detail/ConfirmModal";
import { Cheer, Review, Question } from "../components/detail/Comment";

//Icons
import locationIcon from "../assets/icons/Location.svg";
import ticketIcon from "../assets/icons/Ticket.svg";
import userIcon from "../assets/icons/User.svg";
import calenderIcon from "../assets/icons/Calender.svg";
import clockIcon from "../assets/icons/Clock.svg";
import sendIcon from "../assets/icons/Send.svg";

//API
import useExhibitionDetail from "../utils/hooks/useExhibitionDetail";

export default function Detail() {
  const { id } = useParams(); //페이지 파라미터
  const { detail, loading, error } = useExhibitionDetail(id);

  const [currentCategory, setCurrentCategory] = useState("detail"); //카테고리
  const [currentUser, setCurrentUser] = useState({
    id: 1,
    nickname: "호스트1",
  }); //현재 사용자

  const [modalState, setModalState] = useState({
    isOpen: false,
    target: null,
  });

  //모달 창
  const openModal = (target) => setModalState({ isOpen: true, target });
  const closeModal = () => setModalState({ ...modalState, isOpen: false });
  const handleConfirm = () => {
    console.log(`${modalState.target} 삭제 완료`);
    closeModal();
  };

  console.log("📌 useParams() ID =", id);
  console.log("📌 useExhibitionDetail() RAW detail =", detail);
  console.log("📌 loading =", loading, "error =", error);

  //조건부 렌더링
  if (loading) return <div>Loading...</div>;
  if (error || !detail?.exhibitionId) {
    return <div>데이터를 불러올 수 없습니다.</div>;
  }

  //진행 여부 계산
  const isOnGoing = (() => {
    if (!detail.period) return false;

    const [start, end] = detail.period.split(" - ");
    const today = new Date();

    const startDate = new Date(start.replace(/\./g, "-"));
    const endDate = new Date(end.replace(/\./g, "-"));

    return today >= startDate && today <= endDate;
  })();

  //무료 여부 계산
  const isFree = detail.price === "무료" || /무료/.test(detail.price);

  const categories = [
    { key: "detail", label: "상세", count: 0 },
    { key: "question", label: "질문", count: detail.questionCount },
    { key: "cheer", label: "응원", count: detail.cheerCount },
    { key: "review", label: "후기", count: detail.reviewCount },
  ];

  return (
    <Container>
      <TopBar title={null} icon={"Link"} />

      {/* 공연 정보 */}
      <Header>
        <img
          className="img"
          src={detail.posterUrl}
          alt={detail.exhibitionName}
        />
        <h1 className="h1">{detail.exhibitionName}</h1>

        <Summary>
          <div className="div">
            <img className="img" src={locationIcon} alt="장소" />
            <p className="p">{detail.place}</p>
          </div>

          <div className="div">
            <img className="img" src={ticketIcon} alt="가격" />
            <p className="p">{detail.price}</p>
          </div>

          <div className="div">
            <img className="img" src={userIcon} alt="주최" />
            <p className="p">{detail.clubName}</p>
          </div>

          <div className="div">
            <img className="img" src={calenderIcon} alt="날짜" />
            <p className="p">{detail.period}</p>
          </div>

          <div className="div">
            <img className="img" src={clockIcon} alt="시간" />
            <p className="p">{detail.duration}</p>
          </div>
        </Summary>
      </Header>

      {/* 카테고리 탭 */}
      <Categories>
        {categories.map(({ key, label, count }) => (
          <Category
            key={key}
            isSelected={currentCategory === key}
            onClick={() => setCurrentCategory(key)}
          >
            <p>{label}</p>
            {count > 0 && <span>&nbsp;({count})</span>}
          </Category>
        ))}
      </Categories>

      <Content>
        {/* 상세 정보 */}
        {currentCategory === "detail" && (
          <DetailSection>
            <p className="p">{detail.content}</p>

            {detail.images?.map((img, idx) => (
              <img className="img" key={idx} src={img} />
            ))}
          </DetailSection>
        )}

        {/* 질문 */}
        {currentCategory === "question" && (
          <CommentSection>
            <InputBox>
              <div className="left">
                <p className="nickname">익명</p>
                <Input placeholder="주최자 분들에게 궁금한 점을 질문하세요!" />
              </div>
              <img className="send" src={sendIcon} alt="send" />
            </InputBox>
          </CommentSection>
        )}

        {/* 응원 */}
        {currentCategory === "cheer" && (
          <CommentSection>
            <InputBox>
              <div className="left">
                <p className="nickname">익명</p>
                <Input placeholder="응원의 한마디를 남겨주세요!" />
              </div>
              <img className="send" src={sendIcon} alt="send" />
            </InputBox>
          </CommentSection>
        )}

        {/* 후기 */}
        {currentCategory === "review" && (
          <CommentSection>
            <div className="review">
              <DropShape>관람 후 느낀 점을 나눠주세요!</DropShape>
              <WriteReviewButton>후기 작성하기</WriteReviewButton>
            </div>
          </CommentSection>
        )}
      </Content>

      {/* 🔥 수정 완료: BookingBar에 계산된 값 전달 */}
      <BookingBar isOnGoing={isOnGoing} isFree={isFree} />

      <ConfirmModal
        isOpen={modalState.isOpen}
        target={modalState.target}
        onClose={closeModal}
        onConfirm={handleConfirm}
      />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding-top: 46px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 0px 20px 0px 20px;
  gap: 20px;
  .img {
    width: 200px;
    height: auto;
    border-radius: 3px;
  }
  .h1 {
    ${({ theme }) => theme.textStyles.headline1Bold};
    text-align: left;
  }
`;
const Summary = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 15px;
  gap: 8px;
  border-radius: 8px;
  border: 0.5px solid ${({ theme }) => theme.colors.gray5};
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.06);
  .div {
    display: flex;
    flex-direction: row;
    gap: 10px;
  }
  .img {
    width: 18px;
    height: 18px;
  }
  .p {
    ${({ theme }) => theme.textStyles.label2Medium};
    color: ${({ theme }) => theme.colors.gray10};
  }
`;

const Categories = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 24px;
  padding: 0 20px;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray3};
`;

const Category = styled.div`
  display: inline-flex;
  padding: 7.5px 8px;
  ${({ theme }) => theme.textStyles.titleSemiBold};

  color: ${({ isSelected, theme }) =>
    isSelected ? theme.colors.blackMain : theme.colors.gray6};
  border-bottom: ${({ isSelected, theme }) =>
    isSelected ? `solid 1.5px ${theme.colors.gray10}` : "none"};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.colors.gray1};
`;

//상세정보
const DetailSection = styled.div`
  padding: 19px 19px 120px 19px;
  gap: 8px;
  .div {
  }
  .p {
    ${({ theme }) => theme.textStyles.body1Regular};
  }
  .img {
    width: 335px;
    height: auto;
  }
`;

//질문, 응원, 후기
const CommentSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 22px 19px 120px 19px;

  .review {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
`;
const InputBox = styled.div`
  width: 336px;
  height: 44px;
  margin-bottom: 7px;
  padding: 10px 14px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray4};
  border-radius: 6px;

  .left {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .nickname {
    color: ${({ theme }) => theme.colors.Primary50};
    ${({ theme }) => theme.textStyles.label2Medium};
    text-align: center;
  }
  .send {
    width: 24px;
    height: 24px;
  }
`;

const Input = styled.input`
  width: 240px;
  border: none;
  outline: none;
  background: transparent;
  ${({ theme }) => theme.textStyles.body1Regular};
  color: ${({ theme }) => theme.colors.blackMain};
  text-align: left;

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray6};
    ${({ theme }) => theme.textStyles.body1Regular};
  }
`;

const DropShape = styled.div`
  width: 165px;
  height: 23px;
  padding: 4px 12px 3px 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 120px 250px 0px 120px;
  background: ${({ theme }) => theme.colors.Primary60};

  ${({ theme }) => theme.textStyles.label2SemiBold};
  color: ${({ theme }) => theme.colors.white};
`;
const WriteReviewButton = styled.button`
  width: 336px;
  height: 44px;

  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.Primary60};

  ${({ theme }) => theme.textStyles.titleSemibold};
  color: ${({ theme }) => theme.colors.Primary60};
  text-align: center;
`;
