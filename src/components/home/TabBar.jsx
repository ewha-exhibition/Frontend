import styled from "styled-components";
import theme from "../../style/Theme.jsx";
import HomeIcon from "../../assets/icons/HomeIcon.svg?react";
import ScrapIcon from "../../assets/icons/Bookmark.svg?react";
import GuestBookIcon from "../../assets/icons/GuestBook.svg?react";
import MyPageIcon from "../../assets/icons/MyPage.svg?react";

//TODO: active tab state 관리 필요
export default function TabBar() {
  const tabs = [
    { key: "home", label: "홈", Icon: HomeIcon },
    { key: "scrap", label: "스크랩", Icon: ScrapIcon },
    { key: "guestbook", label: "방명록", Icon: GuestBookIcon },
    { key: "my", label: "마이", Icon: MyPageIcon },
  ];

  return (
    <NavBar>
      {tabs.map(({ key, label, Icon }) => (
        <NavItem key={key}>
          <Icon width={24} height={24} />
          <p>{label}</p>
        </NavItem>
      ))}
    </NavBar>
  );
}

const NavBar = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
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
