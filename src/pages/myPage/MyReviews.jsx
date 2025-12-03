import styled from "styled-components";

import Topbar from "../../components/Topbar";
import ReivewItem from "../../components/guestBook/ReviewItem";

import useCustomFetch from "../../utils/hooks/useCustomFetch";

import poster1 from "../../assets/mock/poster1.jpg";
import poster2 from "../../assets/mock/poster2.jpg";
import poster3 from "../../assets/mock/poster3.jpg";

function MyReviews() {
  const loginId = sessionStorage.getItem("memberId");
  const mockData = {
    status: 200,
    result: [
      {
        poster: poster1,
        title: "2025 조형예술대학 메이데이 전시",
        id: 1,
        memberId: 10,
        review:
          "퀄리티 대박! 너무 알찬 전시 잘 구경하고 갑니다! 무료 굿즈도 너무 감사합니다~ 금손벗들 졸업 축하드려요~  ",
        pic: [{ src: poster1 }, { src: poster2 }, { src: poster3 }],
      },
      {
        poster: poster2,
        title: "연극동아리 공연 “너를 걸어가는 시간",
        id: 2,
        memberId: 10,
        review:
          "연극 배우들의 연기가 실감 나서 감동했어요.연극 배우들의 연기가 실감 나서 감동했어요.연극 배우들의 연기가 실감 나서 감동했어요.연극 배우들의 연기가 실감 나서 감동했어요.연극 배우들의 연기가 실감 나서 감동했어요.연극 배우들의 연기가 실감 나서 감동했어요.",
        pic: [],
      },
      {
        poster: poster3,
        title: "2025 조형예술대학 메이데이 전시",
        id: 3,
        memberId: 10,
        review:
          "퀄리티 대박! 너무 알찬 전시 잘 구경하고 갑니다! 무료 굿즈도 너무 감사합니다~ 금손벗들 졸업 축하드려요~ ",
        pic: [
          { src: poster1 },
          { src: poster2 },
          { src: poster3 },
          { src: poster3 },
        ],
      },
      {
        poster: poster3,
        title: "2025 조형예술대학 메이데이 전시",
        id: 4,
        memberId: 10,
        review:
          "퀄리티 대박! 너무 알찬 전시 잘 구경하고 갑니다! 무료 굿즈도 너무 감사합니다~ 금손벗들 졸업 축하드려요~ ",
        pic: [{ src: poster1 }],
      },
      {
        poster: poster1,
        title: "2025 조형예술대학 메이데이 전시",
        id: 5,
        memberId: 10,
        review:
          "퀄리티 대박! 너무 알찬 전시 잘 구경하고 갑니다! 무료 굿즈도 너무 감사합니다~ 금손벗들 졸업 축하드려요~ ",
        pic: [{ src: poster1 }, { src: poster2 }],
      },
    ],
  };

  const {
    data: myReviewData,
    error,
    loading,
  } = useCustomFetch(`/reviews?pageNum=0&limit=10`);

  console.log(myReviewData?.data);

  return (
    <Container>
      <Topbar title={"작성한 후기"} icon={"none"} />
      <Content>
        {mockData?.result.map((data) => (
          <ReivewItem
            key={data.id}
            poster={data.poster}
            title={data.title}
            id={data.id}
            review={data.review}
            pic={data.pic}
            loginId={loginId}
            memberId={data.memberId}
          />
        ))}
      </Content>
    </Container>
  );
}

export default MyReviews;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding-top: 46px;

  display: flex;
  flex-direction: column;
`;
const Content = styled.div``;
