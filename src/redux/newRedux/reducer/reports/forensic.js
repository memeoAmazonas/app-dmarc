import {
  DATE_REPORT_FILTER_FORENSIC,
  GET_REPORT_ERROR_FORENSIC,
  GET_REPORT_FORENSIC,
  GET_REPORT_SUCCESS_FORENSIC,
} from 'rdx/newRedux/types';


export default (state = {}, { type, payload }) => {
  switch (type) {
    case GET_REPORT_FORENSIC:
      return { ...state, reportLoading: true }
    case GET_REPORT_SUCCESS_FORENSIC:
      return { ...state, reportLoading: false, reportDetail: payload.result }
    case GET_REPORT_ERROR_FORENSIC:
      return { ...state, reportLoading: false, reportError: true }
    case DATE_REPORT_FILTER_FORENSIC:
      return { ...state, filters: payload }
    default:
      return { ...state }
  }
}
