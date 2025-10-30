import { useState } from "react";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/locale";
import { styled, createGlobalStyle } from "styled-components";

import LeftIcon from "../assets/icons/ChevronLeft.svg";
import RightIcon from "../assets/icons/ChevronRight.svg";

//NOTE: 기간 선택, 완료 버튼 기능 구현 필요

export default function Calender() {
  // 기간 선택: 확정, 임시
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [tempStart, setTempStart] = useState(null);
  const [tempEnd, setTempEnd] = useState(null);

  const handleChange = (dates) => {
    const [start, end] = dates;
    setTempStart(start);
    setTempEnd(end);
  };

  const handleSubmit = () => {};

  // 캘린더 열림/닫힘 콜백
  const handleCalendarClose = () => console.log("Calendar closed");
  const handleCalendarOpen = () => console.log("Calendar opened");

  return (
    <>
      <StyledCalender />
      <DatePicker
        popperProps={{ strategy: "fixed" }}
        popperContainer={({ children }) => (
          <div style={{ position: "relative", zIndex: 100 }}>{children}</div>
        )}
        // 커스텀 헤더  (REVIEW: 아이콘 크기 통일 필요)
        renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
          <Header>
            <NavButton onClick={decreaseMonth}>
              <img src={LeftIcon} alt="이전 달" width={12} height={12} />
            </NavButton>
            <MonthLabel>{`${date.getFullYear()}년 ${
              date.getMonth() + 1
            }월`}</MonthLabel>
            <NavButton onClick={increaseMonth}>
              <img src={RightIcon} alt="다음 달" width={20} height={20} />
            </NavButton>
          </Header>
        )}
        selected={tempStart}
        startDate={tempStart}
        endDate={tempEnd}
        onChange={handleChange}
        selectsRange
        showIcon
        toggleCalendarOnIconClick
        shouldCloseOnSelect={false}
        onCalendarClose={handleCalendarClose}
        onCalendarOpen={handleCalendarOpen}
        dateFormat="yyyy.MM.dd"
        locale={ko}
        placeholderText="-"
      >
        <FooterContainer>
          <SelectPeriodButton>기간 선택</SelectPeriodButton>
          <CompleteButton>완료</CompleteButton>
        </FooterContainer>
      </DatePicker>
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
    height: auto; 
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
  }

  .react-datepicker__month-container,
  .react-datepicker__month {
    width: 100%;
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
    margin-top: 10px; }
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
const SelectPeriodButton = styled.button`
  padding: 8px 10px;
  background-color: ${({ theme }) => theme.colors.gray9};
  border-radius: 3px;
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.textStyles.label2Medium};
`;
const CompleteButton = styled.button`
  padding: 8px 12px;
  background: none;
  color: ${({ theme }) => theme.colors.gray9};
  ${({ theme }) => theme.textStyles.label2Medium};
`;
