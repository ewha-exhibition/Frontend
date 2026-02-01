import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

import HomeIcon from "../../assets/icons/HomeIcon.svg?react";
import ScrapIcon from "../../assets/icons/Bookmark.svg?react";
import GuestBookIcon from "../../assets/icons/GuestBook.svg?react";
import MyPageIcon from "../../assets/icons/MyPage.svg?react";

export default function TabBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { key: "home", label: "홈", Icon: HomeIcon, path: "/" },
    { key: "scrap", label: "스크랩", Icon: ScrapIcon, path: "/scrap" },
    {
      key: "guestbook",
      label: "방명록",
      Icon: GuestBookIcon,
      path: "/guestBook",
    },
    { key: "my", label: "마이", Icon: MyPageIcon, path: "/mypage" },
  ];

  return (
    <NavBar>
      {tabs.map(({ key, label, Icon, path }) => {
        // 현재 페이지와 경로 일치 확인
        const isActive = location.pathname === path;

        return (
          <NavItem key={key} $active={isActive} onClick={() => navigate(path)}>
            <StyledIcon $active={isActive} as={Icon} alt={label} />
            <p className="label">{label}</p>
          </NavItem>
        );
      })}
    </NavBar>
  );
}

const NavBar = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: min(540px, 100vw);
  z-index: 100;

  height: 58px;
  background: ${({ theme }) => theme.colors.white};
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 0.5px solid ${({ theme }) => theme.colors.gray5};
`;

const NavItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4px 18px;
  gap: 1px;
  color: ${({ theme }) => theme.colors.gray5};

  .label {
    color: ${({ theme }) => theme.colors.gray5};
    font-size: 11px;
    text-align: center;
    font-family: SUIT;
    font-weight: 500;
    line-height: 127.3%;
    letter-spacing: 0.11px;
    color: ${({ $active, theme }) =>
      $active ? theme.colors.gray10 : theme.colors.gray5};
  }
`;
const StyledIcon = styled.svg`
  width: 24px;
  height: 24px;
  color: ${({ $active, theme }) =>
    $active ? theme.colors.gray10 : theme.colors.gray5};
`;
