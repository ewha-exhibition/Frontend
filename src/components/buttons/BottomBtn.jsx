import styled from "styled-components";

function BottomBtn({ activated, text, onClick }) {
  return (
    <Bar>
      <Btn
        type="button"
        activated={activated}
        onClick={activated ? onClick : undefined}
      >
        {text}
      </Btn>
    </Bar>
  );
}

export default BottomBtn;

const Bar = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: min(540px, 100vw); /* ✅ AppLayout 너비랑 맞추기 */
  padding: 0 20px 40px; /* ✅ 기존 margin: 0 20px 40px 20px 대체 */
  background: transparent;
  z-index: 150;
`;

const Btn = styled.button`
  width: 100%;
  height: 50px;
  border: none;
  border-radius: 6px;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${({ activated, theme }) =>
    activated ? theme?.colors?.Primary50 : theme?.colors?.gray4};
  color: ${({ activated, theme }) =>
    activated ? theme?.colors?.white : theme?.colors?.gray7};

  font-size: ${({ theme }) => theme.font.fontSize.label16};
  font-weight: ${({ theme }) => theme.font.fontWeight.semiBold};

  cursor: ${({ activated }) => (activated ? "pointer" : "default")};
  -webkit-tap-highlight-color: transparent;
`;
