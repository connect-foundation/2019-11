const getDDay = (date) => {
  const dday = new Date(date);
  const now = new Date();

  const gap = now.getTime() - dday.getTime();
  const result = Math.floor(gap / (1000 * 60 * 60 * 24)) * -1;
  return result;
}

export default getDDay;