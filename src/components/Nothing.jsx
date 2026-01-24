import styled from "styled-components";

import NoItem from "../assets/icons/NoItem.svg?react";

function Nothing({ text }) {
  return (
    <Area>
      <NoItem height={50} />
      <p>{text}</p>
    </Area>
  );
}

export default Nothing;

const Area = styled.div`
  min-height: calc(100vh - 120px);
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 20px;
  text-align: center;

  p {
    color: ${({ theme }) => theme.colors.gray5};
    font-size: ${({ theme }) => theme.font.fontSize.title15};
  }
`;
