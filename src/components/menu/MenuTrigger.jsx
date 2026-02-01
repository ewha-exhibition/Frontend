import styled from "styled-components";
import { useMenu } from "./MenuProvider.jsx";
import MenuSvg from "../../assets/icons/Menu.svg?react"; // 기본(흰색)
import HamburgerSvg from "../../assets/icons/HamburgerMenu.svg?react"; // 검정색

export default function MenuTrigger({
  size = 24,
  ariaLabel = "메뉴 열기",
  variant = "default", // "default" | "black" 로 옵션 구분
}) {
  const { open, toggleMenu } = useMenu();

  // variant에 따라 아이콘 선택
  const Icon = variant === "black" ? HamburgerSvg : MenuSvg;

  return (
    <IconButton
      type="button"
      aria-label={ariaLabel}
      aria-haspopup="dialog"
      aria-expanded={open}
      onClick={toggleMenu}
    >
      <Icon width={size} height={size} />
    </IconButton>
  );
}

const IconButton = styled.button`
  all: unset;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
