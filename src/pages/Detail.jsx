import { useState } from "react";
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

//Mocks
import poster1 from "../assets/mock/poster1.jpg";
import poster2 from "../assets/mock/poster2.jpg";

//TODO: 상단바 고정, 카테고리바 일정 스크롤 시 고정
//TODO: hook: 댓글 수 count, scrap

export default function Detail() {
  const [currentCategory, setCurrentCategory] = useState("detail");
  const [currentUser, setCurrentUser] = useState({
    id: 1,
    nickname: "호스트1",
  });

  //삭제 확인 모달
  const [modalState, setModalState] = useState({
    isOpen: false,
    target: null,
  });
  const openModal = (target) => setModalState({ isOpen: true, target });
  const closeModal = () => setModalState({ ...modalState, isOpen: false });
  const handleConfirm = () => {
    console.log(`${modalState.target} 삭제 완료`);
    closeModal();
  };

  // 더미 데이터
  const categories = [
    { key: "detail", label: "상세정보" },
    { key: "question", label: "질문", count: 3 },
    { key: "cheer", label: "응원", count: 5 },
    { key: "review", label: "후기", count: 0 },
  ];

  //NOTE: onGoing, price -> 하단바 결정
  const mock_data = {
    id: 1,
    title: "이화여대 섬유예술 전공 졸업전시 2023 “Weave Our Way”",
    place: "이화여대 조형예술관 A동 4층",
    price: 0,
    host: "섬유예술전공",
    date: "2025.06.13~06.25",
    time: "9:00-16:00",
    poster: poster1,
    explain:
      "뮤지컬 동아리 뮤랩 3번째 정기공연에 초대합니다! 내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용",
    images: [
      { id: 1, img: poster1 },
      { id: 2, img: poster1 },
      { id: 3, img: poster1 },
    ],
    scraped: false,
    onGoing: false,
  };

  const mockCheers = [
    {
      id: 1,
      nickname: "사용자1",
      date: "2023.06.01",
      text: "졸업 축하드려요!!",
      reply: {
        id: 1,
        nickname: "호스트1",
        date: "2025.06.02",
        text: "감사합니다:)",
      },
    },
    {
      id: 2,
      nickname: "사용자2",
      date: "2023.06.02",
      text: "너무 기대돼요 😊",
      reply: {},
    },
  ];
  const mockQuestions = [
    {
      id: 1,
      nickname: "사용자1",
      date: "2023.06.01",
      text: "전시 관람은 무료인가요?",
      reply: {},
    },
    {
      id: 2,
      nickname: "사용자2",
      date: "2023.06.02",
      text: "예약은 필요한가요?",
      reply: {
        id: 1,
        nickname: "호스트2",
        date: "2025.06.02",
        text: "안녕하세요! 현장에서 즉시 입장 가능합니다 :)",
      },
    },
  ];
  const mockReviews = [
    {
      id: 1,
      nickname: "사용자1",
      date: "2023.06.01",
      text: "정말 감동적인 전시였어요.",
      photos: [{ src: poster1 }, { src: poster2 }],
    },
  ];
  return (
    <Container>
      <TopBar title={null} icon={"Link"} />

      {/* 공연 정보 */}
      <Header>
        <img className="img" src={mock_data.poster} alt={mock_data.title} />
        <h1 className="h1">{mock_data.title}</h1>
        <Summary>
          <div className="div">
            <img className="img" src={locationIcon} alt={"위치"} />
            <p className="p">{mock_data.place}</p>
          </div>
          <div className="div">
            <img className="img" src={ticketIcon} alt={"가격"} />
            <p className="p">
              {mock_data.price === 0 ? "무료" : mock_data.price}
            </p>
          </div>
          <div className="div">
            <img className="img" src={userIcon} alt={"주최"} />
            <p className="p">{mock_data.host}</p>
          </div>
          <div className="div">
            <img className="img" src={calenderIcon} alt={"날짜"} />
            <p className="p">{mock_data.date}</p>
          </div>
          <div className="div">
            <img className="img" src={clockIcon} alt={"시간"} />
            <p className="p">{mock_data.time}</p>
          </div>
        </Summary>
      </Header>

      {/* 하단 카테고리 탭 */}
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
            <p className="p">
              {mock_data.explain} <br /> <br />
            </p>
            {mock_data.images?.map((image) => (
              <img className="img" key={image.id} src={image.img} />
            ))}
          </DetailSection>
        )}

        {/* 질문 */}
        {currentCategory === "question" && (
          <CommentSection>
            <InputBox>
              <div className="left">
                <p className="nickname">익명</p>
                <Input
                  type="text"
                  placeholder="주최자 분들에게 궁금한 점을 질문하세요!"
                />
              </div>
              <img className="send" src={sendIcon} alt={"전송"} />
            </InputBox>
            {mockQuestions.map((question) => (
              <Question
                key={question.id}
                comment={question}
                openModal={openModal}
                currentUser={currentUser}
              />
            ))}
          </CommentSection>
        )}

        {/* 응원 */}
        {currentCategory === "cheer" && (
          <CommentSection>
            <InputBox>
              <div className="left">
                <p className="nickname">익명</p>
                <Input
                  type="text"
                  placeholder="벗들에게 응원의 한마디를 남겨주세요!"
                />
              </div>
              <img className="send" src={sendIcon} alt={"전송"} />
            </InputBox>
            {mockCheers.map((cheer) => (
              <Cheer
                key={cheer.id}
                comment={cheer}
                openModal={openModal}
                currentUser={currentUser}
              />
            ))}
          </CommentSection>
        )}

        {/* 후기 */}
        {currentCategory === "review" && (
          <CommentSection>
            <div className="review">
              <DropShape>관람 후 느낀 점을 니눠주세요!</DropShape>
              <WriteReviewButton>후기 작성하기</WriteReviewButton>
            </div>
            {mockReviews.map((review) => (
              <Review key={review.id} comment={review} openModal={openModal} />
            ))}
          </CommentSection>
        )}
      </Content>
      <BookingBar
        isOnGoing={mock_data.onGoing}
        isFree={mock_data.price === 0}
      />
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
