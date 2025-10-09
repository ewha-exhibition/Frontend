import styled from "styled-components";

export default function ConfirmModal({ isOpen, target, onClose, onConfirm }) {
  if (!isOpen) return null;

  const messageMap = {
    question: "해당 질문을 삭제할까요?",
    review: "해당 후기를 삭제할까요?",
    cheer: "해당 응원글을 삭제할까요?",
  };

  const message = messageMap[target] || "이 항목을 삭제할까요?";

  return (
    <Overlay>
      <ModalBox>
        <div className="message">{message}</div>
        <div className="buttons">
          <button className="left" onClick={onClose}>
            아니요
          </button>
          <button className="right" onClick={onConfirm}>
            삭제
          </button>
        </div>
      </ModalBox>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;

  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.2);
`;

const ModalBox = styled.div`
  width: 255px;
  height: 99px;
  display: flex;
  flex-direction: column;

  background: ${({ theme }) => theme.colors.white};
  border-radius: 14px;

  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);

  .message {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 59px;
    ${({ theme }) => theme.textStyles.label1SemiBold};
    color: ${({ theme }) => theme.colors.black};
  }

  .buttons {
    display: flex;
    border-top: 0.5px solid ${({ theme }) => theme.colors.gray5};
  }

  .left {
    flex: 1;
    background: ${({ theme }) => theme.colors.white};
    border-radius: 14px 0 0 14px;
    border-right: 0.5px solid ${({ theme }) => theme.colors.gray4};
    color: ${({ theme }) => theme.colors.Primary60};
    ${({ theme }) => theme.textStyles.label2Medium};
    padding: 12px 0;
  }
  .right {
    flex: 1;
    background: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.Primary60};
    ${({ theme }) => theme.textStyles.label2Medium};
    padding: 12px 0;
  }
`;
