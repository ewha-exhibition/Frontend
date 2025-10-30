import React, { useState } from "react";

import CheckboxOn from "../../assets/icons/CheckboxOn.svg?react";
import CheckboxOff from "../../assets/icons/CheckboxOff.svg?react";
import styled from "styled-components";

const CustomCheckbox = ({ checked: checkedProp, onChange }) => {
  const [checked, setChecked] = useState(checkedProp || false);

  const handleClick = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    if (onChange) onChange(newChecked);
  };

  return (
    <Box>
        {checked && <CheckboxOn height={18} width={18} alt={"Checked"} onClick={handleClick}/>}
        {!checked && <CheckboxOff height={18} width={18}  alt={"Unchecked"} onClick={handleClick}/>}
    </Box>

  );
};

export default CustomCheckbox;

const Box = styled.div`
    cursor: "pointer",
    width: "24px",
    height: "24px",
    userSelect: "none",
`