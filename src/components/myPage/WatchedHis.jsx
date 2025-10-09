import styled from "styled-components";
import WriteReview from "../buttons/WriteReview";

function WatchedHis({ id, title, date, place, poster, haveReview, onGoing }) {
  return (
    <Component>
      <Container>
        <ImgWrapper>
          <img src={poster} alt={title} />
          {!onGoing && (
            <Overlay>
              <span>종료</span>
            </Overlay>
          )}
        </ImgWrapper>
        <TextArea>
          <div className="titleBox">{title}</div>
          <p>{place}</p>
          <p>{date}</p>
        </TextArea>
        <BtnArea>
          <WriteReview haveReview={haveReview} />
        </BtnArea>
      </Container>
      <Br />
    </Component>
  );
}

export default WatchedHis;

const Component = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  width: 100%;
  position: relative;

  padding-top: 12px;
  display: flex;
  gap: 12px 20px;
`;
const Br = styled.div`
  width: 100%;
  margin-top: 12px;
  border-bottom: 1.2px solid ${({ theme }) => theme.colors.gray2};
`;
const TextArea = styled.div`
  display: flex;
  flex-direction: column;

  .titleBox {
    color: ${({ theme }) => theme.colors.gray10};
    font-size: ${({ theme }) => theme.font.fontSize.title15};
    font-weight: ${({ theme }) => theme.font.fontWeight.semiBold};
    line-height: ${({ theme }) => theme.font.lineHeight.normal};

    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;

    max-height: 43px;
  }
  p {
    color: ${({ theme }) => theme.colors.gray7};
    font-size: ${({ theme }) => theme.font.fontSize.label12};
    font-weight: ${({ theme }) => theme.font.fontWeight.medium};
    line-height: ${({ theme }) => theme.font.lineHeight.normal};
  }
`;
const BtnArea = styled.div`
  position: absolute;
  right: 0px;
  bottom: 0px;
`;
const ImgWrapper = styled.div`
  position: relative;
  width: 92px;
  height: 130px;

  img {
    width: 100%;
    height: 100%;
    border-radius: 3px;
    object-fit: contain;
    background-color: ${({ theme }) => theme.colors.gray2};
  }
`;
const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(17, 17, 17, 0.3);
  border-radius: 3px;

  display: flex;
  justify-content: center;
  align-items: center;

  span {
    color: ${({ theme }) => theme.colors.white};
    font-size: ${({ theme }) => theme.font.fontSize.label12};
    font-weight: ${({ theme }) => theme.font.fontWeight.semiBold};
  }
`;