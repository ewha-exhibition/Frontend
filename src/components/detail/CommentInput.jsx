import { forwardRef } from "react";
import styled from "styled-components";
import sendIcon from "../../assets/icons/Send.svg";

const CommentInput = forwardRef(function CommentInput(
  { isHost, placeholder, login, inputValue, onChange, onSubmit, onLoginRequired },
  ref,
) {
  if (isHost) return null;

  return (
    <InputBox>
      <div className="left" style={{ alignItems: "flex-end" }}>
        <p className="nickname">익명</p>
        <AutoHeightTextarea
          ref={ref}
          rows={1}
          placeholder={placeholder}
          readOnly={!login}
          value={inputValue}
          onChange={onChange}
          onClick={() => {
            if (!login) onLoginRequired();
          }}
        />
      </div>
      <SendBtn src={sendIcon} alt="send" onClick={onSubmit} />
    </InputBox>
  );
});

export default CommentInput;

const InputBox = styled.div`
  position: relative;
  width: 100%;
  min-height: 44px;
  margin-bottom: 15px;
  padding: 10px 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray4};
  border-radius: 6px;

  .left {
    display: flex;
    align-items: center;
    gap: 10px;
    flex: 1;
  }
  .nickname {
    align-self: center;
    color: ${({ theme }) => theme.colors.Primary50};
    ${({ theme }) => theme.textStyles.label2Medium};
    white-space: nowrap;
  }
`;

const SendBtn = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
  align-self: flex-end;
`;

const AutoHeightTextarea = styled.textarea`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  ${({ theme }) => theme.textStyles.body1Regular};
  color: ${({ theme }) => theme.colors.blackMain};
  resize: none;
  overflow-y: hidden;
  padding: 0;
  margin-left: 10px;
  margin-right: 5px;
  line-height: 1.4;
  max-height: 120px;
  vertical-align: center;

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray6};
  }
`;
