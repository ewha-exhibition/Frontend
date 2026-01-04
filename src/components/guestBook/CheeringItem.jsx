import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import ChevronRight from "../../assets/icons/ChevronRight.svg?react";
import Trash from "../../assets/icons/Trash.svg?react";

function CheeringItem({
  poster,
  title,
  id,
  review,
  pic,
  mine,
  postId,
  onRequestDelete,
}) {
  const navigate = useNavigate();

  const goDetail = () => {
    navigate(`/detail/${id}`);
  };

  return (
    <Container>
      <Upper>
        <TitleArea>
          <img src={poster} alt="포스터 이미지" />
          <p>{title}</p>
        </TitleArea>
        <IconArea>
          {mine && (
            <Trash
              width={15}
              height={15}
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                e.stopPropagation();
                onRequestDelete(postId);
              }}
            />
          )}
          <StyledChevron width={15} height={15} onClick={goDetail} />
        </IconArea>
      </Upper>

      <TextArea>{review}</TextArea>
    </Container>
  );
}

export default CheeringItem;

const StyledChevron = styled(ChevronRight)`
  color: ${({ theme }) => theme.colors.gray6};
  cursor: pointer;
`;

const Container = styled.div`
  width: 100%;
  padding: 17px 20px;

  display: flex;
  flex-direction: column;
  gap: 8px;

  border-bottom: 1px solid ${({ theme }) => theme.colors.gray2};
`;
const Upper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
const IconArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
const TextArea = styled.div`
  color: ${({ theme }) => theme.colors.gray10};
  font-size: ${({ theme }) => theme.font.fontSize.body14};
  font-weight: ${({ theme }) => theme.font.fontWeight.regular};
  line-height: ${({ theme }) => theme.font.lineHeight.wide};
`;
