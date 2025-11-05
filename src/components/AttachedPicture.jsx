import styled from "styled-components";
import { useState } from "react";

import DeleteIcon from "../assets/icons/X.svg?react";
import MoveIcon from "../assets/icons/CaretLeft.svg?react";

//image: 사진 파일 (서버 전송)
// *상세설명 페이지에서 관리한다
//picture: 변환된 사진 주소 (미리보기)
// *상세 설명 페이지에서 변환 후 이 컴포넌트에 전달한다

export default function AttachedPicture({
  picture,
  onDelete,
  onMoveUp,
  onMoveDown,
}) {
  return (
    <Frame style={{ backgroundImage: `url(${picture})` }}>
      <ControlBar>
        <DeleteIcon className="button" onClick={onDelete} />
        <div className="movingButton">
          <MoveIcon className="button" onClick={onMoveUp} />
          <MoveIcon className="downButton" onClick={onMoveDown} />
        </div>
      </ControlBar>
    </Frame>
  );
}
const Frame = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 180px;
  height: 180px;
  background: ${({ theme }) => theme.colors.gray3};
  background-size: cover;
  background-position: top;
  background-repeat: no-repeat;
`;

const ControlBar = styled.div`
  width: 100%;
  height: 30px;
  padding: 2px 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.7);

  .button {
    width: 24px;
    height: 24px;
    color: ${({ theme }) => theme.colors.gray8};
  }
  .movingButton {
    display: flex;
    flex-direction: row;
    gap: 12px;
  }

  .downButton {
    width: 24px;
    height: 24px;
    color: ${({ theme }) => theme.colors.gray8};
    transform: scaleY(-1);
  }
`;
