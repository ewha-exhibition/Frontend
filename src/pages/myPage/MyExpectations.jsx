import styled from "styled-components";
import { useEffect, useState } from "react";

import useCustomFetch from "../../utils/hooks/useCustomFetch";

import Topbar from "../../components/Topbar";
import CheeringItem from "../../components/guestBook/CheeringItem";

function MyExpectations() {
  const {
    data: myExData,
    error,
    loading,
  } = useCustomFetch(`/cheers?pageNum=0&limit=10`);
  console.log(myExData?.data);

  const [list, setList] = useState([]);

  useEffect(() => {
    if (myExData?.data?.previews) {
      setList(myExData.data.previews);
    }
  }, [myExData]);

  const handleDeleteSuccess = (postId) => {
    setList((prev) => prev.filter((item) => item.postId !== postId));
  };

  return (
    <Container>
      <Topbar title={"작성한 기대평"} icon={"none"} />
      <Content>
        {myExData?.data.previews.map((data) => (
          <CheeringItem
            key={data.postId}
            postId={data.postId}
            poster={data.posterUrl}
            title={data.exhibitionName}
            id={data.exhibitionId}
            review={data.content}
            pic={data.imageUrls}
            mypage={true}
            deleteLink={`/cheers`}
            onDeleteSuccess={handleDeleteSuccess}
          />
        ))}
      </Content>
    </Container>
  );
}

export default MyExpectations;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding-top: 46px;

  display: flex;
  flex-direction: column;
`;
const Content = styled.div``;
