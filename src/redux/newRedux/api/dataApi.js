import { GET_REPORT_ERROR, GET_REPORT_SUCCESS } from 'rdx/newRedux/types';
import { REPORT_URL, REPORT_URL_BY_DATE } from './url';

const dataApi = {
  report: {
    url: REPORT_URL,
    method: 'GET',
    success: GET_REPORT_SUCCESS,
    error: GET_REPORT_ERROR,
  },
  reportByDates: {
    url: REPORT_URL_BY_DATE,
    method: 'GET',
    success: GET_REPORT_SUCCESS,
    error: GET_REPORT_ERROR,
  },
}

export default dataApi;
