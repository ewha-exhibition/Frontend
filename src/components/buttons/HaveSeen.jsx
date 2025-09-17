import { useState } from "react";
import styled from "styled-components";

function HaveSeen() {
  const [seen, setSeen] = useState(false);

  return (
    <Btn seen={seen} onClick={() => setSeen(!seen)}>
      {seen ? "관람 완료" : "관람했어요"}
    </Btn>
  );
}

export default HaveSeen;

const Btn = styled.button`
  width: 78px;
  height: 32px;
  border-radius: 100px;

  font-size: ${({ theme }) => theme.font.fontSize.label12};
  font-weight: ${({ theme }) => theme.font.fontWeight.semiBold};
  line-height: ${({ theme }) => theme.font.lineHeight.normal};
  color: ${({ seen, theme }) =>
    seen ? theme.colors.white : theme.colors.gray8};

  background: ${({ seen, theme }) =>
    seen ? theme.colors.gray9 : "transparent"};
  border: 1px solid ${({ seen, theme }) => (seen ? "none" : theme.colors.gray4)};
`;
