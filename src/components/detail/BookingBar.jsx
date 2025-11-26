import styled from "styled-components";
import BookmarkIcon from "../../assets/icons/Bookmark.svg";

export default function BookingBar({ isOnGoing, isFree }) {
  return (
    <Container>
      <ScrapButton>
        <img src={BookmarkIcon} />
        <p>15</p>
      </ScrapButton>
      {!isOnGoing && <End>종료</End>}
      {isOnGoing && isFree && (
        <Free>
          <p>예매 없이 바로 입장 가능해요</p>
        </Free>
      )}
      {isOnGoing && !isFree && <BookingButton>예매링크 바로가기</BookingButton>}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 60px;
  position: fixed;
  bottom: 0;
  padding-left: 20px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  background-color: ${({ theme }) => theme.colors.white};
  border-top: 0.5px solid ${({ theme }) => theme.colors.gray3};
`;
//CHECK: 스크랩 버튼 터치 영역?
const ScrapButton = styled.button`
  width: 78px;
  height: 44px;
  padding: 10px 16px 10px 17px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 5px;
  img {
    width: 24px;
    height: 24px;
  }
  p {
    ${({ theme }) => theme.textStyles.titleSemiBold};
    color: ${({ theme }) => theme.colors.gray8};
  }
`;

const BookingButton = styled.button`
  width: 257px;
  height: 44px;
  border-radius: 6px;
  margin-right: 20px;
  background-color: ${({ theme }) => theme.colors.Primary50};

  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  font-size: 14px;
  font-weight: 600
  line-height: 130%;
`;

//CHECK: 활성화 버튼과 스타일 통일?
const End = styled.button`
  width: 248px;
  height: 44px;
  border-radius: 6px;
  margin-right: 20px;
  background-color: ${({ theme }) => theme.colors.gray4};

  color: ${({ theme }) => theme.colors.gray7};
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  line-height: 130%;
`;

const Free = styled.div`
  width: 100%;
  height: 100%;
  padding: 13px 55px;
  margin-left: 8px;

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.Primary20};
  p {
    color: ${({ theme }) => theme.colors.Primary60};
    text-align: center;
    font-size: 14px;
    font-weight: ${({ theme }) => theme.font.fontWeight.semiBold};
    line-height: 130%;
  }
`;
