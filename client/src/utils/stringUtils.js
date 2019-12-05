const getDDay = date => {
  const dday = new Date(date);
  const now = new Date();

  const gap = now.getTime() - dday.getTime();
  const result = Math.floor(gap / (1000 * 60 * 60 * 24)) * -1;
  return result;
};

const getNowDateTime = () => {
  const today = new Date();

  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  const hour = today.getHours();
  const minute = today.getMinutes();
  const second = today.getSeconds();

  return `${year}-${month}-${date} ${hour}:${minute}:${second}`;
};

export { getDDay, getNowDateTime };
