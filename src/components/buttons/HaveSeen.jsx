import { useState } from "react";
import styled from "styled-components";
import useCustomFetch from "../../utils/hooks/useCustomFetch";

function HaveSeen({ viewed, exhibitionId, onViewedChange }) {
  const [seen, setSeen] = useState(viewed);
  const { fetchData } = useCustomFetch();
  //console.log(exhibitionId);

  const handleToggleSeen = async () => {
    const newSeen = !seen;

    try {
      const response = await fetchData(
        `/scraps/${exhibitionId}/viewed?viewed=${newSeen}`,
        "PATCH"
      );
      if (response?.status === 200) {
        setSeen(newSeen);
        if (onViewedChange) {
          onViewedChange({ newSeen, exhibitionId });
        }
      } else {
        console.error("업데이트 실패:", response);
      }
    } catch (error) {
      console.error("API 호출 오류:", error);
    }
  };

  return (
    <Btn seen={seen} onClick={handleToggleSeen}>
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
