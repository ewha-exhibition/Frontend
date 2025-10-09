import styled from "styled-components";

function BottomBtn({ activated, text }) {
  return <Btn activated={activated}>{text}</Btn>;
}

export default BottomBtn;

const Btn = styled.div`
  width: calc(100% - 40px);
  margin: 0 20px 40px 20px;
  height: 50px;

  position: fixed;
  bottom: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;
 
  background-color: ${({ activated, theme }) =>
    activated ? theme?.colors?.Primary50 : theme?.colors?.gray4};
  color: ${({ activated, theme }) =>
    activated ? theme?.colors?.white : theme?.colors?.gray7};
  font-size: ${({ theme }) => theme.font.fontSize.label16};
  font-weight: ${({ theme }) => theme.font.fontWeight.semiBold};

  border: none;
  border-radius: 6px;
  cursor: ${({ activated }) => (activated ? "pointer" : "default")};
`;
