import {
  GET_REPORT, GET_REPORT_ERROR, GET_REPORT_SUCCESS,
} from 'rdx/newRedux/types';


export default (state = {}, { type, payload }) => {
  switch (type) {
    case GET_REPORT:
      return { ...state, reportLoading: true }
    case GET_REPORT_SUCCESS:
      return { ...state, reportLoading: false, reportDetail: payload }
    case GET_REPORT_ERROR:
      return { ...state, reportLoading: false, reportError: true }
    default:
      return { ...state }
  }
}
