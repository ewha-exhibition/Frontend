import styled from "styled-components";

import CheeringItem from "../../components/guestBook/CheeringItem";

import poster1 from "../../assets/mock/poster1.jpg";
import poster2 from "../../assets/mock/poster2.jpg";
import poster3 from "../../assets/mock/poster3.jpg";

function Cheering() {
  const mockData = {
    status: 200,
    result: [
      {
        poster: poster1,
        title: "2025 조형예술대학 메이데이 전시",
        id: 1,
        review:
          "기대평기대평기대평기대평기대평기대평기대평기대평기대평기대평기대평기대평기대평기대평기대평기대평",
        pic: [{ src: poster1 }, { src: poster2 }, { src: poster3 }],
      },
      {
        poster: poster2,
        title: "연극동아리 공연 “너를 걸어가는 시간",
        id: 2,
        review:
          "기대평기대평기대평기대평기대평기대평기대평기대평기대평기대평기대평기대평기대평기대평기대평기대평기대평기대평기대평기대평기대평기대평기대평기대평기대평기대평기대평기대평기대평기대평기대평기대평",
        pic: [],
      },
      {
        poster: poster3,
        title: "2025 조형예술대학 메이데이 전시",
        id: 3,
        review:
          "퀄리티 대박! 너무 알찬 전시 잘 구경하고 갑니다! 무료 굿즈도 너무 감사합니다~ 금손벗들 졸업 축하드려요~ ",
        pic: [
          { src: poster1 },
          { src: poster2 },
          { src: poster3 },
          { src: poster3 },
        ],
      },
    ],
  };

  return (
    <Container>
      {mockData?.result.map((data) => (
        <CheeringItem
          key={data.id}
          poster={data.poster}
          title={data.title}
          id={data.id}
          review={data.review}
          pic={data.pic}
        />
      ))}
    </Container>
  );
}

export default Cheering;

const Container = styled.div``;
