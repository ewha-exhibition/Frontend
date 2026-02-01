import styled from "styled-components";
import { useRef, useState } from "react";

import Camera from "../../assets/icons/Camera.svg?react";
import XIcon from "../../assets/icons/X.svg?react";

function TextBox({ onChange }) {
  const textRef = useRef(null);
  const fileInputRef = useRef(null);

  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [files, setFiles] = useState([]);

  const handleInput = (e) => {
    const value = e.target.value;
    setContent(value);

    // 상위에 content와 files 전달
    onChange?.({
      content: value,
      files,
    });

    // textarea auto height
    const el = textRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    }
  };

  const handleOpenFile = () => {
    if (images.length >= 4) {
      alert("최대 4장까지만 업로드 가능합니다.");
      return;
    }
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files);
    const remaining = 4 - images.length;
    const pick = selected.slice(0, remaining);

    setFiles((prev) => [...prev, ...pick]);

    pick.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages((prev) => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });

    onChange?.({
      content,
      files: [...files, ...pick],
    });
  };

  const removeImage = (idx) => {
    setImages((prev) => prev.filter((_, i) => i !== idx));

    setFiles((prev) => {
      const updatedFiles = prev.filter((_, i) => i !== idx);
      onChange?.({
        content,
        files: updatedFiles,
      });
      return updatedFiles;
    });
  };

  return (
    <>
      <Container>
        <TextArea
          ref={textRef}
          rows={1}
          value={content}
          onInput={handleInput}
          placeholder="서로 존중하는 언어를 사용해주세요."
        />
        <IconArea onClick={handleOpenFile}>
          <p className="label">사진추가</p>
          <StyledCamera width={24} height={24} />
        </IconArea>
        <input
          type="file"
          accept="image/*"
          multiple
          style={{ display: "none" }}
          ref={fileInputRef}
          onChange={handleFileChange}
        />
      </Container>
      {images.length > 0 && (
        <PreviewList>
          {images.map((img, idx) => (
            <PreviewBox key={idx}>
              <img src={img} alt={`preview-${idx}`} />
              <DeleteBtn onClick={() => removeImage(idx)}>
                <StyledX />
              </DeleteBtn>
            </PreviewBox>
          ))}
        </PreviewList>
      )}
    </>
  );
}

export default TextBox;

const StyledX = styled(XIcon)`
  color: ${({ theme }) => theme.colors.white};
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  width: 100%;
  min-height: 280px;
  padding: 16px;
  padding-bottom: 48px;
  border-radius: 6px;

  position: relative;

  background: ${({ theme }) => theme.colors.gray2};
`;
const TextArea = styled.textarea`
  width: 100%;
  resize: none;
  overflow: hidden;
  border: none;
  background: none;

  color: ${({ theme }) => theme.colors.blackMain};
  font-size: ${({ theme }) => theme.font.fontSize.label14};
  font-weight: ${({ theme }) => theme.font.fontWeight.regular};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray};
  }
  &:focus {
    outline: none;
  }
`;
const IconArea = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 4px;

  position: absolute;
  bottom: 16px;
  right: 16px;

  .label {
    color: ${({ theme }) => theme.colors.gray8};
    font-size: ${({ theme }) => theme.font.fontSize.label14};
    font-weight: ${({ theme }) => theme.font.fontWeight.medium};
  }
`;
const PreviewList = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
`;
const PreviewBox = styled.div`
  width: 160px;
  height: 160px;
  border-radius: 4.8px;
  position: relative;
  overflow: hidden;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const DeleteBtn = styled.button`
  position: absolute;
  top: 6px;
  right: 6px;
  width: 16px;
  height: 16px;
  border: none;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.gray9};
  cursor: pointer;
`;

const StyledCamera = styled(Camera)`
  color: ${({ theme }) => theme.colors.gray8};
`;
