import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import TopBar from "../components/Topbar";
import BookingBar from "../components/detail/BookingBar";
import ConfirmModal from "../components/detail/ConfirmModal";
import { Cheer, Review, Question } from "../components/detail/Comment";

// Icons
import locationIcon from "../assets/icons/Location.svg";
import ticketIcon from "../assets/icons/Ticket.svg";
import userIcon from "../assets/icons/User.svg";
import CalenderIcon from "../assets/icons/Calender.svg?react";
import clockIcon from "../assets/icons/Clock.svg";
import sendIcon from "../assets/icons/Send.svg";
import Nothing from "../assets/icons/Nothing.svg?react";

// API
import useExhibitionDetail from "../utils/hooks/useExhibitionDetail";
import useCommentList from "../utils/hooks/useCommentList";
import usePostComment from "../utils/hooks/usePostComment";
import useDeleteComment from "../utils/hooks/useDeleteCommnet";
import useTestLogin from "../utils/hooks/useTestLogin"; //임시 토큰

export default function Detail() {
  //임시 토큰
  //const { token } = useTestLogin(1);
  //console.log(localStorage.getItem("accessToken"));
  // 현재 사용자
  const [currentUser] = useState({
    id: 1,
    nickname: "호스트1",
  });

  // 페이지 파라미터: 전시 ID
  const { id } = useParams();
  const { detail, loading, error } = useExhibitionDetail(id);

  // 현재 카테고리
  const [currentCategory, setCurrentCategory] = useState("detail");

  // 댓글, 응원 리스트 가져오기
  const {
    comments: commentList,
    pageInfo,
    loading: commentLoading,
    error: commentError,
    refetch,
  } = useCommentList(currentCategory, id);

  // 입력값
  const [inputValue, setInputValue] = useState("");

  // 등록 API
  const { postComment } = usePostComment();
  // 삭제 API
  const { deleteContent } = useDeleteComment();

  // detail 로컬 저장 (카운트 반영)
  const [localDetail, setLocalDetail] = useState(null);
  useEffect(() => {
    if (detail) setLocalDetail(detail);
  }, [detail]);

  // 모달 상태
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: null,
    targetId: null,
  });

  const openModal = (type, targetId) =>
    setModalState({ isOpen: true, type, targetId });

  const closeModal = () =>
    setModalState((prev) => ({ ...prev, isOpen: false }));

  // 삭제 확정
  const handleConfirm = async () => {
    const { type, targetId } = modalState;

    const res = await deleteContent({
      type, // cheer, question, review
      id: targetId,
      token,
    });

    if (res?.status === 204) {
      // 리스트 리패치
      if (typeof refetch === "function") refetch();

      //카운트 감소
      if (type === "question") {
        setLocalDetail((prev) => ({
          ...prev,
          questionCount: (prev.questionCount || 1) - 1,
        }));
      }

      if (type === "cheer") {
        setLocalDetail((prev) => ({
          ...prev,
          cheerCount: (prev.cheerCount || 1) - 1,
        }));
      }
    }

    closeModal();
  };

  // 입력값 변경
  const handleInputChange = (e) => setInputValue(e.target.value);

  // 등록
  const handleSubmit = async () => {
    if (!token) {
      alert("토큰 발급 중입니다. 잠시 후 시도해주세요.");
      return;
    }
    if (!inputValue.trim()) return;

    const res = await postComment({
      type: currentCategory,
      exhibitionId: id,
      content: inputValue,
      token,
    });

    if (res?.status === 200 || res?.status === 201) {
      setInputValue("");

      if (typeof refetch === "function") refetch();

      // 카운트 증가
      if (currentCategory === "question") {
        setLocalDetail((prev) => ({
          ...prev,
          questionCount: (prev.questionCount || 0) + 1,
        }));
      }
      if (currentCategory === "cheer") {
        setLocalDetail((prev) => ({
          ...prev,
          cheerCount: (prev.cheerCount || 0) + 1,
        }));
      }
    }
  };

  // 진행 여부 계산
  const isOnGoing = useMemo(() => {
    if (!detail?.period) return false;
    try {
      const [start, end] = detail.period.split(" - ");
      if (!start || !end) return false;

      const today = new Date();
      const startDate = new Date(start.replace(/\./g, "-"));
      const endDate = new Date(end.replace(/\./g, "-"));
      endDate.setHours(23, 59, 59, 999);

      return today >= startDate && today <= endDate;
    } catch (e) {
      return false;
    }
  }, [detail?.period]);

  // 무료 여부
  const isFree = useMemo(() => {
    return detail?.price === "무료";
  }, [detail?.price]);

  // 로딩처리
  if (loading) return <div>Loading...</div>;
  if (error || !detail?.exhibitionId)
    return <div>데이터를 불러올 수 없습니다.</div>;

  const categories = [
    { key: "detail", label: "상세", count: 0 },
    { key: "question", label: "질문", count: localDetail?.questionCount || 0 },
    { key: "cheer", label: "응원", count: localDetail?.cheerCount || 0 },
    { key: "review", label: "후기", count: localDetail?.reviewCount || 0 },
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
            <img className="svgIcon" src={locationIcon} alt="장소" />
            <p className="p">{detail.place}</p>
          </div>

          <div className="div">
            <img className="svgIcon" src={ticketIcon} alt="가격" />
            <p className="p">{detail.price}</p>
          </div>

          <div className="div">
            <img className="svgIcon" src={userIcon} alt="주최" />
            <p className="p">{detail.clubName}</p>
          </div>

          <div className="div">
            <CalenderIcon width={18} height={18} color="#57B190" />
            <p className="p">{detail.period}</p>
          </div>

          <div className="div">
            <img className="svgIcon" src={clockIcon} alt="시간" />
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
            onClick={() => {
              setCurrentCategory(key);
              setInputValue("");
            }}
          >
            <p>{label}</p>
            {count > 0 && <span>&nbsp;({count})</span>}
          </Category>
        ))}
      </Categories>

      <Content>
        {/* 상세 */}
        {currentCategory === "detail" && (
          <DetailSection>
            <p className="p">{detail.content}</p>
            {detail.images?.map((img, idx) => (
              <img className="img" key={idx} src={img} alt={`상세-${idx}`} />
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
                  placeholder="주최자 분들에게 궁금한 점을 질문하세요!"
                  value={inputValue}
                  onChange={handleInputChange}
                />
              </div>
              <SendBtn src={sendIcon} alt="send" onClick={handleSubmit} />
            </InputBox>

            {commentLoading ? (
              <p>Loading...</p>
            ) : commentList.length === 0 ? (
              <Nothing />
            ) : (
              commentList.map((comment) => (
                <Question
                  key={comment.id}
                  comment={comment}
                  openModal={openModal}
                  currentUser={currentUser}
                />
              ))
            )}
          </CommentSection>
        )}

        {/* 응원 */}
        {currentCategory === "cheer" && (
          <CommentSection>
            <InputBox>
              <div className="left">
                <p className="nickname">익명</p>
                <Input
                  placeholder="응원의 한마디를 남겨주세요!"
                  value={inputValue}
                  onChange={handleInputChange}
                />
              </div>
              <SendBtn src={sendIcon} alt="send" onClick={handleSubmit} />
            </InputBox>

            {commentLoading ? (
              <p>Loading...</p>
            ) : commentList.length === 0 ? (
              <Nothing />
            ) : (
              commentList.map((comment) => (
                <Cheer
                  key={comment.id}
                  comment={comment}
                  openModal={openModal}
                  currentUser={currentUser}
                />
              ))
            )}
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

      <BookingBar isOnGoing={isOnGoing} isFree={isFree} />

      {/* 삭제 확인 모달 */}
      <ConfirmModal
        isOpen={modalState.isOpen}
        type={modalState.type}
        onClose={closeModal}
        onConfirm={handleConfirm}
      />
    </Container>
  );
}

// 스타일 컴포넌트들
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
    object-fit: cover;
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
  background-color: ${({ theme }) => theme.colors.white};

  .div {
    display: flex;
    flex-direction: row;
    gap: 10px;
  }
  .svgIcon {
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
  cursor: pointer;
  ${({ theme }) => theme.textStyles.titleSemiBold};

  color: ${({ isSelected, theme }) =>
    isSelected ? theme.colors.blackMain : theme.colors.gray6};
  border-bottom: ${({ isSelected, theme }) =>
    isSelected ? `solid 1.5px ${theme.colors.gray10}` : "none"};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 300px;
  background: ${({ theme }) => theme.colors.gray1};
`;

const DetailSection = styled.div`
  padding: 19px 19px 120px 19px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  .p {
    ${({ theme }) => theme.textStyles.body1Regular};
    white-space: pre-wrap;
  }
  .img {
    width: 100%;
    max-width: 335px;
    height: auto;
    border-radius: 4px;
  }
`;

const CommentSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 22px 19px 120px 19px;

  .review {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
  }
`;

const InputBox = styled.div`
  width: 100%;
  max-width: 336px;
  height: 44px;
  margin-bottom: 15px;
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
    flex: 1;
  }
  .nickname {
    color: ${({ theme }) => theme.colors.Primary50};
    ${({ theme }) => theme.textStyles.label2Medium};
    white-space: nowrap;
  }
`;

const SendBtn = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  ${({ theme }) => theme.textStyles.body1Regular};
  color: ${({ theme }) => theme.colors.blackMain};
  text-align: left;

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray6};
  }
`;

const DropShape = styled.div`
  width: 165px;
  height: 23px;
  padding: 4px 12px 3px 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: flex-start;
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
