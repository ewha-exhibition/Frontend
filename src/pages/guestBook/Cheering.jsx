import styled from "styled-components";
import { useState, useEffect, useRef, useCallback } from "react";

import useCustomFetch from "../../utils/hooks/useCustomFetch";

import CheeringItem from "../../components/guestBook/CheeringItem";
import Nothing from "../../components/Nothing";

function Cheering() {
  const [pageNow, setPageNow] = useState(0);
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef(null);

  const {
    data: cheeringData,
    error,
    loading,
  } = useCustomFetch(`/guestbooks/cheers?pageNum=${pageNow}&limit=10`);
  //console.log(cheeringData?.data);

  useEffect(() => {
    if (!cheeringData?.data?.posts) return;

    setItems((prev) => {
      const newItems = cheeringData.data.posts.filter(
        (post) => !prev.some((p) => p.postId === post.postId),
      );
      return [...prev, ...newItems];
    });

    const { pageNum, totalPages } = cheeringData.data.pageInfo;

    if (pageNum >= totalPages - 1) {
      setHasMore(false);
    }
  }, [cheeringData]);

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

  if (!loading && items.length === 0) {
    return <Nothing text={"아직 작성된 응원이 없어요"} />;
  }

  return (
    <Container>
      {items.map((data, index) => {
        const isLast = index === items.length - 1;

        return (
          <div ref={isLast ? lastItemRef : null} key={data.postId}>
            <CheeringItem
              key={data.postId}
              poster={data.posterUrl}
              title={data.title}
              id={data.postId}
              review={data.body}
              pic={data.imageUrls}
            />
          </div>
        );
      })}
      {loading && <p style={{ textAlign: "center" }}>로딩 중...</p>}
    </Container>
  );
}

export default Cheering;

const Container = styled.div``;
