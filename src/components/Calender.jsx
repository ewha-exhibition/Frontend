import { useState, useRef } from "react";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/locale";
import { styled, createGlobalStyle } from "styled-components";

import LeftIcon from "../assets/icons/ChevronLeft.svg?react";
import RightIcon from "../assets/icons/ChevronRight.svg?react";
import CalendarIcon from "../assets/icons/Calender.svg?react";

export default function Calender({ startDate, endDate, onChange }) {
  // 부모에서 받은 날짜를 초기값으로 설정
  const [tempStart, setTempStart] = useState(
    startDate ? new Date(startDate) : null,
  );
  const [tempEnd, setTempEnd] = useState(endDate ? new Date(endDate) : null);

  const [isSelectingPeriod, setIsSelectingPeriod] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const datePickerRef = useRef(null);

  const toggleCalendar = () => {
    setIsOpen((prev) => !prev);
  };

  // 날짜 선택 핸들링
  const handleChange = (dates) => {
    if (!isSelectingPeriod) {
      setTempStart(dates);
      setTempEnd(null);
      return;
    }

    const [start, end] = dates;
    setTempStart(start);
    setTempEnd(end);
  };

  // 날짜 문자열 포맷 함수
  const formatDate = (d) =>
    d
      ? `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(
          2,
          "0",
        )}.${String(d.getDate()).padStart(2, "0")}`
      : "";

  // 선택 완료 → 부모에게 전달
  const handleSubmit = () => {
    if (onChange) {
      onChange(formatDate(tempStart), tempEnd ? formatDate(tempEnd) : null);
    }
    setIsOpen(false); // State를 false로 변경하여 닫음
  };

  return (
    <>
      <StyledCalender />
      <DatePickerWrapper>
        <DatePicker
          ref={datePickerRef}
          open={isOpen}
          popperProps={{ strategy: "fixed" }}
          popperContainer={({ children }) => (
            <div style={{ position: "relative", zIndex: 100 }}>{children}</div>
          )}
          renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
            <Header>
              <NavButton onClick={decreaseMonth}>
                <LeftIcon width={12} height={12} />
              </NavButton>
              <MonthLabel>{`${date.getFullYear()}년 ${
                date.getMonth() + 1
              }월`}</MonthLabel>
              <NavButton onClick={increaseMonth}>
                <RightIcon width={12} height={13} />
              </NavButton>
            </Header>
          )}
          // 현재 선택된 날짜 표시
          selected={tempStart}
          startDate={tempStart}
          endDate={tempEnd}
          selectsRange={isSelectingPeriod}
          onChange={handleChange}
          dateFormat="yyyy.MM.dd"
          locale={ko}
          placeholderText="-"
          showIcon={false}
          shouldCloseOnSelect={false}
        >
          <FooterContainer>
            <SelectPeriodButton
              $selected={isSelectingPeriod}
              onClick={() => {
                setIsSelectingPeriod((prev) => !prev);
                if (isSelectingPeriod) setTempEnd(null);
              }}
            >
              기간 선택
            </SelectPeriodButton>

            <CompleteButton onClick={handleSubmit}>완료</CompleteButton>
          </FooterContainer>
        </DatePicker>

        <CalendarButton onClick={toggleCalendar}>
          <CalendarIcon />
        </CalendarButton>
      </DatePickerWrapper>
    </>
  );
}
const StyledCalender = createGlobalStyle` 
  /* 오류 임시 해결*/
  .react-datepicker__sr-only {
    border: 0 !important;
    clip: rect(0, 0, 0, 0) !important;
    height: 1px !important;
    margin: -1px !important;
    overflow: hidden !important;
    padding: 0 !important;
    position: absolute !important;
    width: 1px !important;
    white-space: nowrap !important;
  }
  .react-datepicker__aria-live {
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  margin: -1px !important;
  padding: 0 !important;
  overflow: hidden !important;
  clip: rect(0, 0, 0, 0) !important;
  white-space: nowrap !important;
  border: 0 !important;
}

  /* 텍스트 Input */
  .react-datepicker__input-container {
    position: relative
  }
  .react-datepicker__input-container input {
    margin-top: 8px;

    width: 100%;
    height: 43px;
    padding: 8px 12px;
    border-radius: 4px;
    border: 1px solid ${({ theme }) => theme.colors.gray5};
    ${({ theme }) => theme.textStyles.label1Medium};
    color: ${({ theme }) => theme.colors.gray10};
  }
  S
  .react-datepicker__calendar-icon {
    position: absolute;
    right: 32px;
    top: 50%;
    transform: translateY(-50%);
    width: 24px;
    height: 24px;
    fill: ${({ theme }) => theme.colors.gray7};
  }

  /* 팝업 */
  .react-datepicker-popper {
      z-index: 1000;
    }

  .react-datepicker {
    width: 346px; 
    background: ${({ theme }) => theme.colors.white};
    
    border: none;
    border-radius: 6px; 
    box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.10);

    display: flex;
    flex-direction: column; 
    justify-content: center;
    align-items: center;
    padding: 10px;
  }

  /* 헤더 영역 */
  .react-datepicker__header {
    width: 100%;
    background: ${({ theme }) => theme.colors.white};
    margin-bottom: 10px;
    padding-bottom: 5px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray4};
    ${({ theme }) => theme.textStyles.label0SemiBold};
      color: light-dark(#393a40, white);
  }

  .react-datepicker__month-container,
  .react-datepicker__month {
    width: 100%;
  }

  /*항상 6주 균등 분할 */
  .react-datepicker__month {
    display: grid;
    grid-template-rows: repeat(6, 1fr); 
}
  /* 요일 행 */
  .react-datepicker__day-names {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    padding: 6.5px 0px;
    ${({ theme }) => theme.textStyles.label2Regular};
  }

  /* 주(week) 행: REVIEW: 폰트 통일 필요 */
  .react-datepicker__week {
    display: flex;
    justify-content: space-around;
    ${({ theme }) => theme.textStyles.label2Regular};
    color: ${({ theme }) => theme.colors.gray10};
  }

  /* 모든 날짜 */
  .react-datepicker__day {
    display: flex; 
    align-items: center;
    justify-content: center;
    width: 47px; 
    height: 38px;
    margin: 2px 0px;
  }

  /* 선택된 날짜 */
  .react-datepicker__day--selected {
    background: ${({ theme }) => theme.colors.Primary10};
    border: 1.5px solid  ${({ theme }) => theme.colors.Primary50};
   
  }
  .react-datepicker__day--in-range {
    background: ${({ theme }) => theme.colors.Primary10};
    border-top: 1.5px solid  ${({ theme }) => theme.colors.Primary50};
    border-bottom: 1.5px solid  ${({ theme }) => theme.colors.Primary50};
    border-left: none;
    border-right: none;
  }
  .react-datepicker__day--range-start {
    background: ${({ theme }) => theme.colors.Primary10};
    border-top: 1.5px solid  ${({ theme }) => theme.colors.Primary50};
    border-bottom: 1.5px solid  ${({ theme }) => theme.colors.Primary50};
    border-left: 1.5px solid  ${({ theme }) => theme.colors.Primary50};
    border-right: none;
  }
   .react-datepicker__day--range-end {
    background: ${({ theme }) => theme.colors.Primary10};
    border-top: 1.5px solid  ${({ theme }) => theme.colors.Primary50};
    border-bottom: 1.5px solid  ${({ theme }) => theme.colors.Primary50};
    border-right: 1.5px solid  ${({ theme }) => theme.colors.Primary50};
    border-left: none;
  }
  /* 오늘 날짜 */
  .react-datepicker__day--today {
    font-weight: 800; 
    border: none; 
  }
  .react-datepicker__children-container {
    width: 100%; 
    padding: 15px 10px 10px 10px; 
    border-top: 1px solid ${({ theme }) => theme.colors.gray4}; 
    margin-top: 10px; 
  }
  /* 다른 달의  날짜 */
  .react-datepicker__day--outside-month {
   color: ${({ theme }) => theme.colors.gray4};
}
`;

