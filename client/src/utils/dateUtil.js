import moment from "moment";
import "moment-timezone";

moment.tz.setDefault("Asia/Seoul");

export const getDiffDateTime = (end, start) => {
  const t1 = start ? moment(start) : moment();
  const t2 = moment(end)
    .utc()
    .format("YYYY-MM-DD HH:mm:ss");
  const diff = moment(t2).diff(t1);

  const d = moment.duration(diff).days();
  const h = moment.duration(diff).hours();
  const m = moment.duration(diff).minutes();
  const s = moment.duration(diff).seconds();

  return { diff, d, h, m, s };
};

export const getNowDateTime = () => moment().format("YYYY-MM-DD HH:mm:ss");
