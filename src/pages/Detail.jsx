import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

import TopBar from "../components/Topbar";
import BookingBar from "../components/detail/BookingBar";
import ConfirmModal from "../components/detail/ConfirmModal";
import { Cheer, Question, Review } from "../components/detail/TabContents";
import { HostMenu } from "../components/detail/HostView";
import NeedLogin from "../components/home/NeedLogin";
import CommentInput from "../components/detail/CommentInput";
import CommentList from "../components/detail/CommentList";

// Icons
import locationIcon from "../assets/icons/Location.svg";
import ticketIcon from "../assets/icons/Ticket.svg";
import userIcon from "../assets/icons/User.svg";
import ClockIcon from "../assets/icons/Clock.svg?react";
import CalenderIcon from "../assets/icons/Calender.svg?react";
import MenuIcon from "../assets/icons/Menu.svg?react";
import LoadingUi from "../components/LoadingUi";

// API
import {
  getExhibitionApi,
  deleteExhibitionApi,
} from "../utils/apis/exhibition";
import {
  getCommentsApi,
  createCommentApi,
  deleteCommentApi,
} from "../utils/apis/comment";
import useAxios from "../utils/hooks/useAxios";
import { formatPeriod } from "../utils/formatPeriod";

const PAGE_SIZE = 10;
const initialListState = {
  items: [],
  page: 0,
  hasNext: true,
  loading: false,
};

