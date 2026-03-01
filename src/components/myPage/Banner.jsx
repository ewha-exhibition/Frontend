import styled from "styled-components";
import { useNavigate } from "react-router";
import NewBanner from "../../assets/icons/my_banner_new.png";

function Banner() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/add-to-home");
  };

  return (
    <Container
      onClick={handleClick}
      role="button"
      aria-label="홈 화면에 추가 안내"
    >
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
  cursor: pointer;
`;

const BannerImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
  pointer-events: none;
`;
