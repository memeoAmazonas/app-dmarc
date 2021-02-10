import _ from 'lodash'

import { Summary } from 'common/classes/summary/summary.class';

// PC1  - Valor de la Matriz  PASS    PASS
// PC2  - Valor de la Matriz  PASS    NEUTRAL
// PC3  - Valor de la Matriz  PASS    FAIL
// PC4  - Valor de la Matriz  NEUTRAL PASS
// PC5  - Valor de la Matriz  NEUTRAL NEUTRAL
// PC6  - Valor de la Matriz  NEUTRAL FAIL
// PC7  - Valor de la Matriz  FAIL    PASS
// PC8  - Valor de la Matriz  FAIL    NEUTRAL
// PC9  - Valor de la Matriz  FAIL    FAIL
const parseMatrixSummary = (summary: Summary, data) => {
  summary.addMatrixState('pass', 'pass', Number(data.PC1));
  summary.addMatrixState('pass', 'neutral', Number(data.PC2));
  summary.addMatrixState('pass', 'fail', Number(data.PC3));
  summary.addMatrixState('neutral', 'pass', Number(data.PC4));
  summary.addMatrixState('neutral', 'neutral', Number(data.PC5));
  summary.addMatrixState('neutral', 'fail', Number(data.PC6));
  summary.addMatrixState('fail', 'pass', Number(data.PC7));
  summary.addMatrixState('fail', 'neutral', Number(data.PC8));
  summary.addMatrixState('fail', 'fail', Number(data.PC9));
}

// PC10  - Numero de mensajes autorizados
// PC11  - Numero de mensajes NO autorizados
// PC12  - % de mensajes autorizados
const parseAuthorized = (summary: Summary, data) => {
  summary.addMessageState('authorized', Number(data.PC10), Number(data.PC11), Number(data.PC12));
}

// PC13  - Numero de mensajes autenticados
// PC14  - Numero de mensajes NO autenticados
// PC15  - % de mensajes autenticados
const parseAuthenticated = (summary: Summary, data) => {
  summary.addMessageState('authenticated', Number(data.PC13), Number(data.PC14), Number(data.PC15));
}

// PC16  - Numero de mensajes que pasaron DMARC
// PC17  - Numero de mensajes que no pasaron DMARC
// PC18  - % de mensajes que pasaron DMARC
const parseDmarc = (summary: Summary, data) => {
  summary.addMessageState('dmarc', Number(data.PC16), Number(data.PC17), Number(data.PC18));
}

// PC20  - Numero de mensajes SPF Alignment = TRUE + SPF Auth Result = PASS
// PC21 - Numero de mensajes SPF Alignment = TRUE + SPF Auth Result = NOT PASS
// PC22 - Numero de mensajes SPF Alignment = FALSE
// PC23 - Numero de mensajes DKIM Alignment = TRUE + DKIM Auth Result = PASS
// PC24 - Numero de mensajes DKIM Alingment = TRUE + DKIM Auth Result = NOT PASS
// PC25 - Numero de mensajes DKIM Alingment = FALSE
const parseAlignment = (summary: Summary, data) => {
  summary.addAlignmentState('spf', Number(data.PC20), Number(data.PC21), Number(data.PC22))
  summary.addAlignmentState('dkim', Number(data.PC23), Number(data.PC24), Number(data.PC25))
}

// PC26 - Numero de mensajes Autenticados (SPF o DKIM) Resta del calculo fail y totales
// PC27 - Numero de mensajes Autenticado FAIL (SPF y DKIM) auth result SPF = fail AND auth result dkim = fail
// PC28 - % de mensajes Autenticado (SPF o DKIM) Resta del calculo fail y totales
// PC29 - % de mensajes Autenticado FAIL (SPF y DKIM) auth result SPF = fail AND auth result dkim = fail"
const parseTotalAuthenticated = (summary: Summary, data) => {
  summary.addMessageState('totalAuthenticated', Number(data.PC26), Number(data.PC27))
}

// PC19  - Total de mensajes
const parseTotalMessages = (summary: Summary, data) => {
  summary.addTotalMessagesState(Number(data.PC19));
}

export const computeTotalMessages = (summaries) => {
  if (!_.isEmpty(summaries)) {
    return _.cloneDeep(summaries).reduce((acc, summary) => {
      acc.add(summary)
      return acc;
    })
  }
  return new Summary();
}

export const parsePrecalculatedResponse = (response) => {
  const { data } = response;
  const result = {}

  if (!_.isEmpty(data)) {
    data.forEach((item) => {
      const domain = item.CustomerD;
      const dayGroup = Number(item.Id.split('_')[2]);
      const summary = new Summary();

      // TODO: Maybe use a builder to create the summary
      // pattern
      parseTotalMessages(summary, item);
      parseMatrixSummary(summary, item);
      parseAuthorized(summary, item);
      parseAuthenticated(summary, item);
      parseDmarc(summary, item);
      parseTotalAuthenticated(summary, item);
      parseAlignment(summary, item);


      result[domain] = {
        ...result[domain],
        [dayGroup]: summary,
      }
    });
  }

  return result;
};
