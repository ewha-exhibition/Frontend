import styled from "styled-components";
import { useState } from "react";

import Topbar from "../../components/Topbar";
import EnrollStepOne from "./EnrollStepOne";
import EnrollStepTwo from "./EnrollStepTwo";

//NOTE: 등록하기 버튼 추가 예정
//REVIEW: 회색 정보 박스 위치가 애매함, 고정하긴 했는데...

export default function EnrollEvent() {
  const [step, setStep] = useState(1);
  const handleNextStep = () => {
    setStep((prev) => (prev === 1 ? 2 : 1));
  };
  return (
    <Container>
      <Topbar title={""} icon={"none"} />
      <Header>
        <ProgressBar>
          <LongBar />
          <ShortBar $step={step} />
        </ProgressBar>
        <Step>
          <Label $active={step === 1}>기본정보</Label>
          <Label $active={step === 2}>상세설명</Label>
        </Step>
      </Header>

      <Content>
        {step === 1 && (
          <>
            <EnrollStepOne />
            <NextButton onClick={handleNextStep}>다음으로</NextButton>
          </>
        )}
        {step === 2 && <EnrollStepTwo />}
      </Content>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  padding-top: 46px;

  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const ProgressBar = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px 98px;
`;

const LongBar = styled.div`
  width: 178px;
  height: 6px;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.gray3};
  z-index: -1;
`;

const ShortBar = styled.div`
  width: 90px;
  height: 6px;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.Primary50};
  position: absolute;
  left: ${({ $step }) => ($step === 1 ? "98px" : "187px")};
`;

const Step = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const Label = styled.p`
  width: 89px;
  ${({ theme }) => theme.textStyles.label2Medium};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.Primary50 : theme.colors.gray3};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 16px 20px 105px 20px;
`;

const NextButton = styled.button`
  display: flex;
  width: 100%;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  ${({ theme }) => theme.textStyles.label0SemiBold};
  background-color: ${({ theme }) => theme.colors.Primary50};
  color: ${({ theme }) => theme.colors.white};
`;
