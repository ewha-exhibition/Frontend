import styled from "styled-components";

import useCustomFetch from "../../utils/hooks/useCustomFetch";

import ChevronRight from "../../assets/icons/ChevronRight.svg?react";
import Trash from "../../assets/icons/Trash.svg?react";

function CheeringItem({
  poster,
  title,
  id,
  review,
  pic,
  mypage,
  postId,
  deleteLink,
  onDeleteSuccess
}) {
  const delUrl = `${deleteLink}/${postId}`;
  const { fetchData } = useCustomFetch();

  const delItem = async (e) => {
    e.stopPropagation();
    try {
      await fetchData(delUrl, "DELETE");
      onDeleteSuccess(postId);
      console.log("삭제 성공");
    } catch (err) {
      console.error("삭제 실패", err);
    }
  };

  return (
    <Container>
      <Upper>
        <TitleArea>
          <img src={poster} alt="포스터 이미지" />
          <p>{title}</p>
        </TitleArea>
        <IconArea>
          {mypage && (
            <Trash
              width={15}
              height={15}
              onClick={delItem}
              style={{ cursor: "pointer" }}
            />
          )}
          <StyledChevron width={15} height={15} />
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
