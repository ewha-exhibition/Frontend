import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useCustomFetch from "../../utils/hooks/useCustomFetch";

import Topbar from "../../components/Topbar";
import BottomBtn from "../../components/buttons/BottomBtn";
import ConfirmModal from "../../components/myPage/CheckModal";

function EnterCode() {
  const navigate = useNavigate();
  const { fetchData } = useCustomFetch();

  const [code, setCode] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const isActivated = code.length === 8;

  const handleSubmit = async () => {
    if (!isActivated) return;

    try {
      const { data, error } = await fetchData(
        `/hosts/join?code=${code}`,
        "POST"
      );

      if (error) {
        console.log("초대코드 요청 오류:", error?.response.data);
        setIsOpen(true);
        return;
      }
      console.log("응답 데이터:", data);
      alert("초대코드 등록이 완료되었습니다!");
      navigate("/mypage/enterCode");
    } catch (err) {
      console.error("예상치 못한 에러:", err);
      alert("오류가 발생했습니다.");
    }
  };

  return (
    <Container>
      {isOpen && (
        <ConfirmModal
          message={"올바른 초대 코드가 아니에요 \n다시 한 번 확인해 주세요"}
          onClose={() => setIsOpen(false)}
        />
      )}

      <Topbar title={"초대코드 입력하기"} icon={"none"} />
      <Content>
        <SubTitle>공연/전시 초대코드를 입력해 주세요.</SubTitle>
        <CustomInput>
          <input
            placeholder="8자리 코드 입력"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            maxLength={8}
          />
        </CustomInput>
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
        <BottomBtn
          activated={isActivated}
          text={"확인"}
          onClick={handleSubmit}
        />
      </Content>
    </Container>
  );
}

export default EnterCode;

const Container = styled.div`
  width: 100%;
  min-height: calc(100vh - 90px);
  padding-top: 46px;
`;
const Content = styled.div`
  padding: 26px 20px;

  display: flex;
  flex-direction: column;
  gap: 12px;
`;
const SubTitle = styled.div`
  color: ${({ theme }) => theme.colors.gray9};
  font-size: ${({ theme }) => theme.font.fontSize.label16};
  font-weight: ${({ theme }) => theme.font.fontWeight.semiBold};
  line-height: ${({ theme }) => theme.font.lineHeight.normal};
`;
const CustomInput = styled.div`
  height: 56px;
  padding: 18px 25px;
  border: 1px solid ${({ theme }) => theme.colors.gray5};
  border-radius: 6px;

  input {
    width: 100%;
    height: 100%;
    border: none;

    color: ${({ theme }) => theme.colors.Primary50};
    font-size: ${({ theme }) => theme.font.fontSize.title15};
    font-weight: ${({ theme }) => theme.font.fontWeight.semiBold};
    line-height: ${({ theme }) => theme.font.lineHeight.normal};
    text-align: right;
  }
  input::placeholder {
    color: ${({ theme }) => theme.colors.gray6};
    font-size: ${({ theme }) => theme.font.fontSize.title15};
    font-weight: ${({ theme }) => theme.font.fontWeight.medium};
    line-height: ${({ theme }) => theme.font.lineHeight.normal};
    text-align: right;
  }
  input:focus {
    outline: none;
  }
`;
const Noti = styled.div`
  height: 162px;
  padding: 20px 15px;
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