export default function Detail() {
  useAxios();
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const textareaRef = useRef(null);

  const [login] = useState(!!localStorage.getItem("accessToken"));
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [exhibition, setExhibition] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [menuState, setMenuState] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [currentTab, setCurrentTab] = useState(
    location.state?.currentTab || "detail",
  );
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: null,
    targetId: null,
  });
  const [commentList, setCommentList] = useState({ ...initialListState });

  useEffect(() => {
    if (!id) return;
    async function fetchExhibition() {
      try {
        const res = await getExhibitionApi(id);
        setExhibition(res?.data ?? {});
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }
    fetchExhibition();
  }, [id]);

  const categories = [
    { key: "detail", label: "상세정보", count: null },
    { key: "question", label: "질문", count: exhibition?.questionCount ?? 0 },
    { key: "cheer", label: "응원", count: exhibition?.cheerCount ?? 0 },
    { key: "review", label: "후기", count: exhibition?.reviewCount ?? 0 },
  ];

  const handleTabChange = (tab) => {
    if (tab === currentTab) return;
    setCurrentTab(tab);
    if (tab !== "detail") setInputValue("");
  };

  function closeModal() {
    setModalState({ isOpen: false, type: null, targetId: null });
  }

  function openDeleteCommentModal(postId, type) {
    setModalState({ isOpen: true, type, targetId: postId });
  }

  function openLoginModal() {
    setModalState({ isOpen: true, type: "login", targetId: null });
  }

  const handleInputValueChange = (e) => {
    setInputValue(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleKakaoLogin = () => {
    const client_id = import.meta.env.VITE_KAKAO_CLIENT_ID;
    const redirect_uri = import.meta.env.VITE_KAKAO_REDIRECT_URI;
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code`;
  };

  async function resetAndFetchFirstPage(tab) {
    if (tab === "detail") return;
    const exhibitionId = exhibition?.exhibitionId;
    if (!exhibitionId) return;

    setCommentList((prev) => ({ ...prev, loading: true }));
    try {
      const res = await getCommentsApi({
        exhibitionId,
        type: tab,
        page: 0,
        limit: PAGE_SIZE,
      });
      const items = res?.data?.comments ?? [];
      const pageInfo = res?.data?.pageInfo ?? {};
      const hasNext = (pageInfo.pageNum ?? 0) < (pageInfo.totalPages ?? 0) - 1;
      setCommentList({ items, page: 1, hasNext, loading: false });
    } catch (e) {
      console.error(e);
      setCommentList({ ...initialListState });
    }
  }

  async function fetchNextPage() {
    if (currentTab === "detail") return;
    const exhibitionId = exhibition?.exhibitionId;
    if (!exhibitionId) return;
    if (!commentList.hasNext || commentList.loading) return;

    setCommentList((prev) => ({ ...prev, loading: true }));
    try {
      const res = await getCommentsApi({
        exhibitionId,
        type: currentTab,
        page: commentList.page,
        limit: PAGE_SIZE,
      });
      const newItems = res?.data?.comments ?? [];
      const pageInfo = res?.data?.pageInfo ?? {};
      const hasNext = (pageInfo.pageNum ?? 0) < (pageInfo.totalPages ?? 0) - 1;
      setCommentList((prev) => ({
        ...prev,
        items: [...prev.items, ...newItems],
        page: prev.page + 1,
        hasNext,
        loading: false,
      }));
    } catch (e) {
      console.error(e);
      setCommentList((prev) => ({ ...prev, loading: false }));
    }
  }

  async function handleSubmitComment() {
    if (!login) {
      openLoginModal();
      return;
    }
    const content = inputValue.trim();
    if (!content) return;

    try {
      const exhibitionId = exhibition?.exhibitionId;
      if (!exhibitionId) return;

      await createCommentApi({ exhibitionId, type: currentTab, content });

      setInputValue("");
      if (textareaRef.current) textareaRef.current.style.height = "auto";

      await resetAndFetchFirstPage(currentTab);

      setExhibition((prev) => {
        const countKey = `${currentTab}Count`;
        return { ...prev, [countKey]: (prev[countKey] || 0) + 1 };
      });
    } catch (e) {
      // 에러 무시
    }
  }

  const handleHostReply = async (targetId, replyContent) => {
    if (!login) {
      alert("로그인이 필요합니다.");
      return;
    }
    if (!replyContent.trim()) {
      alert("답변 내용을 입력해주세요.");
      return;
    }
    try {
      await createCommentApi({ exhibitionId: targetId, type: "comment", content: replyContent });
      await resetAndFetchFirstPage(currentTab);
    } catch (e) {
      console.error("답변 등록 실패:", e);
    }
  };

  async function handleDeleteComment() {
    const postId = modalState.targetId;
    const type = modalState.type;
    if (!postId) return;

    try {
      await deleteCommentApi({ postId, type });
      closeModal();

      if (type === "comment") {
        await resetAndFetchFirstPage(currentTab);
      } else {
        setCommentList((prev) => ({
          ...prev,
          items: prev.items.filter((item) => item.postId !== postId),
        }));
        setExhibition((prev) => {
          const countKey = `${currentTab}Count`;
          return { ...prev, [countKey]: Math.max(0, (prev[countKey] || 0) - 1) };
        });
      }
    } catch (e) {
      console.error("삭제 실패:", e);
    }
  }

  useEffect(() => {
    if (currentTab === "detail") return;
    if (!exhibition?.exhibitionId) return;
    resetAndFetchFirstPage(currentTab);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTab, exhibition?.exhibitionId]);

  const handleMoveToReview = () => {
    if (!login) {
      setShowLoginModal(true);
      return;
    }
    navigate(`/createReview/${id}`);
  };

  const observerRef = useRef();
  const lastElementRef = useCallback(
    (node) => {
      if (commentList.loading) return;
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && commentList.hasNext) fetchNextPage();
      });
      if (node) observerRef.current.observe(node);
    },
    [commentList.loading, commentList.hasNext, currentTab],
  );

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setModalState({ isOpen: true, type: "copy", targetId: null });
    } catch (error) {
      console.error("링크 복사 실패:", error);
    }
  };

  const handleEdit = () => {
    closeMenu();
    navigate(`/enrollEvent/${id}/edit`);
  };

  const handleDelete = () => {
    closeMenu();
    setModalState({ isOpen: true, type: "deleteExhibition", targetId: id });
  };

  const executeExhibitionDelete = async () => {
    try {
      await deleteExhibitionApi(id);
      navigate(-1);
    } catch (e) {
      console.error("전시 삭제 실패:", e);
    }
  };

  const openMenu = () => setMenuState(true);
  const closeMenu = () => setMenuState(false);


  if (isLoading || !exhibition) return <LoadingUi />;

  return (
    <>
      {showLoginModal && (
        <NeedLogin onClose={() => setShowLoginModal(false)}>
          <p>카카오톡으로 간편 로그인하고</p>
          <p>모든 기능을 이용해보세요!</p>
        </NeedLogin>
      )}
      <Container>
        {!exhibition?.host ? (
          <TopBar title={null} icon={"Link"} onClick={handleShare} />
        ) : (
          <TopBar title={null} icon={"Menu"} onClick={openMenu} />
        )}

        <Header>
          <img className="img" src={exhibition.posterUrl} alt={exhibition.exhibitionName} />
          <h1 className="h1">{exhibition.exhibitionName}</h1>

          <Summary>
            <div className="div">
              <img className="svgIcon" src={locationIcon} alt="장소" />
              <p className="p">{exhibition.place}</p>
            </div>
            <div className="div">
              <img className="svgIcon" src={ticketIcon} alt="가격" />
              <p className="p">{exhibition.price}</p>
            </div>
            <div className="div">
              <img className="svgIcon" src={userIcon} alt="주최" />
              <p className="p">{exhibition.clubName}</p>
            </div>
            <div className="div">
              <CalenderIcon width={18} height={18} color="#57B190" alt="날짜" />
              <p className="p">{formatPeriod(exhibition.period)}</p>
            </div>
            <div className="div">
              <ClockIcon width={18} height={18} color="#57B190" alt="시간" />
              <p className="p">{exhibition.duration}</p>
            </div>
            {exhibition.dateException && (
              <div className="div">
                <StyledMenuIcon alt="예외사항" />
                <p className="p">{exhibition.dateException}</p>
              </div>
            )}
          </Summary>
        </Header>

        <Categories>
          {categories.map(({ key, label, count }) => (
            <Category key={key} isSelected={currentTab === key} onClick={() => handleTabChange(key)}>
              <p>{label}</p>
              {count !== null && count > 0 && <span>&nbsp;({count})</span>}
            </Category>
          ))}
        </Categories>

        <Content>
          {currentTab === "detail" && (
            <DetailSection>
              <p className="p">{exhibition.content}</p>
              {exhibition.images?.map((img, idx) => (
                <img className="img" key={img.id} src={img.imageUrl} alt={`상세 정보 이미지-${idx}`} />
              ))}
            </DetailSection>
          )}

          {currentTab === "question" && (
            <CommentSection>
              <CommentInput
                ref={textareaRef}
                isHost={exhibition.host}
                placeholder="벗들에게 궁금한 점을 질문하세요!"
                login={login}
                inputValue={inputValue}
                onChange={handleInputValueChange}
                onSubmit={handleSubmitComment}
                onLoginRequired={() => setShowLoginModal(true)}
              />
              <CommentList
                items={commentList.items}
                loading={commentList.loading}
                CommentComponent={Question}
                lastElementRef={lastElementRef}
                isHost={exhibition.host}
                club={exhibition.clubName}
                openModal={openDeleteCommentModal}
                onReply={handleHostReply}
              />
            </CommentSection>
          )}

          {currentTab === "cheer" && (
            <CommentSection>
              <CommentInput
                ref={textareaRef}
                isHost={exhibition.host}
                placeholder="벗들에게 응원의 한마디를 남겨주세요!"
                login={login}
                inputValue={inputValue}
                onChange={handleInputValueChange}
                onSubmit={handleSubmitComment}
                onLoginRequired={() => setShowLoginModal(true)}
              />
              <CommentList
                items={commentList.items}
                loading={commentList.loading}
                CommentComponent={Cheer}
                lastElementRef={lastElementRef}
                isHost={exhibition.host}
                club={exhibition.clubName}
                openModal={openDeleteCommentModal}
                onReply={handleHostReply}
              />
            </CommentSection>
          )}

          {currentTab === "review" && (
            <CommentSection>
              <div className="review">
                <DropShape>관람 후 느낀 점을 나눠주세요!</DropShape>
                <WriteReviewButton onClick={handleMoveToReview}>후기 작성하기</WriteReviewButton>
              </div>
              <CommentList
                items={commentList.items}
                loading={commentList.loading}
                CommentComponent={Review}
                lastElementRef={lastElementRef}
                isHost={exhibition.host}
                club={exhibition.clubName}
                openModal={openDeleteCommentModal}
                onReply={handleHostReply}
                keyField="id"
              />
            </CommentSection>
          )}
        </Content>

        <BookingBar
          exhibitionId={exhibition.exhibitionId}
          isScraped={exhibition.scrap}
          period={exhibition.period}
          price={exhibition.price}
          scrapCount={exhibition.scrapCount}
          link={exhibition?.link}
        />
        <HostMenu
          isOpen={menuState}
          closeHostMenu={closeMenu}
          handleShare={handleShare}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />

        <ConfirmModal
          isOpen={modalState.isOpen}
          type={modalState.type}
          onClose={closeModal}
          onConfirm={() => {
            if (modalState.type === "login") handleKakaoLogin();
            else if (modalState.type === "deleteExhibition") executeExhibitionDelete();
            else handleDeleteComment();
          }}
        />
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 100vw;
  max-width: 540px;
  min-height: 100vh;
  padding: 46px 0;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 0 20px;
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
  gap: 10px;
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
    color: ${({ theme }) => theme.colors.Primary30};
  }
  .p {
    ${({ theme }) => theme.textStyles.label1Medium};
    color: ${({ theme }) => theme.colors.gray10};
  }
`;

const Categories = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 23px;
  padding: 0 20px;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray3};

  position: sticky;
  top: 46px;
  z-index: 100;
  background-color: ${({ theme }) => theme.colors.white || "#fff"};
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
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.gray1};
`;

const DetailSection = styled.div`
  width: 100%;
  padding: 19px 19px 120px 19px;
  display: flex;
  flex-direction: column;
  align-self: center;
  gap: 8px;
  .p {
    ${({ theme }) => theme.textStyles.body1Regular};
    color: ${({ theme }) => theme.colors.gray10};
    font-size: 14px;
    white-space: pre-wrap;
  }
  .img {
    width: 100%;
    height: auto;
    border-radius: 4px;
    align-self: center;
  }
`;

const CommentSection = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
  padding: 22px 19px 120px 25px;
  background: ${({ theme }) => theme.colors.gray1};

  .review {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    align-self: center;
    gap: 6px;
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
  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.Primary60};
  }
`;

const StyledMenuIcon = styled(MenuIcon)`
  width: 18px;
  height: 18px;
  path {
    stroke: #57b190;
  }
`;
