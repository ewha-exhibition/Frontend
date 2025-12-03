import styled from "styled-components";

import useCustomFetch from "../../utils/hooks/useCustomFetch";

import Topbar from "../../components/Topbar";

function MyQuestions() {
  const {
    data: myQData,
    error,
    loading,
  } = useCustomFetch(`/questions?pageNum=0&limit=10`);
  console.log(myQData?.data);
  return (
    <Container>
      <Topbar title={"작성한 질문"} icon={"none"} />
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
