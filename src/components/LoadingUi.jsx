import styled from "styled-components";

import Load from "../assets/icons/Load.svg?react";

function LoadingUi() {
  return (
    <Area>
      <Load height={58} />
      <p>로딩중이에요</p>
    </Area>
  );
}

export default LoadingUi;

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
    color: ${({ theme }) => theme.colors.Primary50};
    font-size: ${({ theme }) => theme.font.fontSize.title15};
  }
`;
