import styled from "styled-components";
import NewBanner from "../../assets/icons/my_banner_new.png";

function Banner() {
  return (
    <Container>
      <BannerImage src={NewBanner} alt="홈 화면에 추가 안내 배너" />
    </Container>
  );
}

export default Banner;

const Container = styled.div`
  width: 100%;
  height: 70px; 
  overflow: hidden; 
  background-color: ${({ theme }) => theme.colors.Primary10};
`;

const BannerImage = styled.img`
  width: 100%;
  height: 100%; 
  object-fit: contain; 
  display: block;
`;
