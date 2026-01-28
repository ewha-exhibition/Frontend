import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

import TopBar from "../components/Topbar";
import BookingBar from "../components/detail/BookingBar";
import ConfirmModal from "../components/detail/ConfirmModal";
import { Cheer, Question, Review } from "../components/detail/TabContents";
import { HostMenu } from "../components/detail/HostView";
//TODO: 호스트의 경우 햄버거 메뉴로 변경
//TODO: 링크 복사 완료 모달
//TODO: 회원가입 모달

// Icons
import locationIcon from "../assets/icons/Location.svg";
import ticketIcon from "../assets/icons/Ticket.svg";
import userIcon from "../assets/icons/User.svg";
import ClockIcon from "../assets/icons/Clock.svg?react";
import sendIcon from "../assets/icons/Send.svg";
import CalenderIcon from "../assets/icons/Calender.svg?react";
import Nothing from "../assets/icons/Nothing.svg?react";

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

export default function Detail() {
  const PAGE_SIZE = 10;
  useAxios();
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // 전시 정보 불러오기
  const [exhibition, setExhibition] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (!id) return;
    async function fetchExhibition() {
      try {
        const res = await getExhibitionApi(id);
        const json = res?.data ?? {};
        setExhibition(json);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false); // 성공하든 실패하든 로딩 종료
      }
    }
    fetchExhibition();
  }, [id]);

  // 모달 창 관리
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: null,
    targetId: null,
    onClose: null,
    onConfirm: null,
  });

  // 호스트 메뉴
  const [menuState, setMenuState] = useState(false);

  //댓글창 높이 조절
  const textareaRef = useRef(null);
  function closeModal() {
    setModalState({ isOpen: false, type: null, targetId: null });
  }
  function openDeleteModal(postId) {
    setModalState({
      isOpen: true,
      type: currentTab,
      targetId: postId,
      onConfirm: handleDelete,
    });
  }
  function openLoginModal() {
    setModalState({
      isOpen: true,
      type: "login",
      onClose: null,
      onConfirm: handleKakaoLogin,
    });
  }

  // 카카오 로그인
  const handleKakaoLogin = () => {
    const client_id = import.meta.env.VITE_KAKAO_CLIENT_ID;
    const redirect_uri = import.meta.env.VITE_KAKAO_REDIRECT_URI;
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code`;
    window.location.href = KAKAO_AUTH_URL;
  };

  // 메뉴 열기
  const openMenu = () => {
    setMenuState(true);
  };

  // 메뉴 닫기
  const closeMenu = () => {
    setMenuState(false);
  };
  // 로그인 상태
  const [login, setLogin] = useState(!!sessionStorage.getItem("accessToken"));

  // 댓글 입력
  const [inputValue, setInputValue] = useState("");
  const handleInputValueChange = (e) => {
    setInputValue(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // 높이 초기화
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // 내용 높이에 맞춰 설정
    }
  };
  // 탭, 카테고리
  const [currentTab, setCurrentTab] = useState(
    location.state?.currentTab || "detail",
  );
  const questionCount = exhibition?.questionCount ?? 0;
  const cheerCount = exhibition?.cheerCount ?? 0;
  const reviewCount = exhibition?.reviewCount ?? 0;
  const categories = [
    { key: "detail", label: "상세정보", count: null },
    { key: "question", label: "질문", count: exhibition?.questionCount ?? 0 },
    { key: "cheer", label: "응원", count: exhibition?.cheerCount ?? 0 },
    { key: "review", label: "후기", count: exhibition?.reviewCount ?? 0 },
  ];
  const handleTabChange = (tab) => {
    if (tab === currentTab) return;
    setCurrentTab(tab);
    if (tab === "detail") return;
    setInputValue("");
  };

  //댓글 리스트 상태
  const initialListState = {
    items: [],
    page: 0,
    hasNext: true,
    loading: false,
  };
  // 댓글 리스트, 현재 탭의 리스트만 관리
  const [commentList, setCommentList] = useState({
    ...initialListState,
  });

  // ♥️ 댓글 목록 불러오기 - 초기화
  async function resetAndFetchFirstPage(tab) {
    if (tab === "detail") return;
    const exhibitionId = exhibition?.exhibitionId;
    if (!exhibitionId) return;
    // 로딩 시작
    setCommentList((prev) => ({ ...prev, loading: true }));
    try {
      const res = await getCommentsApi({
        exhibitionId: exhibitionId,
        type: tab,
        page: 0,
        limit: PAGE_SIZE,
      });

      // 서버 응답 구조에 맞게 items 추출
      const items = res?.data?.comments ?? [];
      const pageInfo = res?.data?.pageInfo ?? {};
      const hasNext = (pageInfo.pageNum ?? 0) < (pageInfo.totalPages ?? 0) - 1;
      setCommentList({
        items,
        page: 1,
        hasNext,
        loading: false,
      });
    } catch (e) {
      console.error(e);
      setCommentList({ ...initialListState });
    }
  }

  // ♥️ 댓글 목록 불러오기 - 다음 페이지
  async function fetchNextPage(tab) {
    if (currentTab === "detail") return;

    const exhibitionId = exhibition?.exhibitionId;
    if (!exhibitionId) return;

    // 로딩 중이거나 더 가져올 게 없으면 중단
    if (!commentList.hasNext || commentList.loading) return;

    setCommentList((prev) => ({ ...prev, loading: true }));

    try {
      const res = await getCommentsApi({
        exhibitionId: exhibitionId,
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
        page: prev.page + 1, // 다음 호출을 위해 +1
        hasNext,
        loading: false,
      }));
    } catch (e) {
      console.error(e);
      setCommentList((prev) => ({ ...prev, loading: false }));
    }
  }
  // ♥️ 댓글 작성하기 (수정: 임시 로컬 갱신)
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

      // 1. API 호출 (서버에 저장)
      await createCommentApi({
        exhibitionId: exhibitionId,
        type: currentTab,
        content,
      });

      // 2. 입력창 복구
      setInputValue("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "44px";
      }

      // 3. 목록 새로고침
      await resetAndFetchFirstPage(currentTab);

      // 4. 카운트 갱신 (로컬)
      setExhibition((prev) => {
        const countKey = `${currentTab}Count`;
        return {
          ...prev,
          [countKey]: (prev[countKey] || 0) + 1,
        };
      });
    } catch (e) {
      //console.error(e);
    }
  }

  // ♥️ 주최자 대댓글 작성하기
  const handleHostReply = async (targetId, replyContent) => {
    // 1. 로그인 체크
    if (!login) {
      alert("로그인이 필요합니다.");
      return;
    }

    // 2. 빈 내용 체크
    if (!replyContent.trim()) {
      alert("답변 내용을 입력해주세요.");
      return;
    }

    try {
      // 3. API 호출
      // ★ 예외 규칙 적용: exhibitionId 자리에 '부모 댓글 ID(targetId)'를 전달
      await createCommentApi({
        exhibitionId: targetId,
        type: "comment", // 타입 고정
        content: replyContent,
      });

      // 4. 성공 시 목록 새로고침
      await resetAndFetchFirstPage(currentTab);
    } catch (e) {
      console.error("답변 등록 실패:", e);
    }
  };
  // ♥️ 댓글 삭제하기
  async function handleConfirmDelete() {
    if (modalState.type === "copy") return;
    const postId = modalState.targetId;
    const type = modalState.type;

    if (!postId) return;

    try {
      // 1. API 호출
      await deleteCommentApi({ postId, type: currentTab });

      closeModal();

      // 2. 화면 즉시 갱신 (리스트에서 제거)
      setCommentList((prev) => ({
        ...prev,
        items: prev.items.filter((item) => {
          const itemId = item.postId;
          return itemId !== postId;
        }),
      }));

      // 3. 카운트 즉시 갱신 (-1)
      setExhibition((prev) => {
        const countKey = `${currentTab}Count`;
        return {
          ...prev,
          [countKey]: Math.max(0, (prev[countKey] || 0) - 1),
        };
      });
    } catch (e) {
      console.error(e);
    }
  }
  // 탭 변경 시 리셋 로드
  useEffect(() => {
    if (currentTab === "detail") return;
    if (!exhibition?.exhibitionId) return;

    resetAndFetchFirstPage(currentTab);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTab, exhibition?.exhibitionId]);

  // ♥️ 후기 작성 페이지 이동
  const handleMoveToReview = () => {
    navigate(`/createReview/${id}`); // 경로 예시
  };

  // ♥️ 무한 스크롤 감지
  const observerRef = useRef();
  const lastElementRef = useCallback(
    (node) => {
      if (commentList.loading) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        // 화면에 보이고 & 다음 페이지가 있다면 호출
        if (entries[0].isIntersecting && commentList.hasNext) {
          fetchNextPage();
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [commentList.loading, commentList.hasNext, currentTab],
  );
  // ♥️ 메뉴/공유 기능
  const handleShare = async () => {
    try {
      const currentUrl = window.location.href;
      await navigator.clipboard.writeText(currentUrl);
      setModalState({
        isOpen: true,
        type: "copy",
        targetId: null,
      });
    } catch (error) {
      console.error("링크 복사 실패:", error);
    }
  };
  const handleEdit = async () => {
    closeMenu();
    navigate(`/enrollEvent/${id}/edit`);
  };
  const handleDelete = async () => {
    try {
      await deleteExhibitionApi(id);
      navigate(-1);
    } catch (e) {
      console.error(e);
    }
  };
  if (isLoading || !exhibition) {
    return (
      <div style={{ padding: "100px", textAlign: "center" }}>Loading...</div>
    );
  }

  return (
    <Container>
      {!exhibition.host ? (
        <TopBar title={null} icon={"Link"} onClick={handleShare} />
      ) : (
        <TopBar title={null} icon={"Menu"} onClick={openMenu} />
      )}
      {/* 공연 정보 */}
      <Header>
        <img
          className="img"
          src={exhibition.posterUrl}
          alt={exhibition.exhibitionName}
        />
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
            <p className="p">{exhibition.period}</p>
          </div>

          <div className="div">
            <ClockIcon width={18} height={18} color="#57B190" alt="시간" />
            <p className="p">{exhibition.duration}</p>
          </div>
        </Summary>
      </Header>

      {/* 카테고리 탭 */}
      <Categories>
        {categories.map(({ key, label, count }) => (
          <Category
            key={key}
            isSelected={currentTab === key}
            onClick={() => handleTabChange(key)}
          >
            <p>{label}</p>
            {count !== null && count > 0 && <span>&nbsp;({count})</span>}
          </Category>
        ))}
      </Categories>

      <Content>
        {/* 상세 */}
        {currentTab === "detail" && (
          <DetailSection>
            <p className="p">{exhibition.content}</p>
            {exhibition.images?.map((img, idx) => (
              <img
                className="img"
                key={idx}
                src={img}
                alt={`상세 정보 이미지-${idx}`}
              />
            ))}
          </DetailSection>
        )}

        {/* 질문 */}
        {currentTab === "question" && (
          <CommentSection>
            {!exhibition.host && (
              <InputBox>
                <div className="left" style={{ alignItems: "flex-end" }}>
                  <p className="nickname">익명</p>
                  <AutoHeightTextarea
                    ref={textareaRef}
                    rows={1}
                    placeholder="벗들에게 궁금한 점을 질문하세요!"
                    value={inputValue}
                    onChange={handleInputValueChange}
                  />
                </div>
                <SendBtn
                  src={sendIcon}
                  alt="send"
                  onClick={handleSubmitComment}
                  onReply={handleHostReply}
                />
              </InputBox>
            )}

            {/* 리스트 출력 */}
            {commentList.items.length === 0 && !commentList.loading ? (
              <CenteredDiv>
                <Nothing />
              </CenteredDiv>
            ) : (
              commentList.items.map((comment, index) => {
                // 마지막 요소에 ref 연결 (무한 스크롤)
                const isLast = index === commentList.items.length - 1;
                return (
                  <div key={comment.id} ref={isLast ? lastElementRef : null}>
                    <Question
                      comment={comment}
                      isHost={exhibition.host}
                      openModal={() => openDeleteModal(comment.postId)}
                      onReply={handleHostReply}
                    />
                  </div>
                );
              })
            )}
            {/* 로딩 표시 */}
            {commentList.loading && (
              <p style={{ textAlign: "center" }}>Loading...</p>
            )}
          </CommentSection>
        )}

        {/* 응원 */}
        {currentTab === "cheer" && (
          <CommentSection>
            {!exhibition.host && (
              <InputBox>
                <div className="left">
                  <p className="nickname">익명</p>
                  <Input
                    placeholder="응원의 한마디를 남겨주세요!"
                    value={inputValue}
                    onChange={handleInputValueChange}
                  />
                </div>
                <SendBtn
                  src={sendIcon}
                  alt="send"
                  onClick={handleSubmitComment}
                />
              </InputBox>
            )}

            {commentList.items.length === 0 && !commentList.loading ? (
              <CenteredDiv>
                <Nothing />
              </CenteredDiv>
            ) : (
              commentList.items.map((comment, index) => {
                const isLast = index === commentList.items.length - 1;
                return (
                  <div key={comment.id} ref={isLast ? lastElementRef : null}>
                    <Cheer
                      comment={comment}
                      isHost={exhibition.host}
                      openModal={() => openDeleteModal(comment.postId)}
                      onReply={handleHostReply}
                    />
                  </div>
                );
              })
            )}
            {commentList.loading && (
              <p style={{ textAlign: "center" }}>Loading...</p>
            )}
          </CommentSection>
        )}

        {/* 후기 */}
        {currentTab === "review" && (
          <CommentSection>
            <div className="review">
              <DropShape>관람 후 느낀 점을 나눠주세요!</DropShape>
              <WriteReviewButton onClick={handleMoveToReview}>
                후기 작성하기
              </WriteReviewButton>
            </div>
            {commentList.items.length === 0 && !commentList.loading ? (
              <CenteredDiv>
                <Nothing />
              </CenteredDiv>
            ) : (
              commentList.items.map((comment, index) => {
                const isLast = index === commentList.items.length - 1;
                return (
                  <div key={comment.id} ref={isLast ? lastElementRef : null}>
                    <Review
                      comment={comment}
                      isHost={exhibition.host}
                      openModal={() => openDeleteModal(comment.postId)}
                      onReply={handleHostReply}
                    />
                  </div>
                );
              })
            )}
            {commentList.loading && (
              <p style={{ textAlign: "center" }}>Loading...</p>
            )}{" "}
          </CommentSection>
        )}
      </Content>

      <BookingBar
        exhibitionId={exhibition.exhibitionId}
        isScraped={exhibition.scrap}
        period={exhibition?.period}
        price={exhibition?.price}
        scrapCount={exhibition?.scrapCount}
        link={exhibition?.link}
      />
      <HostMenu
        isOpen={menuState}
        closeHostMenu={closeMenu}
        handleShare={handleShare}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />

      {/* 삭제 확인 모달 */}
      <ConfirmModal
        isOpen={modalState.isOpen}
        type={modalState.type}
        onClose={closeModal}
        onConfirm={modalState.onConfirm}
      />
    </Container>
  );
}

// 스타일 컴포넌트들
const Container = styled.div`
  width: 100vw;
  max-width: 540px;
  min-height: 100vh;
  padding-top: 46px;
  display: flex;
  flex-direction: column;
  padding: 46px 0;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 0 20px 0 20px;
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
  padding: 19px 19px 120px 19px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  .p {
    ${({ theme }) => theme.textStyles.body1Regular};
    font-size: 14px;
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
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
  padding: 22px 19px 120px 25px;
  background: ${({ theme }) => theme.colors.gray1};

  .review {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
  }
`;

const InputBox = styled.div`
  position: relative;
  width: 100%;
  min-height: 44px;
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
    align-self: center;
    color: ${({ theme }) => theme.colors.Primary50};
    ${({ theme }) => theme.textStyles.label2Medium};
    white-space: nowrap;
  }
`;

const SendBtn = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
  align-self: flex-end;
`;

const Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  ${({ theme }) => theme.textStyles.body1Regular};
  color: ${({ theme }) => theme.colors.blackMain};
  text-align: left;
  vertical-align: middle;

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
  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.Primary60};
  }
`;
const CenteredDiv = styled.div`
  width: 100%;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center; /* 세로 중앙 */
  align-items: center; /* 가로 중앙 */
  text-align: center;
`;
const AutoHeightTextarea = styled.textarea`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  ${({ theme }) => theme.textStyles.body1Regular};
  color: ${({ theme }) => theme.colors.blackMain};
  resize: none;
  overflow-y: hidden;
  padding: 0;
  margin-left: 10px;
  margin-right: 5px;
  line-height: 1.4;
  max-height: 120px;
  vertical-align: center;

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray6};
  }
`;
