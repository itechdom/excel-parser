export const searchModel = (medications, query, type) => {
  let q = query.title.$regex;
  let a = [];
  return new Promise((resolve, reject) => {
    if (type && type !== "ALL") {
      a = medications.filter(m => {
        return (
          m.title.toLowerCase().match(new RegExp(q.toLowerCase())) &&
          m["Medication Type"] === type
        );
      });
    } else {
      a = medications.filter(m => {
        return m.title.toLowerCase().match(new RegExp(q.toLowerCase()));
      });
    }
    return resolve(a);
  });
};
