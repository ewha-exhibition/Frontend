import styled from "styled-components";
import TopBar from "../components/Topbar";

import banner from "../assets/guides/guide0.png";
import step1 from "../assets/guides/guide1.png";
import step2 from "../assets/guides/guide2.png";
import step3 from "../assets/guides/guide3.png";
import step4 from "../assets/guides/guide4.png";
import step5 from "../assets/guides/guide5.png";

export default function AddToHomeGuide() {
  const images = [banner, step1, step2, step3, step4, step5];

  return (
    <Container>
      <TopBar title="홈 화면에 추가하기" />
      <Content>
        {images.map((src, idx) => (
          <Card key={idx}>
            <img src={src} alt={`guide-step-${idx + 1}`} loading="lazy" />
          </Card>
        ))}
      </Content>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  max-width: 540px;
  min-height: 100vh;
  padding-top: 46px;
  background: ${({ theme }) => theme.colors.gray1};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px;
`;

const Card = styled.div`
  border-radius: 10px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.06);

  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;
