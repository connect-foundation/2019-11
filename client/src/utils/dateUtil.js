import moment from "moment";

export const getDiffDateTime = (end, start) => {
  const t1 = moment(start);
  const t2 = moment(end);
  const diff = t2.diff(t1);

  const d = moment.duration(diff).days();
  const h = moment.duration(diff).hours();
  const m = moment.duration(diff).minutes();
  const s = moment.duration(diff).seconds();

  return { diff, d, h, m, s };
};
