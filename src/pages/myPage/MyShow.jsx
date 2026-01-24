import styled from "styled-components";
import { useState } from "react";

import useCustomFetch from "../../utils/hooks/useCustomFetch";

import Topbar from "../../components/Topbar";
import ShowItem from "../../components/myPage/ShowItem";
import ConfirmModal from "../../components/myPage/CheckModal";

function MyShow() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalText, setModalText] = useState("");

  const { data: myShowData, error, loading } = useCustomFetch(`/hosts`);
  console.log(myShowData?.data);

  const handleCopySuccess = (type) => {
    if (type === "code") {
      setModalText("초대코드 복사 완료");
    }
    if (type === "url") {
      setModalText("URL 복사 완료");
    }
    setIsOpen(true);
  };

  return (
    <Container>
      {isOpen && (
        <ConfirmModal message={modalText} onClose={() => setIsOpen(false)} />
      )}

      <Topbar title={"내 공연/전시"} icon={null} />

      <Content>
        {myShowData?.data.exhibitions.map((data) => (
          <ShowItem
            key={data.exhibitionId}
            exhibitionId={data.exhibitionId}
            title={data.exhibitionName}
            date={data.date}
            startDate={data.startDate}
            endDate={data.endDate}
            place={data.place}
            poster={data.posterUrl}
            onGoing={data.status}
            code={data.code}
            link={data.link}
            onCopySuccess={handleCopySuccess}
          />
        ))}
        <Noti>
          <p>초대코드란?</p>
          <ul>
            <li>
              공연/전시 홍보글을 등록한 사람에게 주어지는 공유용 코드예요.
            </li>
            <li>
              초대코드를 입력하면 글 등록자와 같은 권한(글 수정, 삭제, 대댓글
              작성 등)을 가질 수 있어요.
            </li>
          </ul>
        </Noti>
      </Content>
    </Container>
  );
}

export default MyShow;

const Container = styled.div`
  min-height: 100vh;
  width: 100vw;
  padding-top: 46px;

  display: flex;
  flex-direction: column;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px;
`;
const Noti = styled.div`
  height: 162px;
  padding: 10px;
  margin: 14px 0;

  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.Primary5};

  display: flex;
  flex-direction: column;
  justify-content: center;

  p {
    color: ${({ theme }) => theme.colors.SubColor2};
    font-size: ${({ theme }) => theme.font.fontSize.title15};
    font-weight: ${({ theme }) => theme.font.fontWeight.regular};
    line-height: ${({ theme }) => theme.font.lineHeight.normal};
    margin-bottom: 12px;
  }

  ul {
    list-style-position: outside;
    list-style-type: disc;
    padding-inline-start: 20px;
    margin: 0px;
  }

  li {
    color: ${({ theme }) => theme.colors.gray7};
    font-size: ${({ theme }) => theme.font.fontSize.body14};
    font-weight: ${({ theme }) => theme.font.fontWeight.regular};
    line-height: ${({ theme }) => theme.font.lineHeight.normal};
  }
  li::marker {
    font-size: 0.8em;
  }
`;
