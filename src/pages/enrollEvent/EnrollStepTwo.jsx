import styled from "styled-components";
import { useRef } from "react";
import useCustomFetch from "../../utils/hooks/useCustomFetch";

import AttachedPicture from "../../components/AttachedPicture";
import Preview from "../../components/enrollEvent/Preview";
import PreviewIcon from "../../assets/icons/Eyes.svg?react";
import CameraIcon from "../../assets/icons/Camera.svg?react";

export default function EnrollStepTwo({
  text,
  setText,
  pictures = [], // 부모로부터 전달받는 이미지 객체 배열 [{ id, previewUrl, file }]
  setPictures,
  stepOneData,
  previewMode,
  setPreviewMode,
}) {
  const { fetchData } = useCustomFetch();
  const textRef = useRef(null);
  const fileInputRef = useRef(null);

  //console.log(pictures);

  // textarea 자동 높이 조절
  const handleChange = (e) => {
    const el = e.target;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
    setText(el.value);
  };

  // 1. 사진 선택 시: S3 업로드 없이 로컬 미리보기 생성 및 원본 객체 보존
  const handleImageUpload = (e) => {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;

    // 최대 10장 제한 처리 (선택 사항이지만 안전장치로 추가)
    if (pictures.length + fileList.length > 10) {
      alert("사진은 최대 10장까지 첨부 가능합니다.");
      return;
    }

    const newFiles = Array.from(fileList).map((file) => ({
      id: `${file.name}-${Date.now()}-${Math.random()}`, // 고유 키값 생성
      previewUrl: URL.createObjectURL(file), // <img src="..." /> 에 들어갈 임시 Blob 주소
      file: file, // 최종 업로드 시 사용할 원본 File 객체
    }));

    setPictures((prev) => [...prev, ...newFiles]);

    // 동일 파일 재선택이 가능하도록 인풋 초기화
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // 2. 사진 개별 삭제 (메모리 누수 방지를 위해 생성된 ObjectURL 해제 필수)
  const handleDeletePicture = (id, previewUrl) => {
    URL.revokeObjectURL(previewUrl);
    setPictures((prev) => prev.filter((pic) => pic.id !== id));
  };

  // 3. 사진 순서 변경: 위로 이동
  const handleMoveUp = (index) => {
    if (index === 0) return;
    setPictures((prev) => {
      const nextPictures = [...prev];
      const temp = nextPictures[index];
      nextPictures[index] = nextPictures[index - 1];
      nextPictures[index - 1] = temp;
      return nextPictures;
    });
  };

  // 4. 사진 순서 변경: 아래로 이동
  const handleMoveDown = (index) => {
    if (index === pictures.length - 1) return;
    setPictures((prev) => {
      const nextPictures = [...prev];
      const temp = nextPictures[index];
      nextPictures[index] = nextPictures[index + 1];
      nextPictures[index + 1] = temp;
      return nextPictures;
    });
  };

  // 5. 최종 등록하기 단계에서 호출할 S3 일괄 업로드 로직 (CreateReview 방식 이식)
  const uploadAllImages = async () => {
    if (pictures.length === 0) return [];

    const s3Urls = [];

    for (let i = 0; i < pictures.length; i++) {
      try {
        const res = await fetchData(`/exhibition/images`, "GET");
        const presignedUrl = res?.data?.data?.url;

        if (presignedUrl) {
          const rawFile = pictures[i].file;

          // S3 직접 바이너리 업로드
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
        console.error(`[${i}] S3 업로드 중 에러 발생:`, error);
      }
    }

    return s3Urls; // 모든 업로드가 끝난 순수 URL 배열 반환
  };

  return (
    <>
      {!previewMode ? (
        <Container>
          <WritingBox>
            <TextArea
              ref={textRef}
              placeholder="내용을 입력해주세요."
              rows={1}
              value={text}
              onChange={handleChange}
            />

            <PictureList>
              {pictures.map((pic, index) => (
                <AttachedPicture
                  key={pic?.id}
                  picture={pic?.previewUrl}
                  onDelete={() => handleDeletePicture(pic.id, pic.previewUrl)}
                  onMoveUp={() => handleMoveUp(index)}
                  onMoveDown={() => handleMoveDown(index)}
                  isFirst={index === 0}
                  isLast={index === pictures.length - 1}
                />
              ))}
            </PictureList>

            <InfoBox>
              <p>• 사진은 최대 10장까지 첨부 가능합니다.</p>
              <p>• 이미지 순서는 화살표 버튼으로 조정할 수 있습니다.</p>
            </InfoBox>
          </WritingBox>

          <BottomBar>
            <BottomButton
              type="button"
              onClick={() => fileInputRef.current?.click()}
            >
              <CameraIcon width={24} height={24} />
              <span>{pictures.length}/10</span>
            </BottomButton>

            <HiddenInput
              type="file"
              ref={fileInputRef}
              accept="image/*"
              multiple
              onChange={handleImageUpload}
            />

            <BottomButton type="button" onClick={() => setPreviewMode(true)}>
              <PreviewIcon width={24} height={24} />
              <span>미리보기</span>
            </BottomButton>
          </BottomBar>
        </Container>
      ) : (
        <Preview
          detail={{
            ...stepOneData,
            title: stepOneData.exhibitionName,
            posterUrl: stepOneData.posterUrl,
            place: stepOneData.place,
            clubName: stepOneData.clubName,

            price:
              stepOneData.price === "무료" ? "무료" : `${stepOneData.price}원`,
            dateException: stepOneData.dateException,

            period:
              !stepOneData.endDate ||
              stepOneData.startDate === stepOneData.endDate
                ? stepOneData.startDate
                : `${stepOneData.startDate} - ${stepOneData.endDate}`,

            duration: stepOneData.endTime
              ? `${stepOneData.startTime} - ${stepOneData.endTime}`
              : `${stepOneData.startTime}`,

            content: text,
            images: pictures,
          }}
          onBack={() => setPreviewMode(false)}
        />
      )}
    </>
  );
}

// --- Styled Components ---
const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding-top: 46px; /* 헤더 영역 확보 */
  padding-bottom: 76px; /* 바텀바 영역 확보 */
  box-sizing: border-box;
`;

const WritingBox = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: calc(100vh - 46px - 76px - 140px);
  padding: 16px 20px;
  box-sizing: border-box;
  border: none;
  outline: none;
  resize: none;
  overflow-y: hidden;
  line-height: 1.6;

  ${({ theme }) => theme.textStyles.body1Regular};
  color: ${({ theme }) => theme.colors.gray10};
`;

const PictureList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 0 20px 16px;
`;

const InfoBox = styled.div`
  background-color: ${({ theme }) => theme.colors.gray1 || "#f9f9f9"};
  padding: 14px 20px;
  margin: 0 20px 20px 20px;
  border-radius: 6px;

  p {
    margin: 0;
    ${({ theme }) => theme.textStyles.body2Regular};
    color: ${({ theme }) => theme.colors.gray7};
    line-height: 1.7;
  }
`;

const BottomBar = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;

  height: 76px;
  padding-left: 20px;
  padding-bottom: 26px;
  display: flex;
  gap: 8px;
  border-top: 0.5px solid ${({ theme }) => theme.colors.gray3};
  background-color: ${({ theme }) => theme.colors.white};
`;

const BottomButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  gap: 4px;
  padding: 4px 8px;

  span {
    color: ${({ theme }) => theme.colors.gray8};
    ${({ theme }) => theme.textStyles.label1Medium};
    font-size: 12px;
  }
`;

const HiddenInput = styled.input`
  display: none;
`;
