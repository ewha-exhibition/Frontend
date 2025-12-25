import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function CheckModal({ message, onClose, link }) {
  const navigate = useNavigate();

  const handleConfirm = () => {
    if (onClose) onClose();

    if (link) {
      navigate(link);
    }
  };
  return (
    <Overlay>
      <Modal>
        <MessageArea>
          <p>{message}</p>
        </MessageArea>

        <Divider />

        <ButtonArea onClick={handleConfirm}>확인</ButtonArea>
      </Modal>
    </Overlay>
  );
}

export default CheckModal;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.2);

  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const Modal = styled.div`
  margin: 0 50px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  overflow: hidden;
`;

const MessageArea = styled.div`
  padding: 19px 16px;
  text-align: center;

  p {
    color: ${({ theme }) => theme.colors.blackMain};
    font-size: ${({ theme }) => theme.font.fontSize.title16};
    font-weight: ${({ theme }) => theme.font.fontWeight.semiBold};
    line-height: ${({ theme }) => theme.font.lineHeight.normal};
    white-space: pre-line;
  }
`;

const Divider = styled.div`
  height: 0.5px;
  background-color: ${({ theme }) => theme.colors.gray5};
`;

const ButtonArea = styled.button`
  width: 100%;
  padding: 11px 0;

  background: none;
  border: none;

  color: ${({ theme }) => theme.colors.Primary50};
  font-size: ${({ theme }) => theme.font.fontSize.title16};
  font-weight: ${({ theme }) => theme.font.fontWeight.medium};
  line-height: ${({ theme }) => theme.font.lineHeight.normal};

  cursor: pointer;
`;
