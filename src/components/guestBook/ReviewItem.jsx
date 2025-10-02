import styled from "styled-components";

import PhotoArea from "./PhotoArea";

function ReivewItem({ key, poster, title, id, review, pic }) {
  return (
    <Container>
      <TitleArea>
        <img src={poster} alt="포스터 이미지" />
        <p>{title}</p>
      </TitleArea>
      <TextArea>{review}</TextArea>

      {pic && pic.length > 0 && <PhotoArea pics={pic} />}
    </Container>
  );
}

export default ReivewItem;

const Container = styled.div`
  width: 100%;
  padding: 17px 20px;

  display: flex;
  flex-direction: column;
  gap: 8px;

  border-bottom: 1px solid ${({ theme }) => theme.colors.gray2};
`;
const TitleArea = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;

  img {
    width: 42px;
    height: 59px;
    object-fit: contain;
    background-color: ${({ theme }) => theme.colors.gray2};
  }

  p {
    color: ${({ theme }) => theme.colors.gray10};
    font-size: ${({ theme }) => theme.font.fontSize.body14};
    font-weight: ${({ theme }) => theme.font.fontWeight.semiBold};
  }
`;
const TextArea = styled.div`
  color: ${({ theme }) => theme.colors.gray10};
  font-size: ${({ theme }) => theme.font.fontSize.body14};
  font-weight: ${({ theme }) => theme.font.fontWeight.regular};
  line-height: ${({ theme }) => theme.font.lineHeight.wide};
`;
