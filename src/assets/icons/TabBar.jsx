import styled from "styled-components";
//import { useNavigate, useLocation } from "react-router-dom";
import theme from "../../style/Theme.jsx";
import HomeIcon from "../../assets/icons/HomeIcon.svg?react";
import ScrapIcon from "../../assets/icons/Bookmark.svg?react";
import GuestBookIcon from "../../assets/icons/GuestBook.svg?react";
import MyPageIcon from "../../assets/icons/MyPage.svg?react";
//TODO: 선택된 탭 색 바꾸기

export default function TabBar() {
  const tabs = [
    { key: "home", label: "홈", Icon: HomeIcon },
    { key: "scrap", label: "스크랩", Icon: ScrapIcon },
    { key: "guestbook", label: "방명록", Icon: GuestBookIcon },
    { key: "my", label: "마이", Icon: MyPageIcon },
  ];

  return (
    <NavBar>
      <BottomBar>
        {tabs.map(({ key, label, Icon }) => (
          <NavItem key={key}>
            <Icon width={24} height={24} />
            <p>{label}</p>
          </NavItem>
        ))}
      </BottomBar>
    </NavBar>
  );
}

const NavBar = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;

  height: 50px;
  background: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 0.5px solid ${theme.colors.gray5};
`;

const NavItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4px 0;
  gap: 1px;
  color: ${theme.colors.gray5};
  p {
    font-size: 11px;
    text-align: center;
    font-family: SUIT;
    font-weight: 500;
    line-height: 127.3%;
    letter-spacing: 0.11px;
  }

  svg {
    fill: ${theme.colors.gray5};
  }
`;

const BottomBar = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: min(540px, 100vw);
  z-index: 100;
`;
