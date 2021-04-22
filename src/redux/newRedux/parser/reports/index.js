import keys from 'lodash/keys';

export const parserRegister = (actually, data) => {
  return { ...actually, ...JSON.parse(data) }
}
export const parserHistogram = (data) => {
  const response = [];
  const k = keys(data);
  k.forEach((item) => {
    response.push({
      label: `histogram.${item.toLowerCase()}`,
      data: data[item].map((i) => ([i.x, parseFloat(i.y)])),
    })
  })
  return response;
}
