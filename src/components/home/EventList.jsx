import styled from "styled-components";
import { useState } from "react";
import useCustomFetch from "../../utils/hooks/useCustomFetch";
import { toggleScrap } from "../../utils/apis/toggleScrap";

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

    const handleBookmarkClick = () => {
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
          {scraped ? (
            <GreenBookmark
              width={24}
              height={24}
              onClick={handleBookmarkClick}
            />
          ) : (
            <BookmarkOL width={24} height={24} onClick={handleBookmarkClick} />
          )}
        </Container>
        <Br />
      </Component>
    );
  }
}

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
  flex: 1;
  min-width: 0;

  .titleBox {
    color: ${({ theme }) => theme.colors.gray10};
    font-size: ${({ theme }) => theme.font.fontSize.title15};
    font-weight: ${({ theme }) => theme.font.fontWeight.semiBold};
    line-height: ${({ theme }) => theme.font.lineHeight.normal};

    display: -webkit-box;
    width: 190px;
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
