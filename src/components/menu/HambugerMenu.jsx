import { useEffect } from "react";
import { createPortal } from "react-dom";
import styled, { keyframes } from "styled-components";
import theme from "../../style/Theme.jsx";
import MenuBanner from "../../assets/icons/MenuBanner.png"; 

export default function HamburgerMenu({ open, onClose }) {
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
          <Brand>綠’ KNOCK</Brand>
        </Header>

        <MenuContainer>
          <MenuList>
            <MenuItem as="a" href="/login">
              로그인
            </MenuItem>
            <MenuItem as="a" href="/mypage">
              마이페이지
            </MenuItem>
            <MenuItem as="a" href="/scrap">
              스크랩
            </MenuItem>
            <MenuItem as="a" href="/submit">
              공연/전시 등록하기
            </MenuItem>
          </MenuList>

          <BannerLink
            href="https://..." // TO DO: 여기에 공유 페이지 링크 넣기
            target="_blank"
            rel="noopener noreferrer"
          >
            <BannerImg src={MenuBanner} alt="이벤트 배너" />
          </BannerLink>
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

const Brand = styled.div`
  ${theme.textStyles.headline2Bold};
  color: ${theme.colors.Primary60};
  letter-spacing: ${theme.font.letterSpacing.default};
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
