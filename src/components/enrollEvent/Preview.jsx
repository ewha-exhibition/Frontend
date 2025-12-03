import styled from "styled-components";
import TopBar from "../components/Topbar";

// Detail 페이지에서 쓰는 아이콘들 그대로
import locationIcon from "../assets/icons/Location.svg";
import ticketIcon from "../assets/icons/Ticket.svg";
import userIcon from "../assets/icons/User.svg";
import CalenderIcon from "../assets/icons/Calender.svg?react";
import clockIcon from "../assets/icons/Clock.svg";

export default function PreviewModeDetail({ detail, onBack }) {
  return (
    <Container>
      <TopBar title={null} icon="Back" onClick={onBack} />

      {/* HEADER */}
      <Header>
        <img className="img" src={detail.posterUrl} alt={detail.title} />
        <h1 className="h1">{detail.title}</h1>

        <Summary>
          <div className="div">
            <img className="svgIcon" src={locationIcon} alt="장소" />
            <p className="p">{detail.place}</p>
          </div>

          <div className="div">
            <img className="svgIcon" src={ticketIcon} alt="가격" />
            <p className="p">{detail.price}</p>
          </div>

          <div className="div">
            <img className="svgIcon" src={userIcon} alt="주최" />
            <p className="p">{detail.clubName}</p>
          </div>

          <div className="div">
            <CalenderIcon width={18} height={18} color="#57B190" />
            <p className="p">{detail.period}</p>
          </div>

          <div className="div">
            <img className="svgIcon" src={clockIcon} alt="시간" />
            <p className="p">{detail.duration}</p>
          </div>
        </Summary>
      </Header>

      <DetailSection>
        <p className="p">{detail.content}</p>

        {detail.images?.map((img, idx) => (
          <img className="img" key={idx} src={img} alt={`preview-${idx}`} />
        ))}
      </DetailSection>
    </Container>
  );
}

/* ========= styled-components ========= */

const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding-top: 46px;
  background: ${({ theme }) => theme.colors.gray1};
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 20px 20px 20px;
  gap: 20px;

  .img {
    width: 200px;
    height: auto;
    border-radius: 3px;
    object-fit: cover;
  }

  .h1 {
    ${({ theme }) => theme.textStyles.headline1Bold};
    text-align: center;
  }
`;

const Summary = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 15px;
  gap: 8px;
  border-radius: 8px;
  border: 0.5px solid ${({ theme }) => theme.colors.gray5};
  background-color: ${({ theme }) => theme.colors.white};

  .div {
    display: flex;
    gap: 10px;
    align-items: center;
  }
  .svgIcon {
    width: 18px;
    height: 18px;
  }
  .p {
    ${({ theme }) => theme.textStyles.label2Medium};
    color: ${({ theme }) => theme.colors.gray10};
  }
`;

const DetailSection = styled.div`
  padding: 19px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  .p {
    ${({ theme }) => theme.textStyles.body1Regular};
    white-space: pre-wrap;
  }

  .img {
    width: 100%;
    max-width: 335px;
    border-radius: 4px;
  }
`;
