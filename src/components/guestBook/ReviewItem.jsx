import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import Trash from "../../assets/icons/Trash.svg?react";
import ChevronRight from "../../assets/icons/ChevronRight.svg?react";

import PhotoArea from "./PhotoArea";
import PhotoViewer from "./PhotoViewer";

function ReivewItem({
  poster,
  title,
  review,
  pic,
  exhibitionId,
  postId,
  mine,
  onRequestDelete,
}) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const navigate = useNavigate();

  const goDetail = () => {
    navigate(`/detail/${exhibitionId}`);
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
      {pic && pic.length > 0 && (
        <PhotoArea
          pics={pic}
          onOpen={(i) => {
            setIndex(i);
            setOpen(true);
          }}
        />
      )}
      {open && (
        <PhotoViewer
          pics={pic}
          index={index}
          setIndex={setIndex}
          onClose={() => setOpen(false)}
        />
      )}
    </Container>
  );
}

export default ReivewItem;

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
const TextArea = styled.div`
  color: ${({ theme }) => theme.colors.gray10};
  font-size: ${({ theme }) => theme.font.fontSize.body14};
  font-weight: ${({ theme }) => theme.font.fontWeight.regular};
  line-height: ${({ theme }) => theme.font.lineHeight.wide};
`;
const IconArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
