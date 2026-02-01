import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function WriteReview({ haveReview, exhibitionId }) {
  const navigate = useNavigate();
  const toReview = () => {
    navigate(`/createReview/${exhibitionId}`);
  };
  const toDetail = () => {
    navigate(`/detail/${exhibitionId}`);
  };

  return (
    <Btn haveReview={haveReview} onClick={!haveReview ? toReview : toDetail}>
      {haveReview ? "후기 보러가기" : "후기 작성하기"}
    </Btn>
  );
}

export default WriteReview;

const Btn = styled.button`
  width: 94px;
  height: 32px;
  border-radius: 100px;

  font-size: ${({ theme }) => theme.font.fontSize.label12};
  font-weight: ${({ theme }) => theme.font.fontWeight.semiBold};
  line-height: ${({ theme }) => theme.font.lineHeight.normal};
  color: ${({ haveReview, theme }) =>
    haveReview ? theme.colors.white : theme.colors.Primary50};

  background: ${({ haveReview, theme }) =>
    haveReview ? theme.colors.Primary70 : "transparent"};
  border: 1px solid
    ${({ haveReview, theme }) => (haveReview ? "none" : theme.colors.Primary50)};
`;
