import styled from "styled-components";

import useCustomFetch from "../../utils/hooks/useCustomFetch";

import Topbar from "../../components/Topbar";
import WatchedHis from "../../components/myPage/WatchedHis";

import poster1 from "../../assets/mock/poster1.jpg";
import poster2 from "../../assets/mock/poster2.jpg";
import poster3 from "../../assets/mock/poster3.jpg";
import poster4 from "../../assets/mock/poster4.jpg";

function Watched() {

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
