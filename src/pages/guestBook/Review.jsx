import styled from "styled-components";
import { useState } from "react";

import useCustomFetch from "../../utils/hooks/useCustomFetch";

import ReviewItem from "../../components/guestBook/ReviewItem";

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
      {reviewData?.data?.posts.map((data) => (
        <ReviewItem
          key={data.postId}
          poster={data.posterUrl}
          title={data.title}
          id={data.postId}
          review={data.body}
          imageUrls={data.imageUrls}
        />
      ))}
    </Container>
  );
}

export default Review;

const Container = styled.div``;
