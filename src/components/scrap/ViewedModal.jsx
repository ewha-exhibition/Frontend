import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import XIcon from "../../assets/icons/X.svg?react";

export default function ViewedModal({
  title = "관람 완료",
  children,
  onClose,
}) {
  const navigate = useNavigate();
  const toReview = () =>{
    navigate(`/createReview`);
  }

  return (
    <Overlay role="dialog" aria-modal="true" onClick={onClose}>
      <Dialog onClick={(e) => e.stopPropagation()}>
        <Header>
          <H3>{title}</H3>
          <CloseBtn aria-label="닫기" onClick={onClose}>
            <StyledX width={24} height={24} />
          </CloseBtn>
        </Header>

        <Content>{children}</Content>

        <Footer>
          <ActionBtn onClick={toReview}>후기 작성하기</ActionBtn>
        </Footer>
      </Dialog>
    </Overlay>
  );
}

const StyledX = styled(XIcon)`
  color: ${({ theme }) => theme?.colors?.gray10};
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Dialog = styled.div`
  width: calc(100% - 40px);
  max-width: 640px;
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
`;

const Header = styled.div`
  position: relative;
  padding: 18px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const H3 = styled.h3`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  margin: 0;

  color: ${({ theme }) => theme?.colors?.gray10};
  font-size: ${({ theme }) => theme.font.fontSize.headline18};
  font-weight: ${({ theme }) => theme.font.fontWeight.bold};
  line-height: ${({ theme }) => theme.font.lineHeight.regular};
`;

const CloseBtn = styled.button`
  cursor: pointer;
`;

const Content = styled.div`
  padding: 18px 20px;

  color: ${({ theme }) => theme?.colors?.gray8};
  font-size: ${({ theme }) => theme.font.fontSize.body14};
  font-weight: ${({ theme }) => theme.font.fontWeight.regular};
  line-height: ${({ theme }) => theme.font.lineHeight.wide};

  white-space: pre-wrap;

  p {
    text-align: center;
  }
`;

const Footer = styled.div`
  padding: 12px 20px;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  border-top: 1px solid ${({ theme }) => theme?.colors?.gray1 || "#f0f0f0"};
`;

const ActionBtn = styled.button`
  background: ${({ theme }) => theme?.colors?.Primary50};
  width: 100%;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 15px 0px;
  font-weight: 600;
  cursor: pointer;
`;
