import { useId, useState } from "react";
import styled from "styled-components";
import Modal from "./Modal.jsx";
import MenuSvg from "../../assets/icons/Menu.svg?react"; // 경로는 프로젝트 구조에 맞게

export default function MenuButton({
  ariaLabel = "메뉴 열기",
  menuTitle = "메뉴",
  menuContent, 
  size = 24,   
}) {
  const [open, setOpen] = useState(false);
  const dialogId = useId();

  return (
    <>
      <IconButton
        type="button"
        aria-label={ariaLabel}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={dialogId}
        onClick={() => setOpen(true)}
      >
        <MenuSvg width={size} height={size} />
      </IconButton>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Panel id={dialogId}>
          <PanelHeader>
            <Title>{menuTitle}</Title>
            <CloseBtn onClick={() => setOpen(false)}>닫기</CloseBtn>
          </PanelHeader>
          <PanelBody>
            {menuContent ?? (
              <DefaultList>
                <li><a href="/">홈</a></li>
                <li><a href="/search">검색</a></li>
                <li><a href="/bookmarks">북마크</a></li>
                <li><a href="/mypage">마이페이지</a></li>
              </DefaultList>
            )}
          </PanelBody>
        </Panel>
      </Modal>
    </>
  );
}

const IconButton = styled.button`
  all: unset;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Panel = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
`;

const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  border-bottom: 1px solid #eee;
`;

const Title = styled.h2`
  font-size: 16px;
  font-weight: 600;
  margin: 0;
`;

const CloseBtn = styled.button`
  all: unset;
  cursor: pointer;
  font-size: 14px;
  color: #666;
  padding: 6px 8px;
  border-radius: 8px;
  &:hover { background: #f4f4f4; }
`;

const PanelBody = styled.div`
  padding: 12px 8px 16px;
`;

const DefaultList = styled.ul`
  list-style: none;
  padding: 0 8px;
  margin: 0;
  li { padding: 10px 6px; }
  a { color: inherit; text-decoration: none; }
`;
