import styled from "styled-components";
import { useState } from "react";

import useCustomFetch from "../../utils/hooks/useCustomFetch";

import ReviewItem from "../../components/guestBook/ReviewItem";
import Nothing from "../../components/Nothing";

function Review() {
  const [pageNow, setPageNow] = useState(0);

  const {
    data: reviewData,
    error,
    loading,
  } = useCustomFetch(`/guestbooks/reviews?pageNum=${pageNow}&limit=10`);
  console.log(reviewData?.data);

  return (
    <Container>
      {reviewData?.data?.posts?.legnth === 0 ? (
        <Nothing text={"아직 작성된 후기가 없어요"} />
      ) : (
        reviewData?.data?.posts.map((data) => (
          <ReviewItem
            key={data.postId}
            poster={data.posterUrl}
            title={data.title}
            id={data.postId}
            review={data.body}
            imageUrls={data.imageUrls}
          />
        ))
      )}
    </Container>
  );
}

export default Review;

const Container = styled.div``;
