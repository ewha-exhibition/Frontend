import styled from "styled-components";
import { useRef } from "react";

import Camera from "../../assets/icons/Camera.svg?react";

function TextBox() {
  const textRef = useRef(null);

  const handleInput = () => {
    const el = textRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    }
  };

  return (
    <Container>
      <TextArea
        ref={textRef}
        rows={1}
        onInput={handleInput}
        placeholder="서로 존중하는 언어를 사용해주세요."
      />
      <IconArea>
        <p className="label">사진추가</p>
        <Camera width={24} height={24} />
      </IconArea>
    </Container>
  );
}

export default TextBox;

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
