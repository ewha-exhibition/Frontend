import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Topbar from "../../components/Topbar";
import usePostExhibition from "../../utils/hooks/usePostExhibition";
import NeedLogin from "../../components/home/NeedLogin";
import EnrollStepOne from "./EnrollStepOne";
import EnrollStepTwo from "./EnrollStepTwo";

//TODO: 등록 성공 모달
//TODO: 등록하기 버튼 색 변경

export default function EnrollEvent() {
  const navigate = useNavigate();

  const [login, setLogin] = useState(!!localStorage.getItem("accessToken"));

  const [step, setStep] = useState(1);
  const [isNextActive, setIsNextActive] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    isFree: false,
    noTicket: false,
  });

  // Step2 데이터
  const [detailText, setDetailText] = useState("");
  const [detailImages, setDetailImages] = useState([]);
  const handleNextStep = () => {
    // 필수값 검증
    const {
      category,
      exhibitionName,
      place,
      startDate,
      startTime,
      clubName,
      price,
    } = stepOneData;

    if (
      !category ||
      !exhibitionName ||
      !place ||
      !startDate ||
      !startTime ||
      !clubName ||
      price === ""
    ) {
      alert("필수 정보를 모두 입력해주세요.");
      return;
    }

    setStep(2);
    window.scrollTo(0, 0); // 스크롤 최상단으로 이동
  };

  const goBack = () => {
    if (step === 1) navigate(-1);
    if (step === 2 && previewMode) {
      setPreviewMode(false);
      return;
    }
    if (step === 2) setStep(1);
  };

  // 등록하기
  const handleSubmit = async () => {
    if (isSubmitting) return;

    // 0. 이미지 업로드 진행 중 체크 (blob URL이 남아있으면 아직 S3 업로드 중)
    const hasPendingUploads = detailImages.some((url) =>
      url.startsWith("blob:"),
    );
    if (hasPendingUploads) {
      alert("이미지 업로드 중입니다. 잠시 후 다시 시도해주세요.");
      return;
    }

    // 1. 동아리 이름 검증 (빈 값이면 아예 요청 안 보냄)
    if (!stepOneData.clubName.trim()) {
      alert("동아리 이름을 입력해주세요.");
      return;
    }

    // 2. 가격 데이터 처리 (숫자만 남기기)
    let priceInt = 0;
    if (stepOneData.price !== "무료" && stepOneData.price) {
      const priceStr = stepOneData.price.toString().replace(/[^0-9]/g, "");
      priceInt = priceStr ? parseInt(priceStr, 10) : 0;
    }

    // 3. 날짜 변환 (. -> -)
    const formatDate = (dateStr) =>
      dateStr ? dateStr.replaceAll(".", "-") : "";
    const finalStartDate = formatDate(stepOneData.startDate);
    const finalEndDate = stepOneData.endDate
      ? formatDate(stepOneData.endDate)
      : finalStartDate;

    // 4. 시간 변환 (07:30 -> 07:30:00) 초 단위
    const formatTime = (timeStr) => {
      if (!timeStr) return "00:00:00"; // 값이 없으면 기본값
      let [hour, minute] = timeStr.split(":");
      hour = hour.padStart(2, "0");
      minute = minute ? minute.padEnd(2, "0") : "00";
      return `${hour}:${minute}:00`; // :00 초 단위 추가
    };

    // 5. 카테고리 매핑 (한글 -> 영어)
    const categoryMap = {
      공연: "PERFORMANCE",
      전시: "EXHIBITION",
      기타: "ETC",
    };
    const finalCategory =
      categoryMap[stepOneData.category] ?? stepOneData.category;

    // 6. 이미지 데이터 처리
    const formattedImages = detailImages.map((url, index) => ({
      url: url,
      sequence: index + 1,
    }));

    // 최종 Body 구성
    const body = {
      exhibition: {
        exhibitionName: stepOneData.exhibitionName,
        posterUrl: stepOneData.posterUrl || null,
        place: stepOneData.place,
        startDate: finalStartDate,
        endDate: finalEndDate,
        startTime: formatTime(stepOneData.startTime),
        endTime: formatTime(stepOneData.endTime),
        dateException: stepOneData.dateException || "",
        price: priceInt,
        link: stepOneData.link || "",
        content: detailText || "",
        category: finalCategory,
      },
      club: {
        name: stepOneData.clubName,
      },
      images: formattedImages,
    };

    setIsSubmitting(true);
    try {
      const res = await createExhibition(body);

      if (res?.success) {
        alert("등록 성공!");
        navigate("/");
      } else {
        // 서버가 주는 에러 메시지 확인
        console.error("서버 에러 응답:", res);
        alert(
          `등록 실패: ${res?.message || res?.reason || "서버 내부 오류(500)"}`,
        );
      }
    } catch (error) {
      console.error("네트워크 에러:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      {!login && (
        <NeedLogin onClose={() => navigate("/")}>
          <p>카카오톡으로 간편 로그인하고</p>
          <p>모든 기능을 이용해보세요!</p>
        </NeedLogin>
      )}
      {step == 1 ? (
        <Topbar title={""} icon={null} />
      ) : (
        <Topbar
          title={""}
          icon={"EnrollEvent"}
          onClick={handleSubmit}
          disabled={isSubmitting}
        />
      )}
      <PreStep onClick={goBack} />
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
      <Content $step={step}>
        {step === 1 && (
          <>
            <EnrollStepOne
              data={stepOneData}
              setData={setStepOneData}
              setIsNextActive={setIsNextActive}
            />
            <NextButton
              disabled={!isNextActive}
              $isActive={isNextActive}
              onClick={handleNextStep}
            >
              다음으로
            </NextButton>
          </>
        )}

        {step === 2 && (
          <EnrollStepTwo
            text={detailText}
            setText={setDetailText}
            pictures={detailImages}
            setPictures={setDetailImages}
            onSubmit={handleSubmit}
            stepOneData={stepOneData}
            previewMode={previewMode}
            setPreviewMode={setPreviewMode}
          />
        )}
      </Content>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  padding-top: 46px;
  background-color: white;

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
  margin: ${({ $step }) => ($step === 2 ? "0" : "16px 20px 105px 20px")};
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
  background-color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.Primary50 : theme.colors.gray3};

  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.white : theme.colors.gray6};
`;

const PreStep = styled.button`
  position: absolute;
  top: 16px;
  left: 16px;
  z-index: 111;
  width: 24px;
  height: 24px;
  background: transparent;
  border: none;
  outline: none;
`;
