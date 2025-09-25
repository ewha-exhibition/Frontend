import styled from "styled-components";

import Topbar from "../components/Topbar";
import TextBox from "../components/review/TextBox";

function CreateReview() {
  return (
    <Container>
      <Topbar title={"후기 작성"} icon={"Link"} />
      <Content>
        <p className="guide">관람 후 느낀 점을 벗들과 나눠주세요!</p>
        <TextBox />
        <div>
          <p className="noti">글은 익명으로 등록됩니다.</p>
          <p className="noti">
            작성한 글은 삭제는 가능하나 수정할 수 없습니다.
          </p>
        </div>
      </Content>
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
  display: flex;
  flex-direction: column;
  gap: 16px;

  .guide {
    color: ${({ theme }) => theme.colors.blackMain};
    font-size: ${({ theme }) => theme.font.fontSize.headline18};
    font-weight: ${({ theme }) => theme.font.fontWeight.semiBold};
  }
  .noti {
    color: ${({ theme }) => theme.colors.gray7};
    font-size: ${({ theme }) => theme.font.fontSize.label12};
    font-weight: ${({ theme }) => theme.font.fontWeight.regular};
  }
`;
