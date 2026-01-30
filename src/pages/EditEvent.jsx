import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Topbar from "../components/Topbar";
import {
  getExhibitionApi,
  updateExhibitionApi,
} from "../utils/apis/exhibition";
import EnrollStepOne from "./enrollEvent/EnrollStepOne";
import EnrollStepTwo from "./enrollEvent/EnrollStepTwo";

export default function EditExhibition() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isNextActive, setIsNextActive] = useState(false);
  const [originalData, setOriginalData] = useState(null); //원본 데이터 저장

  const [stepOneData, setStepOneData] = useState({
    category: "공연",
    exhibitionName: "",
    posterUrl: "",
    posterPreviewUrl: "",
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
  const [detailText, setDetailText] = useState("");
  const [detailImages, setDetailImages] = useState([]);

  // 초기 데이터 불러오기
  useEffect(() => {
    const fetchExhibitionData = async () => {
      try {
        const res = await getExhibitionApi(id);
        const data = res.data;
        const periodParts = data.period?.split(" - ") || ["", ""];
        const startDate = periodParts[0];
        const rawEndDate = periodParts[1] || "";
        const endDate =
          rawEndDate && !rawEndDate.includes(".")
            ? `${startDate.split(".")[0]}.${rawEndDate}`
            : rawEndDate;
        const durationParts = data.duration?.split(" - ") || ["", ""];
        const startTime = durationParts[0] || "";
        const endTime = durationParts[1] || "";
        const categoryMapRev = {
          PERFORMANCE: "공연",
          EXHIBITION: "전시",
          ETCETERA: "기타",
        };
        const mappedData = {
          category: categoryMapRev[data.category],
          exhibitionName: data.exhibitionName,
          posterUrl: data.posterUrl,
          posterPreviewUrl: data.posterUrl,
          place: data.place,
          startDate: startDate,
          endDate: endDate,
          startTime: startTime,
          endTime: endTime,
          dateException: data.dateException || "",
          price: data.price === "무료" ? "무료" : data.price.toString(),
          link: data.link || "",
          clubName: data.clubName || "",
          content: data.content || "",
          images:
            data.images?.map((img) => ({ id: img.id, url: img.url })) || [],
        };

        setStepOneData(mappedData);
        setDetailText(mappedData.content);
        setDetailImages(mappedData.images);
        setOriginalData(mappedData);
        console.log(data);
        console.log(mappedData);
      } catch (error) {
        alert("데이터를 불러오는데 실패했습니다.");
        navigate(-1);
      }
    };
    if (id) fetchExhibitionData();
  }, [id, navigate]);

  // 변경 데이터 추출
  const getChangedData = () => {
    const patchBody = {};
    // 가격
    const getPriceInt = (val) =>
      val === "무료" || val === ""
        ? 0
        : parseInt(val.toString().replace(/[^0-9]/g, ""), 10);
    // 시간 형식
    const getFullTime = (val) =>
      val && val.length === 5 ? `${val}:00` : val || "00:00:00";
    // 날짜 형식화
    const getHyphenDate = (val) => val?.replaceAll(".", "-") || "";

    const categoryMap = {
      공연: "PERFORMANCE",
      전시: "EXHIBITION",
      기타: "ETCETERA",
    };

    // 이미지
    const processedImages = detailImages.map((img, idx) => {
      const sequence = idx + 1;

      if (img.id) {
        // 기존 이미지: 변경된 값만 추출
        const originalImg = originalData.images.find((o) => o.id === img.id);
        const imageBody = { id: img.id };

        if (originalImg?.url !== img.url) imageBody.url = img.url;
        // 기존 이미지의 순서(index + 1)가 원본에서의 순서와 다른지 체크
        const originalIdx = originalData.images.findIndex(
          (o) => o.id === img.id,
        );
        if (originalIdx + 1 !== sequence) imageBody.sequence = sequence;

        return imageBody;
      } else {
        // 신규 이미지: id 제외하고 url, sequence만 포함
        return { url: img.url, sequence: sequence };
      }
    });

    const currentData = {
      category: categoryMap[stepOneData.category],
      exhibitionName: stepOneData.exhibitionName,
      posterUrl: stepOneData.posterUrl,
      place: stepOneData.place,
      startDate: getHyphenDate(stepOneData.startDate),
      endDate: getHyphenDate(stepOneData.endDate || stepOneData.startDate),
      startTime: getFullTime(stepOneData.startTime),
      endTime: getFullTime(stepOneData.endTime),
      dateException: stepOneData.dateException,
      price: getPriceInt(stepOneData.price),
      link: stepOneData.link,
      clubName: stepOneData.clubName,
      content: detailText,
      images: processedImages,
    };

    const originalProcessed = {
      category: categoryMap[originalData.category],
      exhibitionName: originalData.exhibitionName,
      posterUrl: originalData.posterUrl,
      place: originalData.place,
      startDate: getHyphenDate(originalData.startDate),
      endDate: getHyphenDate(originalData.endDate),
      startTime: getFullTime(originalData.startTime),
      endTime: getFullTime(originalData.endTime),
      dateException: originalData.dateException,
      price: getPriceInt(originalData.price),
      link: originalData.link,
      clubName: originalData.clubName,
      content: originalData.content,
    };

    Object.keys(originalProcessed).forEach((key) => {
      if (
        JSON.stringify(currentData[key]) !==
        JSON.stringify(originalProcessed[key])
      ) {
        patchBody[key] = currentData[key];
      }
    });

    if (
      JSON.stringify(processedImages) !==
      JSON.stringify(originalData.images.map((img, idx) => ({ id: img.id })))
    ) {
      patchBody.images = processedImages;
    }

    return patchBody;
  };

  // 수정 제출
  const handleSubmit = async () => {
    const patchBody = getChangedData();

    if (Object.keys(patchBody).length === 0) {
      alert("변경사항이 없습니다.");
      return;
    }

    try {
      const res = await updateExhibitionApi(id, patchBody);
      if (res) {
        alert("수정 완료!");
        navigate(`/detail/${id}`);
      }
    } catch (error) {
      console.error("수정 실패:", error);
      alert("수정 처리 중 오류가 발생했습니다.");
    }
  };

  // 다음 단계
  const handleNextStep = () => {
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
    window.scrollTo(0, 0);
  };

  const goBack = () => {
    if (step === 1) navigate(-1);
    if (step === 2) setStep(1);
  };

  return (
    <Container>
      {step == 1 ? (
        <Topbar icon={null} />
      ) : (
        <Topbar
          title={"전시 수정하기"}
          icon={"EnrollEvent"}
          onClick={handleSubmit}
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
      {originalData ? (
        <Content>
          {step === 1 ? (
            <>
              <EnrollStepOne
                key={`edit-${id}`}
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
          ) : (
            <EnrollStepTwo
              text={detailText}
              setText={setDetailText}
              pictures={detailImages}
              setPictures={setDetailImages}
              stepOneData={stepOneData}
            />
          )}
        </Content>
      ) : (
        <></>
      )}
    </Container>
  );
}
const Container = styled.div`
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
