import { useState } from "react";
import styled from "styled-components";
import TopBar from "../components/Topbar";
//import BottomBar from "../components/Bottombar";
import poster from "../assets/mock/poster1.jpg";
import locationIcon from "../assets/icons/Location.svg";
import ticketIcon from "../assets/icons/Ticket.svg";
import userIcon from "../assets/icons/User.svg";
import calenderIcon from "../assets/icons/Calender.svg";
import clockIcon from "../assets/icons/Clock.svg";
//poster, title
//info: icon + explain
//category: title + (count)
//ongoing + price -> 하단바 결정
//hook: count, selected(default = "상세정보"), scrap

// function BottomBar({ isOnGoing, isFree }) {
//   return (
//     <Container>
//       <Poster poster={poster}>
//         <Overlay />
//         <Bar>
//           <Rank>{rank}</Rank>
//           <BookmarkIcon width={16} height={19} />
//         </Bar>
//       </Poster>
//       <Title>{title}</Title>
//     </Container>
//   );
// }
export default function Detail() {
  const [currentCategory, setCurrentCategory] = useState("detail");
  // 더미 데이터 (추후 API 연동)
  const categories = [
    { key: "detail", label: "상세정보" },
    { key: "question", label: "질문", count: 3 },
    { key: "cheer", label: "응원", count: 5 },
    { key: "review", label: "후기", count: 0 },
  ];
  const mock_data = {
    id: 1,
    title: "이화여대 섬유예술 전공 졸업전시 2023 “Weave Our Way”",
    place: "이화여대 조형예술관 A동 4층",
    price: 0,
    host: "섬유예술전공",
    date: "2025.06.13~06.25",
    time: "9:00-16:00",
    poster: poster,
    explain:
      "뮤지컬 동아리 뮤랩 3번째 정기공연에 초대합니다! 내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용",
    images: [
      { id: 1, img: poster },
      { id: 2, img: poster },
      { id: 3, img: poster },
    ],
    scraped: false,
    onGoing: true,
  };
  return (
    <Container>
      <TopBar title={null} icon={"Link"} />
      <Header>
        <img className="img" src={mock_data.poster} alt={mock_data.title} />
        <h1 className="h1">{mock_data.title}</h1>
        <Summary>
          <div className="div">
            <img className="img" src={locationIcon} alt={"위치"} />
            <p className="p">{mock_data.place}</p>
          </div>
          <div className="div">
            <img className="img" src={ticketIcon} alt={"가격"} />
            <p className="p">
              {mock_data.price === 0 ? "무료" : mock_data.price}
            </p>
          </div>
          <div className="div">
            <img className="img" src={userIcon} alt={"주최"} />
            <p className="p">{mock_data.host}</p>
          </div>
          <div className="div">
            <img className="img" src={calenderIcon} alt={"날짜"} />
            <p className="p">{mock_data.date}</p>
          </div>
          <div className="div">
            <img className="img" src={clockIcon} alt={"시간"} />
            <p className="p">{mock_data.time}</p>
          </div>
        </Summary>
      </Header>
      <Categories>
        {categories.map(({ key, label, count }) => (
          <Category
            key={key}
            isSelected={currentCategory === key}
            onClick={() => setCurrentCategory(key)}
          >
            <p>{label}</p>
            {count > 0 && <span>&nbsp;({count})</span>}
          </Category>
        ))}
      </Categories>
      <Content>
        <p className="p">
          {mock_data.explain} <br /> <br />
        </p>
        {mock_data.images?.map((image) => (
          <img className="img" key={image.id} src={image.img} />
        ))}
      </Content>
      {/* <Bottombar isOnGoing={mock_data.onGoing} isFree={mock_data.price === 0} /> */}
    </Container>
  );
}

// styled-components 예시
const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

//CHECK: 가로형 포스터
const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 0px 20px 0px 20px;
  gap: 20px;
  .img {
    width: 200px;
    height: auto;
  }
  .h1 {
    ${({ theme }) => theme.textStyles.headline1Bold};
    text-align: left;
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
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.06);
  .div {
    display: flex;
    flex-direction: row;
    gap: 10px;
  }
  .img {
    width: 18px;
    height: 18px;
  }
  .p {
    ${({ theme }) => theme.textStyles.label2Medium};
    color: ${({ theme }) => theme.colors.gray10};
  }
`;

const Categories = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 24px;
  padding: 0 20px;
  justify-content: space-between;
`;

//TODO: 피그마(600) - 브라우저(500) 폰트 굵기 차이
const Category = styled.div`
  display: inline-flex;
  padding: 7.5px 8px;
  font-family: SUIT;
  font-size: 15px;
  font-weight: 600;
  line-height: 135%;
  color: ${({ isSelected, theme }) =>
    isSelected ? theme.colors.blackMain : theme.colors.gray6};
  border-bottom: ${({ isSelected, theme }) =>
    isSelected ? `solid 1.5px ${theme.colors.gray10}` : "none"};
`;

const Content = styled.div`
  padding: 19px 19px 128px 19px;
  background: ${({ theme }) => theme.colors.gray1};
  gap: 8px;
  .div {
  }
  .p {
    ${({ theme }) => theme.textStyles.body1Regular};
  }
  .img {
    width: 335px;
    height: auto;
  }
`;
