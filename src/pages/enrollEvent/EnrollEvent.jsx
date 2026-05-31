import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useLogin from "../../utils/hooks/useLogin";
import useCustomFetch from "../../utils/hooks/useCustomFetch";

import Topbar from "../../components/Topbar";
import usePostExhibition from "../../utils/hooks/usePostExhibition";
import NeedLogin from "../../components/home/NeedLogin";

import CodeModal from "../../components/myPage/CodeModal";

import EnrollStepOne from "./EnrollStepOne";
import EnrollStepTwo from "./EnrollStepTwo";

//TODO: 등록하기 버튼 색 변경

export default function EnrollEvent() {
  const navigate = useNavigate();
  const { fetchData } = useCustomFetch();
  const { createExhibition } = usePostExhibition();

  const login = useLogin();

  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [isNextActive, setIsNextActive] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [text, setText] = useState("");
  const [pictures, setPictures] = useState([]);

  const toMyShow = () => {
    navigate("/mypage/myShows");
  };

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

  const uploadAllImages = async () => {
    if (pictures.length === 0) return [];

    const s3Urls = [];

    for (let i = 0; i < pictures.length; i++) {
      try {
        const res = await fetchData(`/exhibition/images`, "GET");
        const presignedUrl = res?.data?.data?.url;

        if (presignedUrl) {
          const rawFile = pictures[i].file;

          await fetch(presignedUrl, {
            method: "PUT",
            body: rawFile,
            headers: {
              "Content-Type": rawFile.type,
            },
          });

          const cleanUrl = presignedUrl.split("?")[0];
          s3Urls.push(cleanUrl);
        } else {
          console.error(`[${i}] Presigned URL 발급 실패`, res);
        }
      } catch (error) {
        console.error(`[${i}] 이미지 업로드 중 에러 발생:`, error);
        throw error;
      }
    }

    return s3Urls;
  };

  const handleSubmit = async (e) => {
    if (e && typeof e.preventDefault === "function") {
      e.preventDefault();
    }

    if (isSubmitting) return;
    setIsSubmitting(true);

    let finalPayload = null;

    try {
      let finalS3Urls = [];
      if (pictures.length > 0) {
        finalS3Urls = await uploadAllImages();
      }

      let priceInt = 0;
      if (stepOneData.price !== "무료" && stepOneData.price) {
        const priceStr = stepOneData.price.toString().replace(/[^0-9]/g, "");
        priceInt = priceStr ? parseInt(priceStr, 10) : 0;
      }

      const categoryMap = {
        공연: "PERFORMANCE",
        전시: "EXHIBITION",
        기타: "ETC",
      };
      const finalCategory =
        categoryMap[stepOneData.category] ?? stepOneData.category;

      const formatDate = (dateStr) =>
        dateStr ? dateStr.replaceAll(".", "-") : "";
      const finalStartDate = formatDate(stepOneData.startDate);
      const finalEndDate = stepOneData.endDate
        ? formatDate(stepOneData.endDate)
        : finalStartDate;

      const formatTime = (timeStr) => {
        if (!timeStr) return "00:00:00"; // 값이 없으면 기본값
        let [hour, minute] = timeStr.split(":");
        hour = hour.padStart(2, "0");
        minute = minute ? minute.padEnd(2, "0") : "00";
        return `${hour}:${minute}:00`; // :00 초 단위 추가
      };
      const formattedImages = finalS3Urls.map((url, index) => ({
        url: url,
        sequence: index + 1,
      }));

      finalPayload = {
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
          content: text || "",
          category: finalCategory,
        },
        club: {
          name: stepOneData.clubName,
        },
        images: formattedImages,
      };
      console.log("Payload:", finalPayload);

      const response = await createExhibition(finalPayload);

      if (
        response &&
        response.status !== undefined &&
        response.status !== 200 &&
        response.status !== 201
      ) {
        throw new Error("서버 등록에 실패했습니다.");
      }
      setIsOpen(true);
    } catch (error) {
      console.error("전시회 등록 실패:", error);
      if (finalPayload) {
        console.log("실패 시점의 payload:", finalPayload);
      }
      alert("이미지 업로드 또는 이벤트 등록 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackClick = () => {
    if (previewMode) {
      setPreviewMode(false);
    } else if (step === 2) {
      setStep(1);
    } else {
      navigate(-1);
    }
  };

  if (!login) {
    return <NeedLogin />;
  }

  return (
    <Container>
      {isOpen && (
        <CodeModal
          onClose={() => setDoneModalOpen(false)}
          title="등록완료"
          buttonText={"내 공연/전시 바로가기"}
          buttonClick={toMyShow}
        >
          <p>작성한 글이 성공적으로 등록됐어요!</p>
        </CodeModal>
      )}

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
      <PreStep onClick={handleBackClick} />

      {!previewMode && (
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
      )}

      <Content $step={step}>
        {step === 1 ? (
          <>
            <EnrollStepOne
              data={stepOneData}
              setData={setStepOneData}
              setIsNextActive={setIsNextActive}
            />
            <NextButton
              disabled={!isNextActive}
              $isActive={isNextActive}
              onClick={() => setStep(2)}
            >
              다음
            </NextButton>
          </>
        ) : (
          <EnrollStepTwo
            text={text}
            setText={setText}
            pictures={pictures}
            setPictures={setPictures}
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
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding-top: 46px;
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

const StepContainer = styled.div`
  padding: 0px 20px;
  width: 100%;
  box-sizing: border-box;
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
