import styled from "styled-components";

function InputBox({
  placeholder,
  Icon,
  max,
  value = "",
  onChange,
  onClick,
  readOnly,
  required,
}) {
  const handleChange = (e) => {
    const inputVal = e.target.value;

    if (max && inputVal.length > max) return;

    onChange?.(inputVal);
  };

  return (
    <Content>
      <Box onClick={onClick}>
        <input
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          readOnly={readOnly}
          required={required}
        />
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
    color: ${({ theme }) => theme.colors.black};
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
  padding: 0 12px; /* 상하 0, 좌우 12px (Flex 정렬 위해 수정) */
  margin-top: 8px;
  margin-bottom: 3px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.gray5};
  background-color: ${({ theme }) => theme.colors.white || "#fff"};

  display: flex;
  justify-content: space-between;
  align-items: center;

  input {
    border: none;
    height: 100%;
    width: 100%;
    flex: 1; /* 아이콘이 있을 때 공간 유동적 조절 */
    outline: none; /* 포커스 시 기본 테두리 제거 */
    background: transparent;
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
