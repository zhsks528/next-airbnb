// 월 (1월부터 12월까지)
export const monthList = [
  "1월",
  "2월",
  "3월",
  "4월",
  "5월",
  "6월",
  "7월",
  "8월",
  "9월",
  "10월",
  "11월",
  "12월",
];

// 일 (1일부터 31일까지)
export const dayList = Array.from(Array(31), (_, i) => String(i + 1));

// 년도 (2020년도부터 1900년도까지)
export const yearList = Array.from(Array(121), (_, i) => String(2020 - i));
