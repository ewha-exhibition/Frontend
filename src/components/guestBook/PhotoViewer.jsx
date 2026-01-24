import styled from "styled-components";
import { useEffect, useRef } from "react";

import XIcon from "../../assets/icons/X.svg?react";

export default function PhotoViewer({
  imageUrls,
  index,
  onClose,
  setIndex,
  urlLength,
}) {
  //console.log("pics2:", imageUrls);
  console.log(imageUrls);
  const startX = useRef(null);
  const endX = useRef(null);

  // 키보드 좌우 이동
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [index]);

  const next = () => setIndex((prev) => (prev + 1) % urlLength);
  const prev = () => setIndex((prev) => (prev - 1 + urlLength) % urlLength);

  // 모바일 스와이프 핸들러
  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    endX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (startX.current === null || endX.current === null) return;

    const diff = startX.current - endX.current;

    if (Math.abs(diff) > 50) {
      if (diff > 0)
        next(); // 왼쪽 → 오른쪽 스와이프 → 다음 사진
      else prev(); // 오른쪽 → 왼쪽 스와이프 → 이전 사진
    }

    startX.current = null;
    endX.current = null;
  };

  return (
    <Overlay onClick={onClose}>
      <TopArea>
        <StyledX width={24} height={24} onClick={onClose} />
        <p>
          {index + 1}/{urlLength}
        </p>
      </TopArea>

      <Viewer
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <img src={imageUrls[index]} alt="선택사진" />
      </Viewer>
    </Overlay>
  );
}

const StyledX = styled(XIcon)`
  color: ${({ theme }) => theme.colors.white};
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #111;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99999;
`;

const TopArea = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;

  padding: 16px;

  display: flex;
  align-items: center;

  svg {
    cursor: pointer;
  }

  p {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    margin: 0;

    color: ${({ theme }) => theme.colors.white};
    font-size: ${({ theme }) => theme.font.fontSize.body14};
    font-weight: ${({ theme }) => theme.font.fontWeight.semiBold};
  }
`;

const Viewer = styled.div`
  position: relative;
  max-width: 90vw;
  max-height: 90vh;

  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 100%;
    height: auto;
    max-height: 90vh;
    object-fit: contain;
  }
`;
