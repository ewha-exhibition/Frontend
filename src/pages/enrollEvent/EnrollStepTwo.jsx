import styled from "styled-components";
import { useRef } from "react";

import AttachedPicture from "../../components/AttachedPicture";
import Preview from "../../components/enrollEvent/Preview";
import PreviewIcon from "../../assets/icons/Eyes.svg?react";
import CameraIcon from "../../assets/icons/Camera.svg?react";
import useS3Upload from "../../utils/hooks/useS3Upload";

export default function EnrollStepTwo({
  text,
  setText,
  pictures,
  setPictures,
  stepOneData,
  previewMode,
  setPreviewMode,
}) {
  const { uploadToS3 } = useS3Upload();

  const textRef = useRef(null);
  const fileInputRef = useRef(null);

  // textarea 자동 높이 조절
  const handleChange = (e) => {
    const el = e.target;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
    setText(el.value);
  };

  const handleImageUpload = async (e) => {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;

    // iOS Safari에서 FileList의 모든 항목이 첫 번째 파일을 가리키는 버그 대응:
    // 비동기 작업 전에 각 파일의 바이너리 데이터를 즉시 읽어 독립적인 File 객체 생성
    const files = await Promise.all(
      Array.from(fileList).map(
        (file) =>
          new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (ev) => {
              const blob = new Blob([ev.target.result], { type: file.type });
              resolve(new File([blob], file.name, { type: file.type }));
            };
            reader.readAsArrayBuffer(file);
          }),
      ),
    );

    // 로컬 미리보기 즉시 표시
    const localUrls = files.map((file) => URL.createObjectURL(file));
    setPictures((prev) => [...prev, ...localUrls]);

    // S3 업로드 후 로컬 URL 교체
    files.forEach(async (file, i) => {
      const s3Url = await uploadToS3(file, "/exhibition/images");
      if (s3Url) {
        setPictures((prev) =>
          prev.map((url) => (url === localUrls[i] ? s3Url : url)),
        );
        URL.revokeObjectURL(localUrls[i]);
      } else {
        URL.revokeObjectURL(localUrls[i]);
        setPictures((prev) => prev.filter((url) => url !== localUrls[i]));
      }
    });

    if (e.target) e.target.value = "";
  };

  //이미지 삭제
  const handleDelete = (index) => {
    setPictures((prev) => prev.filter((_, i) => i !== index));
  };
  // 이미지 순서 위로
  const handleMoveUp = (idx) => {
    if (idx === 0) return;
    setPictures((prev) => {
      const arr = [...prev];
      [arr[idx - 1], arr[idx]] = [arr[idx], arr[idx - 1]];
      return arr;
    });
  };

  // 이미지 순서 아래로
  const handleMoveDown = (idx) => {
    setPictures((prev) => {
      if (idx === prev.length - 1) return prev;
      const arr = [...prev];
      [arr[idx + 1], arr[idx]] = [arr[idx], arr[idx + 1]];
      return arr;
    });
  };

  return (
    <Container>
      {!previewMode ? (
        <>
          <WritingBox>
            <TextArea
              ref={textRef}
              value={text}
              onChange={handleChange}
              placeholder="상세 정보를 자유롭게 입력해주세요!"
            />

            <PictureList>
              {pictures.map((pic, index) => (
                <AttachedPicture
                  key={index}
                  picture={pic}
                  onDelete={() => handleDelete(index)}
                  onMoveUp={() => handleMoveUp(index)}
                  onMoveDown={() => handleMoveDown(index)}
                />
              ))}
            </PictureList>
          </WritingBox>

          <HiddenInput
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
          />

          <InfoBox>
            <p>• 등록 후 기본 정보 및 상세 정보 수정 가능</p>
            <p>• 초대코드로 작성자 권한 부여 가능</p>
            <p>• 작성자 권한: 수정/삭제, 질문·응원·후기 댓글 작성</p>
          </InfoBox>

          <BottomBar>
            <BottomButton onClick={() => fileInputRef.current.click()}>
              <CameraIcon width={24} height={24} />
              첨부
            </BottomButton>

            <BottomButton onClick={() => setPreviewMode(true)}>
              <PreviewIcon width={24} height={24} />
              미리보기
            </BottomButton>
          </BottomBar>
        </>
      ) : (
        <Preview
          detail={{
            ...stepOneData,
            title: stepOneData.exhibitionName,
            posterUrl: stepOneData.posterUrl,
            place: stepOneData.place,
            clubName: stepOneData.clubName,

            price:
              stepOneData.price === "무료"
                ? "무료"
                : `${stepOneData.price}원`,
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
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;

  /* 헤더가 fixed(46px)라서 그만큼 위를 비워줘야 함 */
  padding-top: 46px;
  /* BottomBar가 fixed(76px)라서 그만큼 아래를 비워줘야 함 */
  padding-bottom: 76px;
`;

const WritingBox = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const TextArea = styled.textarea`
  width: 100%;
  /* 헤더(46) + 바텀바(76) + InfoBox 영역(120) 제외한 높이를 최솟값으로 */
  min-height: calc(100vh - 46px - 76px - 120px);
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
  width: 100%;
  background-color: ${({ theme }) => theme.colors.gray1};
  padding: 14px 20px;
  border-radius: 6px;

  p {
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
  justify-content: center;
  align-items: center;
  padding: 20px 10px;
  gap: 6px;
  border: none;
  background: none;
  color: ${({ theme }) => theme.colors.gray8};
  ${({ theme }) => theme.textStyles.label1Medium};
`;
const HiddenInput = styled.input`
  display: none;
`;
