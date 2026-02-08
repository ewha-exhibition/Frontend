import styled from "styled-components";
import useCustomFetch from "../../utils/hooks/useCustomFetch";

import Bookmark from "../../assets/icons/Bookmark.svg?react";
import BookmarkOL from "../../assets/icons/BookmarkOL.svg?react";

export default function EventList({
  id,
  title,
  date,
  place,
  poster,
  scraped,
  onClick,
  onScrapClick,
}) {
  {
    const { fetchData } = useCustomFetch();

    const handleScrapClick = () => {
      onScrapClick(id, scraped, fetchData);
    };

    return (
      <Component>
        <Container>
          <img src={poster} alt={title} onClick={onClick} />
          <TextArea onClick={onClick}>
            <div className="titleBox">{title}</div>
            <p>{place}</p>
            <p>{date}</p>
          </TextArea>
          <BookmarkWrapper
            onClick={(e) => {
              e.stopPropagation();
              handleBookmarkClick();
            }}
          >
            {scraped ? (
              <GreenBookmark width={24} height={24} />
            ) : (
              <GreenBookmarkOL width={24} height={24} />
            )}
          </BookmarkWrapper>
        </Container>
        <Br />
      </Component>
    );
  }
}

const GreenBookmark = styled(Bookmark)`
  color: ${({ theme }) => theme.colors.Primary50};
`;
const GreenBookmarkOL = styled(BookmarkOL)`
  color: ${({ theme }) => theme.colors.gray8};
`;
const Component = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  width: 100%;
  position: relative;
  align-items: flex-start;
  padding-top: 12px;
  display: flex;
  gap: 12px 20px;
  box-sizing: border-box;

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
  flex: 1 1 0%;
  flex-direction: column;
  min-width: 0;

  .titleBox {
    color: ${({ theme }) => theme.colors.gray10};
    font-size: ${({ theme }) => theme.font.fontSize.title15};
    font-weight: ${({ theme }) => theme.font.fontWeight.semiBold};
    line-height: ${({ theme }) => theme.font.lineHeight.normal};
    width: 100%;
    padding-right: 30px;
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
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;
