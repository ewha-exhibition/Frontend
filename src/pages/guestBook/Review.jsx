import styled from "styled-components";
import { useState } from "react";

import useCustomFetch from "../../utils/hooks/useCustomFetch";

import ReivewItem from "../../components/guestBook/ReviewItem";

import poster1 from "../../assets/mock/poster1.jpg";
import poster2 from "../../assets/mock/poster2.jpg";
import poster3 from "../../assets/mock/poster3.jpg";

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
        <ReivewItem
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
