import React, { useState } from "react";

import styled from "styled-components";
import CheckboxOn from "../../assets/icons/CheckboxOn.svg?react";
import CheckboxOff from "../../assets/icons/CheckboxOff.svg?react";

const CustomCheckbox = ({ checked, onChange }) => {
  const handleClick = (e) => {
    e.stopPropagation();
    if (onChange) onChange(!checked);
  };

  return (
    <Box>
      {checked ? (
        <CheckboxOn
          height={18}
          width={18}
          alt={"Checked"}
          onClick={handleClick}
        />
      ) : (
        <CheckboxOff
          height={18}
          width={18}
          alt={"Unchecked"}
          onClick={handleClick}
        />
      )}
    </Box>
  );
};

export default CustomCheckbox;

const Box = styled.div`
    cursor: "pointer",
    width: "24px",
    height: "24px",
    userSelect: "none",
`;
