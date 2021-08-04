import * as TYPE from 'rdx/newRedux/types';
import * as URL from './url';

const dataApi = {
  report: {
    url: URL.REPORT_URL,
    method: 'GET',
    success: TYPE.GET_REPORT_SUCCESS,
    error: TYPE.GET_REPORT_ERROR,
  },
  reportByDates: {
    url: URL.REPORT_URL_BY_DATE,
    method: 'GET',
    success: TYPE.GET_REPORT_SUCCESS,
    error: TYPE.GET_REPORT_ERROR,
  },
  reportForensic: {
    url: URL.REPORT_FORENSIC_URL,
    method: 'GET',
    success: TYPE.GET_REPORT_SUCCESS_FORENSIC,
    error: TYPE.GET_REPORT_ERROR_FORENSIC,
  },
  reportHistogram: {
    url: URL.REPORT_HISTOGRAM_URL,
    method: 'GET',
    success: TYPE.GET_HISTOGRAM_SUCCESS,
    error: TYPE.GET_HISTOGRAM_ERROR,
  },
  getToolsData: {
    url: URL.TOOLS_URL,
    method: 'GET',
    success: TYPE.GET_TOOLS_SUCCESS,
    error: TYPE.GET_TOOLS_ERROR,
  },
}

export default dataApi;
