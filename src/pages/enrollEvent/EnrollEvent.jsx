import styled from "styled-components";
import { useState } from "react";

import Topbar from "../../components/Topbar";
import usePostExhibition from "../../utils/hooks/usePostExhibition";
import useTestLogin from "../../utils/hooks/useTestLogin";
import EnrollStepOne from "./EnrollStepOne";
import EnrollStepTwo from "./EnrollStepTwo";

export default function EnrollEvent() {
  const [step, setStep] = useState(1);

  const { token } = useTestLogin(1);
  const { createExhibition } = usePostExhibition();

  // Step1 데이터
  const [stepOneData, setStepOneData] = useState({
    category: "",
    exhibitionName: "",
    posterUrl: "",
    place: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    dateException: "",
    price: "",
    link: "",
    clubName: "",
  });

  // Step2 데이터
  const [detailText, setDetailText] = useState("");
  const [detailImages, setDetailImages] = useState([]);

  const handleNextStep = () => {
    console.log("STEP BEFORE:", step);
    setStep(2);
    console.log("STEP AFTER (won’t update immediately):", step);
  };

  const handleSubmit = async () => {
    const body = {
      exhibition: {
        exhibitionName: stepOneData.exhibitionName,
        posterUrl: stepOneData.posterUrl,
        place: stepOneData.place,
        startDate: stepOneData.startDate,
        endDate: stepOneData.endDate,
        startTime: stepOneData.startTime,
        endTime: stepOneData.endTime,
        dateException: stepOneData.dateException,
        price: Number(stepOneData.price),
        link: stepOneData.link,
        content: detailText,
        category: stepOneData.category,
      },
      club: {
        name: stepOneData.clubName,
      },
      images: detailImages.map((url, index) => ({
        url,
        sequence: index,
      })),
    };

    const res = await createExhibition({ ...body, token });

    if (res?.success) {
      alert("전시 등록 성공!");
    } else {
      alert(res?.reason || "등록 실패");
    }
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
            <EnrollStepOne data={stepOneData} setData={setStepOneData} />
            <NextButton onClick={handleNextStep}>다음으로</NextButton>
          </>
        )}

        {step === 2 && (
          <EnrollStepTwo
            text={detailText}
            setText={setDetailText}
            pictures={detailImages}
            setPictures={setDetailImages}
            onSubmit={handleSubmit}
          />
        )}
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
  max-width: 380px;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  ${({ theme }) => theme.textStyles.label0SemiBold};
  background-color: ${({ theme }) => theme.colors.Primary50};
  color: ${({ theme }) => theme.colors.white};
`;
