import styled from "styled-components";
import Topbar from "../components/Topbar";
import Bottombar from "../components/Bottombar";
import poster1 from "../assets/mock/poster1.jpg";
//poster, title
//info: icon + explain
//category: title + (count)
//ongoing + price -> 하단바 결정
//hook: count, selected(default = "상세정보"), scrap

export default function Detail() {
  // 더미 데이터 (추후 API 연동)
  const counts = { question: 3, cheer: 10, review: 5 };
  const mock_data = { price: 10000, isOnGoing: true };

  return (
    <Container>
      <Topbar title={null} icon={"Link"} />
      <Header>
        <Poster />
        <Title />
        <Summary>
          <div>
            <img src={""} alt={"위치"} />
            <p>{mock_data.location}</p>
          </div>
          <div>
            <img src={""} alt={"가격"} />
            <p>{mock_data.price}</p>
          </div>
          <div>
            <img src={""} alt={"주최"} />
            <p>{mock_data.host}</p>
          </div>
          <div>
            <img src={""} alt={"날짜"} />
            <p>{mock_data.date}</p>
          </div>
          <div>
            <img src={""} alt={"시간"} />
            <p>{mock_data.time}</p>
          </div>
          <Info />
        </Summary>
      </Header>
      <Categories>
        <Category>
          <p>상세정보</p>
        </Category>
        <Category>
          <p>질문</p>
          {counts.question > 0 && <p>({counts.question})</p>}
        </Category>
        <Category>
          <p>응원</p>
          {counts.question > 0 && <p>({counts.cheer})</p>}
        </Category>
        <Category>
          <p>후기</p>
          {counts.question > 0 && <p>({counts.review})</p>}
        </Category>
      </Categories>
      <Content>
        <p>설명</p>
        {mock_data?.result?.map((data) => (
          <img key={data.id} scr={data.image} />
        ))}
      </Content>
      <Bottombar
        isOnGoing={mock_data.isOnGoing}
        isFree={mock_data.price === 0}
      />
    </Container>
  );
}
// styled-components 예시
const Container = styled.div``;
const Header = styled.div``;
const Poster = styled.img``;
const Title = styled.h1``;
const Summary = styled.div``;
const Info = styled.div``;
const Categories = styled.div``;
const Category = styled.div``;
const Content = styled.div``;
