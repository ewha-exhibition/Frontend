import styled from "styled-components";
import { useMenu } from "./MenuProvider.jsx";
import MenuSvg from "../../assets/icons/Menu.svg?react";

export default function MenuTrigger({ size = 24, ariaLabel = "메뉴 열기" }) {
  const { open, toggleMenu } = useMenu();
  return (
    <IconButton
      type="button"
      aria-label={ariaLabel}
      aria-haspopup="dialog"
      aria-expanded={open}
      onClick={toggleMenu}
    >
      <MenuSvg width={size} height={size} />
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
