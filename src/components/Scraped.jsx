import useCustomFetch from "../utils/hooks/useCustomFetch";

import styled from "styled-components";
import Bookmark from "../assets/icons/Bookmark.svg?react";
import BookmarkOL from "../assets/icons/BookmarkOL.svg?react";
import HaveSeen from "./buttons/HaveSeen";

function Scraped({
  id,
  title,
  startDate,
  endDate,
  place,
  poster,
  scraped,
  onDelete,
}) {
  function formatDate(dateString) {
    return dateString.replace(/-/g, ".");
  }

  const formatStartDate = formatDate(startDate);
  const formatEndDate = formatDate(endDate);

  function checkOnGoing(endDate) {
    const today = new Date();
    const target = new Date(endDate);
    return today <= target;
  }

  const onGoing = checkOnGoing(endDate);
  console.log(onGoing);

  function useDeleteBookmark(refetchScraps) {
    const { fetchData } = useCustomFetch();

    const deleteBookmark = useCallback(
      async (id) => {
        try {
          const response = await fetchData(`/scraps/${id}`, "DELETE", null);

          if (response?.status === 200) {
            console.log("북마크 삭제 완료");
            if (refetchScraps) {
              await refetchScraps();
            }
          } else {
            console.error("삭제 실패:", response);
          }
        } catch (error) {
          console.error("북마크 삭제 중 오류:", error);
        }
      },
      [fetchData, refetchScraps]
    );

    return { deleteBookmark };
  }

  return (
    <Component>
      <Container>
        <img src={poster} alt={title} />
        <TextArea>
          <div className="titleBox">{title}</div>
          <p>{place}</p>
          <p>
            {formatStartDate}~{formatEndDate}
          </p>
        </TextArea>
        <BookmarkWrapper>
          {scraped ? (
            <GreenBookmark
              width={24}
              height={24}
              onClick={() => onDelete(id)}
            />
          ) : (
            <BookmarkOL width={24} height={24} />
          )}
        </BookmarkWrapper>

        <BtnArea>
          <HaveSeen />
        </BtnArea>
      </Container>
      <Br />
    </Component>
  );
}

export default Scraped;

const GreenBookmark = styled(Bookmark)`
  color: ${({ theme }) => theme.colors.Primary50};
`;
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

  img {
    width: 92px;
    height: 130px;
    border-radius: 3px;
    object-fit: contain;
    background-color: ${({ theme }) => theme.colors.gray2};
  }
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
    width: 190px;

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
const BookmarkWrapper = styled.div`
  position: absolute;
  top: 12px;
  right: 0;
`;

const BtnArea = styled.div`
  position: absolute;
  right: 0px;
  bottom: 0px;
`;
