import styled from "styled-components";
import Topbar from "../components/Topbar";

function CreateReview() {
  return (
    <Container>
      <Topbar title={"후기 작성"} icon={"Link"} />
      <Content />
    </Container>
  );
}

export default CreateReview;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;
const Content = styled.div`
  padding: 20px 20px 0px 20px;
`;
