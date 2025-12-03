import styled from "styled-components";

import useCustomFetch from "../../utils/hooks/useCustomFetch";

import Topbar from "../../components/Topbar";
import WatchedHis from "../../components/myPage/WatchedHis";

import poster1 from "../../assets/mock/poster1.jpg";
import poster2 from "../../assets/mock/poster2.jpg";
import poster3 from "../../assets/mock/poster3.jpg";
import poster4 from "../../assets/mock/poster4.jpg";

function Watched() {
  const mock_data = {
    response: 200,
    result: [
      {
        id: 1,
        title: "Pile up strands - 섬유예술 전공 과제전시회 어쩌고저쩌고 텍스트",
        date: "2025.11.20-12.01",
        place: "이화여대 조형예술관 A동  2,4층",
        poster: poster1,
        haveReview: false,
        onGoing: true,
      },
      {
        id: 2,
        title: "Pile up strands - 섬유예술 전공 과제전시회",
        date: "2025.09.10-09.11",
        place: "이화여대 조형예술관 A동  2,4층",
        poster: poster2,
        haveReview: true,
        onGoing: false,
      },
      {
        id: 3,
        title: "Pile up strands - 섬유예술 전공 과제전시회",
        date: "2025.11.20-12.01",
        place: "이화여대 조형예술관 A동  2,4층",
        poster: poster3,
        haveReview: true,
        onGoing: true,
      },
      {
        id: 4,
        title: "Pile up strands - 섬유예술 전공 과제전시회",
        date: "2025.11.20-12.01",
        place: "이화여대 조형예술관 A동  2,4층",
        poster: poster4,
        haveReview: false,
        onGoing: false,
      },
    ],
  };

  const {
    data: myWatchedData,
    error,
    loading,
  } = useCustomFetch(`/scraps/viewed?pageNum=0&limit=10`);

  console.log(myWatchedData?.data.exhibitions);

  return (
    <Container>
      <Topbar title={"관람 내역"} icon={"none"} />
      <Content>
        {myWatchedData?.data.exhibitions.map((data) => (
          <WatchedHis
            key={data.exhibitionId}
            exhibitionId={data.exhibitionId}
            title={data.exhibitionName}
            startDate={data.startDate}
            endDate={data.endDate}
            place={data.place}
            poster={data.posterUrl}
            haveReview={data.reviewed}
          />
        ))}
      </Content>
    </Container>
  );
}

export default Watched;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding-top: 46px;

  display: flex;
  flex-direction: column;
`;
const Content = styled.div`
  padding: 0px 20px 0px 20px;
`;
