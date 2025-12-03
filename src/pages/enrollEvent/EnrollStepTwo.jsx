import styled from "styled-components";
import { useRef, useEffect, useState } from "react";

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
  step1Data, //부모 전달
}) {
  const [previewMode, setPreviewMode] = useState(false);

  const textRef = useRef(null);
  const fileInputRef = useRef(null);
  const { uploadToS3 } = useS3Upload();

  /* ===== textarea 자동 높이 조절 ===== */
  const handleChange = (e) => {
    const el = e.target;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
    setText(el.value);
  };

  useEffect(() => {
    if (textRef.current) {
      textRef.current.style.height = "auto";
      textRef.current.style.height = `${textRef.current.scrollHeight}px`;
    }
  }, []);

  /* ===== 이미지 업로드 ===== */
  const handleUploadImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    const s3Url = await uploadToS3(file);

    setPictures((prev) => [...prev, { url: s3Url, preview: previewUrl }]);
  };

  /* ===== 이미지 삭제 ===== */
  const handleDelete = (idx) => {
    setPictures(pictures.filter((_, i) => i !== idx));
  };

  /* ===== 이미지 순서 위로 ===== */
  const handleMoveUp = (idx) => {
    if (idx === 0) return;
    setPictures((prev) => {
      const arr = [...prev];
      [arr[idx - 1], arr[idx]] = [arr[idx], arr[idx - 1]];
      return arr;
    });
  };

  /* ===== 이미지 순서 아래로 ===== */
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
                  picture={pic.preview || pic.url}
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
            accept="image/*"
            onChange={handleUploadImage}
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
            ...step1Data, // Step1
            content: text, // Step2
            images: pictures.map((p) => p.preview || p.url),
          }}
          onBack={() => setPreviewMode(false)}
        />
      )}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  /* 헤더가 fixed(46px)라서 그만큼 위를 비워줘야 함 */
  padding-top: 46px;
`;

const WritingBox = styled.div`
  width: 100%;
  height: calc(100vh - 76px); /* BottomBar 높이 제외 */
  padding-bottom: 100px; /* InfoBox + 여유 공간 */
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 13px 20px;
  box-sizing: border-box;
  border: none;
  outline: none;
  resize: none;
  overflow-y: hidden;
  line-height: 1.5;

  ${({ theme }) => theme.textStyles.body1Regular};
  color: ${({ theme }) => theme.colors.gray10};
`;

const PictureList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin: 16px 0;
`;

const InfoBox = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.gray1};
  padding: 15px 20px;
  margin-top: 20px;
  border-radius: 6px;

  p {
    ${({ theme }) => theme.textStyles.body2Regular};
    color: ${({ theme }) => theme.colors.gray7};
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
