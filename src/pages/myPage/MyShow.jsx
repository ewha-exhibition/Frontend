import styled from "styled-components";
import { useEffect, useState, useRef, useCallback } from "react";

import useCustomFetch from "../../utils/hooks/useCustomFetch";
import useLogin from "../../utils/hooks/useLogin";

import Topbar from "../../components/Topbar";
import ShowItem from "../../components/myPage/ShowItem";
import ConfirmModal from "../../components/myPage/CheckModal";
import KakaoBtn from "../../components/myPage/KakaoBtn";
import Nothing from "../../components/Nothing";

function MyShow() {
  const login = useLogin();

  const [pageNow, setPageNow] = useState(0);
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [modalText, setModalText] = useState("");

  const {
    data: myShowData,
    error,
    loading,
  } = useCustomFetch(`/hosts?pageNum=${pageNow}&limit=10`);
  console.log(myShowData?.data);

  useEffect(() => {
    if (!myShowData?.data?.exhibitions) return;

    setItems((prev) => {
      const newItems = myShowData.data.exhibitions.filter(
        (data) => !prev.some((p) => p.exhibitionId === data.exhibitionId),
      );
      return [...prev, ...newItems];
    });
    const { pageNum, totalPages } = myShowData.data.pageInfo;

    if (pageNum >= totalPages - 1) {
      setHasMore(false);
    }
  }, [myShowData]);

  const lastItemRef = useCallback(
    (node) => {
      if (loading || !hasMore) return;

      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPageNow((prev) => prev + 1);
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [loading, hasMore],
  );

  const handleCopySuccess = (type) => {
    if (type === "code") {
      setModalText("초대코드 복사 완료");
    }
    if (type === "url") {
      setModalText("URL 복사 완료");
    }
    setIsOpen(true);
  };

  return (
    <Container>
      <Topbar title={"내 공연/전시"} icon={null} />

      {login ? (
        <>
          {isOpen && (
            <ConfirmModal
              message={modalText}
              onClose={() => setIsOpen(false)}
            />
          )}
          <Content>
            {!loading && items.length === 0 ? (
              <Nothing text={"아직 등록한 공연이 없어요"} />
            ) : (
              items.map((data, index) => {
                const isLast = index === items.length - 1;
                return (
                  <div ref={isLast ? lastItemRef : null} key={data.postId}>
                    <ShowItem
                      key={data.exhibitionId}
                      exhibitionId={data.exhibitionId}
                      title={data.exhibitionName}
                      date={data.date}
                      startDate={data.startDate}
                      endDate={data.endDate}
                      place={data.place}
                      poster={data.posterUrl}
                      onGoing={data.status}
                      code={data.code}
                      link={data.link}
                      onCopySuccess={handleCopySuccess}
                    />
                  </div>
                );
              })
            )}
            <Noti>
              <p>초대코드란?</p>
              <ul>
                <li>
                  공연/전시 홍보글을 등록한 사람에게 주어지는 공유용 코드예요.
                </li>
                <li>
                  초대코드를 입력하면 글 등록자와 같은 권한(글 수정, 삭제,
                  대댓글 작성 등)을 가질 수 있어요.
                </li>
              </ul>
            </Noti>
          </Content>
        </>
      ) : (
        <LoginContainer>
          <p>로그인 후 기능을 이용해보세요!</p>
          <KakaoBtn />
        </LoginContainer>
      )}
    </Container>
  );
}

export default MyShow;

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  padding-top: 46px;

  display: flex;
  flex-direction: column;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px;
`;
const Noti = styled.div`
  height: 162px;
  padding: 10px;
  margin: 14px 0;

  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.Primary5};

  display: flex;
  flex-direction: column;
  justify-content: center;

  p {
    color: ${({ theme }) => theme.colors.SubColor2};
    font-size: ${({ theme }) => theme.font.fontSize.title15};
    font-weight: ${({ theme }) => theme.font.fontWeight.regular};
    line-height: ${({ theme }) => theme.font.lineHeight.normal};
    margin-bottom: 12px;
  }

  ul {
    list-style-position: outside;
    list-style-type: disc;
    padding-inline-start: 20px;
    margin: 0px;
  }

  li {
    color: ${({ theme }) => theme.colors.gray7};
    font-size: ${({ theme }) => theme.font.fontSize.body14};
    font-weight: ${({ theme }) => theme.font.fontWeight.regular};
    line-height: ${({ theme }) => theme.font.lineHeight.normal};
  }
  li::marker {
    font-size: 0.8em;
  }
`;
const LoginContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 12px;

  margin-bottom: 60px;

  text-align: center;
  p {
    font-weight: ${({ theme }) => theme.textStyles.semiBold};
    color: ${({ theme }) => theme.colors.gray7};
  }
`;
