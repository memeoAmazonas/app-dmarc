export const parserRegister = (actually, data) => {
  return { ...actually, ...JSON.parse(data) }
}
