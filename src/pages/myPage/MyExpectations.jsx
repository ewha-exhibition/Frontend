import styled from "styled-components";

import useCustomFetch from "../../utils/hooks/useCustomFetch";

import Topbar from "../../components/Topbar";

function MyExpectations() {
  const {
    data: myExData,
    error,
    loading,
  } = useCustomFetch(`/cheers?pageNum=0&limit=10`);
  console.log(myExData?.data);
  return (
    <Container>
      <Topbar title={"작성한 기대평"} icon={"none"} />
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
