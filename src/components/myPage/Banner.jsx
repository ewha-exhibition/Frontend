import styled from "styled-components";

function Banner() {
  return (
    <Container>
      <div>
        <span className="logo">綠’ KNOCK</span> 홈 화면에 추가해서 앱처럼 사용하는 방법!
      </div>
    </Container>
  );
}

export default Banner;

//배너 내용 변경될 걸 생각하여 컴포넌트로 제작함
//기본 내용으로 작성됨
const Container = styled.div`
  width: 100%;
  height: 70px;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${({ theme }) => theme.colors.Primary10};

  color: ${({ theme }) => theme.colors.Primary60};
  font-size: ${({ theme }) => theme.font.fontSize.body14};
  font-weight: ${({ theme }) => theme.font.fontWeight.semiBold};
  line-height: ${({ theme }) => theme.font.lineHeight.normal};

  .logo {
    font-size: ${({ theme }) => theme.font.fontSize.headline18};
    font-weight: ${({ theme }) => theme.font.fontWeight.regular};
    line-height: ${({ theme }) => theme.font.lineHeight.normal};
  }
`;
