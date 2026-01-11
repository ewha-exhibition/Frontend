import styled from "styled-components";

export default function ConfirmModal({ isOpen, type, onClose, onConfirm }) {
  if (!isOpen) return null;

  const messageMap = {
    cheer: "해당 응원을 삭제할까요?",
    question: "해당 질문을 삭제할까요?",
    review: "해당 후기를 삭제할까요?",
    reply: "해당 답글을 삭제할까요?",
    copy: "링크가 복사되었습니다.",
  };

  const message = messageMap[type];

  return (
    <Overlay>
      <ModalBox>
        <div className="message">{message}</div>
        <div className="buttons">
          {isOpen ? (
            <button className="full" onClick={onClose}>
              확인
            </button>
          ) : (
            /* ✅ 기존 삭제(Confirm) 모달일 경우: 취소/삭제 버튼 노출 */
            <>
              <button className="left" onClick={onClose}>
                아니요
              </button>
              <button className="right" onClick={onConfirm}>
                삭제
              </button>
            </>
          )}
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
  backdrop-filter: blur(32px);

  .message {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 19px 16px;
    ${({ theme }) => theme.textStyles.label1SemiBold};
    color: ${({ theme }) => theme.colors.black};
    flex: 1;
  }

  .buttons {
    display: flex;
    border-top: 0.5px solid ${({ theme }) => theme.colors.gray5};
    height: 44px;
  }

  /* 공통 버튼 스타일 */
  button {
    ${({ theme }) => theme.textStyles.label2Medium};
    background: ${({ theme }) => theme.colors.white};
    cursor: pointer;
    border: none;
  }

  .left {
    flex: 1;
    border-radius: 0 0 0 14px;
    border-right: 0.5px solid ${({ theme }) => theme.colors.gray5};
    color: ${({ theme }) => theme.colors.gray9};
  }

  .right {
    flex: 1;
    border-radius: 0 0 14px 0;
    color: ${({ theme }) => theme.colors.Primary60};
  }

  /* ✅ 추가:(Alert용) */
  .full {
    width: 100%;
    border-radius: 0 0 14px 14px;
    color: ${({ theme }) => theme.colors.Primary60}; /* 강조색 */
  }
`;
