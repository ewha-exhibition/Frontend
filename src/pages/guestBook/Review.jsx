import styled from "styled-components";
import { useState, useEffect, useRef, useCallback } from "react";

import useCustomFetch from "../../utils/hooks/useCustomFetch";

import ReviewItem from "../../components/guestBook/ReviewItem";
import Nothing from "../../components/Nothing";

function Review() {
  const [pageNow, setPageNow] = useState(0);
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef(null);
  const isRequesting = useRef(false);

  const {
    data: reviewData,
    error,
    loading,
  } = useCustomFetch(`/guestbooks/reviews?pageNum=${pageNow}&limit=10`);
  //console.log(reviewData);

  useEffect(() => {
    if (error) {
      isRequesting.current = false;
      return;
    }

    if (!reviewData?.data?.posts) return;

    setItems((prev) => {
      const newItems = reviewData.data.posts.filter(
        (post) => !prev.some((p) => p.postId === post.postId),
      );
      return [...prev, ...newItems];
    });
    const { pageNum, totalPages } = reviewData.data.pageInfo;

    if (pageNum >= totalPages - 1) {
      setHasMore(false);
    }
  }, [reviewData, error]);

  const lastItemRef = useCallback(
    (node) => {
      if (loading || !hasMore) return;

      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !isRequesting.current && hasMore) {
          isRequesting.current = true;
          setPageNow((prev) => prev + 1);
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [loading, hasMore],
  );

  if (!loading && items.length === 0) {
    return <Nothing text={"아직 작성된 후기가 없어요"} />;
  }

  console.log(items);

  return (
    <Container>
      {items.map((data, index) => {
        const isLast = index === items.length - 1;

        return (
          <div ref={isLast ? lastItemRef : null} key={data.postId}>
            <ReviewItem
              poster={data.posterUrl}
              title={data.title}
              id={data.postId}
              review={data.body}
              imageUrls={data.imageUrls}
              exhibitionId={data.exhibitionId}
            />
          </div>
        );
      })}

      {loading && <p style={{ textAlign: "center" }}>로딩 중...</p>}
    </Container>
  );
}

export default Review;

const Container = styled.div``;
