import styled from "styled-components";
import { useState, useRef, useEffect } from "react";

import AttachedPicture from "../../components/AttachedPicture";
import PreviewIcon from "../../assets/icons/Eyes.svg?react";
import CameraIcon from "../../assets/icons/Camera.svg?react";
import mockPicture from "../../assets/mock/poster1.jpg";
import mockPicture2 from "../../assets/mock/poster2.jpg";

//NOTE: header 고정 필요
export default function RegisterDetail() {
  const [pictures, setPictures] = useState([mockPicture, mockPicture2]);
  const [text, setText] = useState(
    "안녕하세요~! 이화여대 오케스트라 동아리 에세이오스입니다. 저희에 여름 정기공연에 초대합니다.\n\n이번 공연에는 이런이런 곡을 연주합니다.\n기대많이 해주세요."
  );

  const textRef = useRef(null);

  const handleChange = (e) => {
    const el = e.target;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
    setText(e.target.value);
  };

  useEffect(() => {
    if (textRef.current) {
      textRef.current.style.height = "auto";
      textRef.current.style.height = `${textRef.current.scrollHeight}px`;
    }
  }, []);

  const handleDelete = (index) => {
    setPictures((prev) => prev.filter((_, i) => i !== index));
  };

  const handleMoveUp = (index) => {
    if (index <= 0) return;
    setPictures((prev) => {
      const updated = [...prev];
      const [moved] = updated.splice(index, 1);
      updated.splice(index - 1, 0, moved);
      return updated;
    });
  };

  const handleMoveDown = (index) => {
    if (index >= pictures.length - 1) return;
    setPictures((prev) => {
      const updated = [...prev];
      const [moved] = updated.splice(index, 1);
      updated.splice(index + 1, 0, moved);
      return updated;
    });
  };

  return (
    <Container>
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

      <InfoBox>
        <p>•&nbsp;등록 후 기본 정보 및 상세 정보 수정 가능</p>
        <p>
          •&nbsp;등록 후 초대코드를 통해 다른 사람에게 작성자 권한 부여 가능
        </p>
        <p>
          •&nbsp;작성자 권한 : 글 수정/삭제, 질문/응원/후기에 댓글 작성 권한
        </p>
      </InfoBox>

      <BottomBar>
        <BottomButton>
          <CameraIcon alt="첨부" width={24} height={24} />
          첨부
        </BottomButton>
        <BottomButton>
          <PreviewIcon alt="미리보기" width={24} height={24} />
          미리보기
        </BottomButton>
      </BottomBar>
    </Container>
  );
}

/* ====== 스타일 ====== */
const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const WritingBox = styled.div`
  width: 100%;
  height: 70%;
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
  margin-top: 20px;
`;

const InfoBox = styled.div`
  position: fixed;
  bottom: 90px;
  background-color: ${({ theme }) => theme.colors.gray1};
  padding: 15px 20px;
  border-radius: 6px;

  p {
    ${({ theme }) => theme.textStyles.body2Regular};
    color: ${({ theme }) => theme.colors.gray7};
  }
`;

const BottomBar = styled.div`
  position: fixed;
  bottom: 0px;
  width: 100%;
  height: 76px;
  padding-left: 20px;
  padding-bottom: 26px;
  display: flex;
  flex-direction: row;
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
