import styled from "styled-components";

function InputBox({
  placeholder,
  Icon,
  type,
  max,
  value = "",
  onChange,
  onClick,
  readOnly,
  required,
  unit,
  textAlign = "left",
}) {
  const handleChange = (e) => {
    const inputVal = e.target.value;

    if (type === "number") {
      // 1. 숫자만 남기기 (콤마 제거)
      const rawNumber = inputVal.replace(/[^0-9]/g, "");

      // 2. 다 지웠을 때 처리
      if (rawNumber === "") {
        onChange?.("");
        return;
      }

      // 3. 안전한 정수 변환 (01 -> 1, 문자가 섞여도 NaN 방지)
      const parsedValue = parseInt(rawNumber, 10);

      // 4. NaN 체크 (혹시 모를 오류 방지)
      if (isNaN(parsedValue)) {
        return;
      }

      // 5. 콤마 포맷팅 후 부모에게 전달
      const formattedValue = parsedValue.toLocaleString();
      onChange?.(formattedValue);
    } else {
      // 일반 텍스트 입력일 경우
      if (max && inputVal.length > max) return;
      onChange?.(inputVal);
    }
  };

  return (
    <Content>
      <Box onClick={onClick} $textAlign={textAlign}>
        <input
          placeholder={placeholder}
          type={type === "number" ? "text" : type}
          inputMode={type === "number" ? "numeric" : "text"}
          value={value}
          onChange={handleChange}
          readOnly={readOnly}
          required={required}
        />
        {unit && <Unit className="unit">{unit}</Unit>}
        {Icon && <Icon width={24} height={24} color="#868B94" alt="시간" />}
      </Box>

      {max && (
        <MaxNum>
          <span className="current">{value.length}</span>
          <span className="maxNum">/{max}</span>
        </MaxNum>
      )}
    </Content>
  );
}

export default InputBox;

const Content = styled.div``;
const MaxNum = styled.div`
  width: 100%;

  display: flex;
  justify-content: flex-end;
  .current {
    color: ${({ theme }) => theme.colors.blackMain};
    font-size: ${({ theme }) => theme.font.fontSize.label12};
    font-weight: ${({ theme }) => theme.font.fontWeight.medium};
    line-height: ${({ theme }) => theme.font.lineHeight.normal};
  }
  .maxNum {
    color: ${({ theme }) => theme.colors.gray6};
    font-size: ${({ theme }) => theme.font.fontSize.label12};
    font-weight: ${({ theme }) => theme.font.fontWeight.medium};
    line-height: ${({ theme }) => theme.font.lineHeight.normal};
  }
`;

const Box = styled.div`
  width: 100%;
  height: 45px;
  padding: 0 12px;
  margin-top: 8px;
  margin-bottom: 3px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.gray5};
  background-color: ${({ theme }) => theme.colors.white || "#fff"};

  display: flex;
  align-items: center;

  input {
    border: none;
    height: 100%;
    width: 100%;
    flex: 1;
    outline: none;
    background: transparent;
    text-align: ${(props) => props.$textAlign || "left"};
    color: ${({ theme }) => theme.colors.gray10};
    font-size: ${({ theme }) => theme.font.fontSize.body14};
    font-weight: ${({ theme }) => theme.font.fontWeight.medium};
    line-height: ${({ theme }) => theme.font.lineHeight.normal};

    /* 포커스/호버 시에도 테두리 없음 (부모 Box가 테두리 담당) */
    &:hover,
    &:focus {
      border: none;
      outline: none;
    }
  }

  input::placeholder {
    color: ${({ theme }) => theme.colors.gray6};
    font-size: ${({ theme }) => theme.font.fontSize.body14};
    font-weight: ${({ theme }) => theme.font.fontWeight.medium};
    line-height: ${({ theme }) => theme.font.lineHeight.normal};
  }
`;
const Unit = styled.span`
  margin-left: 4px;
  font-size: 16px;
  color: #212529;

  white-space: nowrap;
`;
