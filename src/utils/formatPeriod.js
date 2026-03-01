export function formatPeriod(period) {
  if (!period || typeof period !== "string") return period;

  const parts = period
    .split("-")
    .map((s) => s.trim())
    .filter(Boolean);
  if (parts.length < 2) return period;

  const start = parts[0];
  const end = parts.slice(1).join("-").trim();

  // 같은 날짜면 단일 날짜로 표시
  if (start === end) return start;

  // 단축 종료일이 시작일과 같으면 단일 날짜로 표시: "2025.03.01" vs "03.01"
  const startShort = start.slice(5);
  if (startShort === end) return start;

  // 종료일이 완전한 날짜 형식("YYYY.MM.DD")이고 연도가 같으면 연도 생략
  const endFullMatch = end.match(/^(\d{4})\.(\d{2}\.\d{2})$/);
  if (endFullMatch) {
    const startYear = start.slice(0, 4);
    const endYear = endFullMatch[1];
    const endShort = endFullMatch[2];
    if (startYear === endYear) {
      return `${start} - ${endShort}`;
    }
  }

  return period;
}
