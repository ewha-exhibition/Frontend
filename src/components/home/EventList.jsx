import styled from "styled-components";
import Bookmark from "../assets/icons/Bookmark.svg?react";

function EventList({ id, title, date, place, poster, onGoing, scraped }) {
  return (
    <Component>
      <Container>
        <img src={poster} alt={title} />
        <TextArea>
          <div className="titleBox">{title}</div>
          <p>{place}</p>
          <p>{date}</p>
        </TextArea>
        <Bookmark width={24} height={24} />
      </Container>
      <Br />
    </Component>
  );
}

export default EventList;

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