//컨테이너
const DatePickerWrapper = styled.div`
  position: relative;
  width: 100%;
`;

//커스텀 캘린더 버튼
const CalendarButton = styled.button`
  position: absolute;
  right: 12px;
  top: 31px;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;

  svg {
    width: 24px;
    height: 24px;
    color: ${({ theme }) => theme.colors.gray7};
  }
`;
// 커스텀 헤더 스타일
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 45px;
  padding: 0 15px;
  background: ${({ theme }) => theme.colors.white};
  box-sizing: border-box;
`;

const NavButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MonthLabel = styled.span`
  ${({ theme }) => theme.textStyles.label0SemiBold};
`;

// 커스텀 푸터 스타일
const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

//버튼 글자색이 토글 시 바뀌지 않는 문제 해결
const SelectPeriodButton = styled.button`
  padding: 8px 10px;
  border-radius: 3px;
  ${({ theme }) => theme.textStyles.label2Medium};
  background-color: ${({ $selected, theme }) =>
    $selected ? theme.colors.gray9 : theme.colors.gray3};
  color: ${({ $selected, theme }) =>
    $selected
      ? `${theme.colors.white} !important`
      : `${theme.colors.gray9} !important`};
`;
const CompleteButton = styled.button`
  padding: 8px 12px;
  background: none;
  color: ${({ theme }) => theme.colors.gray9};
  ${({ theme }) => theme.textStyles.label2Medium};
`;
