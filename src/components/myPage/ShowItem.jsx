import styled from "styled-components";

import ShowBtn from "./ShowBtn";

function ShowItem({
  exhibitionId,
  title,
  date,
  startDate,
  endDate,
  place,
  poster,
  code,
  onGoing,
  link,
}) {
  function formatDate(dateString) {
    return dateString.replace(/-/g, ".");
  }

  const formatStartDate = formatDate(startDate);
  const formatEndDate = formatDate(endDate);

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("클립보드에 복사되었어요!");
    } catch (err) {
      console.error("복사 실패", err);
    }
  };

  return (
    <Container>
      <ContentArea>
        <ImgWrapper>
          <img src={poster} alt="포스터 이미지" />
          {onGoing == "CLOSE" && (
            <Overlay>
              <span>종료</span>
            </Overlay>
          )}
        </ImgWrapper>

        <Right>
          <TextArea>
            <p className="title">{title}</p>
            <p className="place">
              {formatStartDate}~{formatEndDate}
            </p>
            <p className="place">{place}</p>
          </TextArea>
          <CodeArea>
            <p className="grenBg">초대코드</p>
            <p className="code">{code}</p>
            <button onClick={() => copyToClipboard(code)}>복사</button>
          </CodeArea>
        </Right>
      </ContentArea>

      <BtnArea>
        <ShowBtn name={"수정"} icon={"Edit"} />
        <ShowBtn
          name={"URL 복사"}
          icon={"Link"}
          onClick={() => copyToClipboard(link)}
        />
      </BtnArea>
    </Container>
  );
}

export default ShowItem;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;

  border-bottom: 1px solid ${({ theme }) => theme.colors.gray2};
  padding: 14px 0;
`;
const ContentArea = styled.div`
  display: flex;
  gap: 12px;
`;
const BtnArea = styled.div`
  display: flex;
  gap: 8px;
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const TextArea = styled.div`
  .title {
    color: ${({ theme }) => theme.colors.gray10};
    font-size: ${({ theme }) => theme.font.fontSize.title15};
    font-weight: ${({ theme }) => theme.font.fontWeight.semiBold};
    line-height: ${({ theme }) => theme.font.lineHeight.normal};

    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .place {
    color: ${({ theme }) => theme.colors.gray7};
    font-size: ${({ theme }) => theme.font.fontSize.label12};
    font-weight: ${({ theme }) => theme.font.fontWeight.medium};
    line-height: ${({ theme }) => theme.font.lineHeight.normal};
  }
`;
const CodeArea = styled.div`
  width: 100%;
  display: flex;
  gap: 4px;
  align-items: center;
  justify-content: end;

  .grenBg {
    display: flex;

    align-items: center;
    padding: 3px 6px;

    background-color: #d4f7c6;
    color: ${({ theme }) => theme.colors.Primary60};
    font-size: ${({ theme }) => theme.font.fontSize.label12};
    font-weight: ${({ theme }) => theme.font.fontWeight.medium};
    line-height: ${({ theme }) => theme.font.lineHeight.normal};
  }

  .code {
    color: ${({ theme }) => theme.colors.Primary50};
    font-size: ${({ theme }) => theme.font.fontSize.title15};
    font-weight: ${({ theme }) => theme.font.fontWeight.semiBold};
    line-height: ${({ theme }) => theme.font.lineHeight.normal};
  }
  button {
    display: flex;
    padding: 3px 6px;
    justify-content: center;
    align-items: center;
    border: 0.7px solid ${({ theme }) => theme.colors.gray6};
    border-radius: 3px;

    color: ${({ theme }) => theme.colors.gray7};
    font-size: ${({ theme }) => theme.font.fontSize.label12};
    font-weight: ${({ theme }) => theme.font.fontWeight.regular};
    line-height: ${({ theme }) => theme.font.lineHeight.normal};
  }
`;
const ImgWrapper = styled.div`
  position: relative;
  width: 92px;
  height: 130px;
  background-color: ${({ theme }) => theme.colors.gray2};

  img {
    width: 100%;
    height: 100%;
    border-radius: 3px;
    object-fit: contain;
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
