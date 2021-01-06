

const alignment = {
  alignedAuthenticated: 0,
  alignedUnauthenticated: 0,
  notAligned: 0,
  percentage: 0,
}

export const check = {
  pass: 0,
  fail: 0,
  total: 0,
  percentage: 0,
};

const matrix = {
  passpass: 0,
  passneutral: 0,
  passfail: 0,
  neutralpass: 0,
  neutralneutral: 0,
  nnneutralfail: 0,
  failpass: 0,
  failneutral: 0,
  failfail: 0,
}


export const initialState = {
  authorized: {
    ...check,
  },
  authenticated: {
    ...check,
  },
  dmarc: {
    ...check,
  },
  totalAuthenticated: {
    ...check,
  },
  alignment: {
    spf: {
      ...alignment,
    },
    dkim: {
      ...alignment,
    },
  },
  matrix,
}
