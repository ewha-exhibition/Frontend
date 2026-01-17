import styled from "styled-components";
import { useState } from "react";

import useCustomFetch from "../../utils/hooks/useCustomFetch";

import CheeringItem from "../../components/guestBook/CheeringItem";
import Nothing from "../../components/Nothing";

function Cheering() {
  const [pageNow, setPageNow] = useState(0);

  const {
    data: cheeringData,
    error,
    loading,
  } = useCustomFetch(`/guestbooks/cheers?pageNum=${pageNow}&limit=10`);
  console.log(cheeringData?.data);

  return (
    <Container>
      {cheeringData?.data.posts?.length === 0 ? (
        <Nothing text={"아직 작성된 응원이 없어요"} />
      ) : (
        cheeringData?.data.posts.map((data) => (
          <CheeringItem
            key={data.postId}
            poster={data.posterUrl}
            title={data.title}
            id={data.postId}
            review={data.body}
            pic={data.imageUrls}
          />
        ))
      )}
    </Container>
  );
}

export default Cheering;

const Container = styled.div``;
