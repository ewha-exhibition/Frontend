import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

export default function TimePickerModal({ isOpen, onClose, onSelect, title }) {
  const [times, setTimes] = useState([]);

  // 7:00 ~ 23:30 까지 30분 단위로 시간 생성
  useEffect(() => {
    const timeSlots = [];
    for (let i = 7; i < 24; i++) {
      const hour = i.toString();
      timeSlots.push(`${hour}:00`);
      timeSlots.push(`${hour}:30`);
    }
    setTimes(timeSlots);
  }, []);

  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <Sheet onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>{title}</Title>
        </Header>
        <TimeList>
          {times.map((time) => (
            <TimeItem
              key={time}
              onClick={() => {
                onSelect(time);
                onClose();
              }}
            >
              {time}
            </TimeItem>
          ))}
        </TimeList>
      </Sheet>
    </Overlay>
  );
}

// --- Styled Components ---

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  align-items: flex-end; /* 바닥 정렬 */
  justify-content: center;
`;

const Sheet = styled.div`
  width: 100%;
  max-width: 480px; /* PC에서도 너무 넓어지지 않게 제한 */
  height: 50vh;
  background-color: ${({ theme }) => theme.colors.white || "#fff"};
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Header = styled.div`
  padding: 15px 0px;
  text-align: center;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.Primary50};
  ${({ theme }) => theme.textStyles.label0SemiBold};
  margin: 0;
`;

const TimeList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-bottom: 20px;

  /* 스크롤바 숨김 */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

const TimeItem = styled.div`
  padding: 15px 28px;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.gray8};
  cursor: pointer;

  /* ✅ 문법 수정: var() 제거 */
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray3};

  &:active {
    background-color: ${({ theme }) => theme.colors.gray2};
  }
  /* 모바일 환경에서는 hover보다 active가 더 자연스럽지만 유지해도 무방 */
  @media (hover: hover) {
    &:hover {
      background-color: ${({ theme }) => theme.colors.gray2};
    }
  }
`;
