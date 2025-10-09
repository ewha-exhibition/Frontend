import styled from "styled-components";
import { useState } from "react";

import Topbar from "../../components/Topbar";
import BottomBtn from "../../components/buttons/BottomBtn";

function EnterCode() {
  const [code, setCode] = useState("");
  const isActivated = code.length === 8;

  return (
    <Container>
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
          <li>처음 홍보글을 등록한 사용자에게 부여되는 코드</li>
          <li>초대코드 입력 시 등록자와 똑같은 주최자 권한 부여</li>
          <li>
            주최자 권한 = 홍보글 수정 및 삭제, 홍보글에 달린 질문/응원/후기에
            댓글을 작성 가능
          </li>
        </Noti>
        <BottomBtn activated={isActivated} text={"확인"} />
      </Content>
    </Container>
  );
}

export default EnterCode;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
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

  li {
    color: ${({ theme }) => theme.colors.gray7};
    font-size: ${({ theme }) => theme.font.fontSize.body14};
    font-weight: ${({ theme }) => theme.font.fontWeight.regular};
    line-height: ${({ theme }) => theme.font.lineHeight.normal};
    list-style-position: inside;

    //그냥 li 태그 쓰면 디자인이 다르게 나옴
  }
`;
