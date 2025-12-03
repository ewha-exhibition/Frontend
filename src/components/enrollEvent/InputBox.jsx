import styled from "styled-components";

function InputBox({ placeholder, icon, max, value = "", onChange }) {
  const handleChange = (e) => {
    const inputVal = e.target.value;

    if (max && inputVal.length > max) return;

    onChange?.(inputVal);
  };

  return (
    <Content>
      <Box>
        <input
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
        />
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
  height: 43px;
  padding: 12px;
  margin-top: 8px;
  margin-bottom: 3px;

  border: 1px solid ${({ theme }) => theme.colors.gray4};

  input {
    border: none;
    height: 100%;
    width: 100%;

    color: ${({ theme }) => theme.colors.gray10};
    font-size: ${({ theme }) => theme.font.fontSize.body14};
    font-weight: ${({ theme }) => theme.font.fontWeight.medium};
    line-height: ${({ theme }) => theme.font.lineHeight.normal};
  }
  input::placeholder {
    color: ${({ theme }) => theme.colors.gray6};
    font-size: ${({ theme }) => theme.font.fontSize.body14};
    font-weight: ${({ theme }) => theme.font.fontWeight.medium};
    line-height: ${({ theme }) => theme.font.lineHeight.normal};
  }
`;
