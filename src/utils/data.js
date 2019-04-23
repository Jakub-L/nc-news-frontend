export const convertArticleDate = fullDate => {
  const [, date, time] = /(.*)T(.*):/.exec(fullDate) || [];
  if (!date || !time) return '';
  return `${date} at ${time}`;
};
