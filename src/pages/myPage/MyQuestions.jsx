import styled from "styled-components";
import { useEffect, useState } from "react";

import useCustomFetch from "../../utils/hooks/useCustomFetch";

import Topbar from "../../components/Topbar";
import CheeringItem from "../../components/guestBook/CheeringItem";

function MyQuestions() {
  const {
    data: myQData,
    error,
    loading,
  } = useCustomFetch(`/questions?pageNum=0&limit=10`);
  console.log(myQData?.data);

  const [list, setList] = useState([]);

  useEffect(() => {
    if (myQData?.data?.previews) {
      setList(myQData.data.previews);
    }
  }, [myQData]);

  const handleDeleteSuccess = (postId) => {
    setList((prev) => prev.filter((item) => item.postId !== postId));
  };

  return (
    <Container>
      <Topbar title={"작성한 질문"} icon={"none"} />
      <Content>
        {list.map((data) => (
          <CheeringItem
            key={data.postId}
            postId={data.postId}
            poster={data.posterUrl}
            title={data.exhibitionName}
            id={data.exhibitionId}
            review={data.content}
            pic={data.imageUrls}
            mypage={true}
            deleteLink={`/questions`}
            onDeleteSuccess={handleDeleteSuccess}
          />
        ))}
      </Content>
    </Container>
  );
}

export default MyQuestions;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding-top: 46px;

  display: flex;
  flex-direction: column;
`;
const Content = styled.div``;
