import {
  GET_HISTOGRAM,
  GET_HISTOGRAM_ERROR,
  GET_HISTOGRAM_SUCCESS,
} from 'rdx/newRedux/types';

export default (state = {}, { type, payload }) => {
  switch (type) {
    case GET_HISTOGRAM:
      return { ...state, reportLoading: true }
    case GET_HISTOGRAM_SUCCESS:
      return { ...state, reportLoading: false, reportDetail: payload }
    case GET_HISTOGRAM_ERROR:
      return { ...state, reportLoading: false, reportError: true }
    default:
      return { ...state }
  }
}
