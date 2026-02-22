import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router";
import styled, { keyframes } from "styled-components";
import theme from "../../style/Theme.jsx";
import MenuBanner from "../../assets/icons/MenuBanner.png";
import DeepGreenLogo from "../../assets/icons/logo_darkgreen.png";

export default function HamburgerMenu({ open, onClose }) {
  const navigate = useNavigate();

  const handleBannerClick = () => {
    onClose?.(); // 메뉴 닫기
    navigate("/add-to-home"); // spa 이동
  };
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", onKeyDown);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <Backdrop onClick={onClose} role="presentation">
      <Sheet
        role="dialog"
        aria-modal="true"
        aria-label="햄버거 메뉴"
        onClick={(e) => e.stopPropagation()}
      >
        <Header>
          <Logo src={DeepGreenLogo} alt="녹색 로고" />
        </Header>

        <MenuContainer>
          <MenuList>
            <MenuItem as="a" href="/mypage">
              마이페이지
            </MenuItem>
            <MenuItem as="a" href="/scrap">
              스크랩
            </MenuItem>
            <MenuItem as="a" href="/EnrollEvent">
              공연/전시 등록하기
            </MenuItem>
          </MenuList>

          <BannerButton type="button" onClick={handleBannerClick}>
            <BannerImg src={MenuBanner} alt="홈 화면에 추가 가이드 배너" />
          </BannerButton>
        </MenuContainer>
      </Sheet>
    </Backdrop>,
    document.body,
  );
}

const slideInRight = keyframes`
  from { transform: translateX(100%); }
  to   { transform: translateX(0%); }
`;

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  justify-content: flex-end;
  align-items: stretch;
  background: rgba(0, 0, 0, 0.2);
`;

const Sheet = styled.aside`
  width: min(312px, 80vw);
  height: 100%;
  background: ${theme.colors.white};
  display: flex;
  flex-direction: column;
  animation: ${slideInRight} 200ms ease-out;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
`;

const Header = styled.div`
  padding: 83px 23px 0;
`;

const Logo = styled.img`
  width: 88px;
`;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 35px 0px 24px;
  gap: 32px;
`;

const MenuList = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-left: 23px;
`;

const MenuItem = styled.button`
  all: unset;
  display: block;
  width: 100%;
  cursor: pointer;
  ${theme.textStyles.titleMedium};
  color: ${theme.colors.gray8};
  line-height: 130%;
`;

const BannerLink = styled.a`
  display: block;
  width: 100%;
  text-decoration: none;
`;

const BannerImg = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  display: block;
`;

const BannerButton = styled.button`
  all: unset;
  display: block;
  width: 100%;
  cursor: pointer;
`;
