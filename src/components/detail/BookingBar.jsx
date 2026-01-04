import { useState, useEffect } from "react";
import styled from "styled-components";
import BookmarkFillIcon from "../../assets/icons/Bookmark.svg";
import BookmarkIcon from "../../assets/icons/BookmarkOL.svg";
import useAxios from "../../utils/hooks/useAxios";

function parsePeriod(periodStr) {
  if (!periodStr || typeof periodStr !== "string") return null;

  const cleaned = periodStr.replace(/\s+/g, " ").trim();
  const parts = cleaned.split("-").map((s) => s.trim());
  if (parts.length < 2) return null;

  const startRaw = parts[0];
  const endRaw = parts.slice(1).join("-");

  const startMatch = startRaw.match(/^(\d{4})\.(\d{2})\.(\d{2})$/);
  if (!startMatch) return null;

  const startYear = Number(startMatch[1]);
  const startMonth = Number(startMatch[2]);
  const startDay = Number(startMatch[3]);

  let endYear = startYear;
  let endMonth, endDay;

  const endFull = endRaw.match(/^(\d{4})\.(\d{2})\.(\d{2})$/);
  const endShort = endRaw.match(/^(\d{2})\.(\d{2})$/);

  if (endFull) {
    endYear = Number(endFull[1]);
    endMonth = Number(endFull[2]);
    endDay = Number(endFull[3]);
  } else if (endShort) {
    endMonth = Number(endShort[1]);
    endDay = Number(endShort[2]);
  } else {
    return null;
  }

  const startDate = new Date(startYear, startMonth - 1, startDay, 0, 0, 0, 0);
  const endDate = new Date(endYear, endMonth - 1, endDay, 23, 59, 59, 999);

  if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime()))
    return null;

  return { startDate, endDate };
}
function computeIsOnGoing(periodStr, now = new Date()) {
  const parsed = parsePeriod(periodStr);
  if (!parsed) return false;

  const t = now.getTime();
  return parsed.startDate.getTime() <= t && t <= parsed.endDate.getTime();
}
function computeIsFree(price) {
  if (price == null) return false;

  if (typeof price === "number") return price === 0;

  if (typeof price === "string") {
    const s = price.trim().toLowerCase();
    if (s === "무료" || s === "free") return true;

    const digits = s.replace(/[^\d]/g, "");
    if (digits.length > 0) return Number(digits) === 0;
  }
  return false;
}

export default function BookingBar({
  exhibitionId,
  isScraped: initialIsScraped,
  scrapCount: initialCount,
  period,
  price,
  link,
}) {
  // 1. useAxios 훅 실행해서 instance 가져오기
  const axiosInstance = useAxios();

  const [isScraped, setIsScraped] = useState(initialIsScraped);
  const [count, setCount] = useState(initialCount ?? 0);

  const isOnGoing = computeIsOnGoing(period);
  const isFree = computeIsFree(price);

  useEffect(() => {
    setIsScraped(initialIsScraped);
    setCount(initialCount ?? 0);
  }, [initialIsScraped, initialCount]);

  const handleScrap = async () => {
    // ID가 없으면 실행 중단
    if (!exhibitionId) return;

    // 롤백을 위한 이전 상태 저장
    const prevScraped = isScraped;
    const prevCount = count;

    // 화면 먼저 변경
    setIsScraped(!prevScraped);
    setCount((prev) => (prevScraped ? prev - 1 : prev + 1));

    try {
      // API 호출 방식 수정
      const method = prevScraped ? "DELETE" : "POST";

      await axiosInstance({
        url: `/scraps/${exhibitionId}`,
        method: method,
      });

      // 성공하면 아무것도 안 해도 됨 (이미 화면은 바뀌어 있음)
      console.log("스크랩 변경 성공");
    } catch (e) {
      console.error("스크랩 에러:", e);

      // 실패 시 원상복구 (
      setIsScraped(prevScraped);
      setCount(prevCount);
      alert("스크랩 변경에 실패했습니다.");
    }
  };

  const handleOpenLink = () => {
    if (!link) return;
    window.open(link, "_blank", "noopener, noreferrer");
  };

  return (
    <Container>
      <ScrapButton type="button" onClick={handleScrap}>
        <img src={isScraped ? BookmarkFillIcon : BookmarkIcon} alt="스크랩" />
        <p>{count}</p>
      </ScrapButton>

      {!isOnGoing && <End>종료</End>}

      {isOnGoing && isFree && (
        <Free>
          <p>예매 없이 바로 입장 가능해요</p>
        </Free>
      )}

      {isOnGoing && !isFree && (
        <BookingButton type="button" onClick={handleOpenLink}>
          예매링크 바로가기
        </BookingButton>
      )}
    </Container>
  );
}

const Container = styled.div`
  width: min(540px, 100vw);
  height: 60px;
  position: fixed;
  bottom: 0;
  padding-left: 20px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  background-color: ${({ theme }) => theme.colors.white};
  border-top: 0.5px solid ${({ theme }) => theme.colors.gray3};
`;
//CHECK: 스크랩 버튼 터치 영역?
const ScrapButton = styled.button`
  width: 78px;
  height: 44px;
  padding: 10px 16px 10px 17px;
  margin-right: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 5px;
  img {
    width: 24px;
    height: 24px;
  }
  p {
    ${({ theme }) => theme.textStyles.titleSemiBold};
    color: ${({ theme }) => theme.colors.gray8};
  }
`;

const BookingButton = styled.button`
  width: 100%;
  height: 44px;
  border-radius: 6px;
  margin-right: 20px;
  background-color: ${({ theme }) => theme.colors.Primary50};

  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  line-height: 130%;
`;

//CHECK: 활성화 버튼과 스타일 통일?
const End = styled.button`
  width: 100%;
  height: 44px;
  border-radius: 6px;
  margin-right: 20px;
  background-color: ${({ theme }) => theme.colors.gray4};

  color: ${({ theme }) => theme.colors.gray7};
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  line-height: 130%;
`;

const Free = styled.div`
  width: 100%;
  height: 100%;
  padding: 13px 55px;
  margin-left: 8px;

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.Primary20};
  p {
    color: ${({ theme }) => theme.colors.Primary60};
    text-align: center;
    font-size: 14px;
    font-weight: ${({ theme }) => theme.font.fontWeight.semiBold};
    line-height: 130%;
  }
`;
