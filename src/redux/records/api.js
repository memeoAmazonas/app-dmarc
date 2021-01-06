import axios from 'axios';

const DMARC_API = __CONFIG__.api;


// @flow
/**
 * table = la tabla master a consultar
 * domain = el dominio a consultar
 * matrix = posicion de la matriz a consultar [1 a 9] / cuando es custom date se pasa 0
 * type = tipo de umbral 1 / 7 / 14 / 30 / 90 - Cuando es custom date se pasa 0
 * dateA  = fecha end / cuando es la matriz se deja en blanco
 * dateB = fecha start / cuando es la matriz se deja en blanco
 * chunk = el numero del chunk requerido. Se comienza por cero
 */
export const getCustom = (req) => {
  const path = `${DMARC_API}/custom`;

  const dates = req.startDate && req.endDate && {
    dateB: req.startDate,
    dateA: req.endDate,
  }

  const params = {
    domain: req.domain,
    id: req.id,
    table: req.table,
    matrix: req.matrix || 0,
    type: req.type || 0,
    chunk: req.chunk || 0,
    ...dates
  }
  return axios.get(path, {
    params,
  })
}
