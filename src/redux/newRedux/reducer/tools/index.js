import { GET_TOOLS, GET_TOOLS_SUCCESS, GET_TOOLS_ERROR } from 'rdx/newRedux/types';


export const tools = (state = {}, { type, payload }) => {
  const result = {
    [GET_TOOLS]: { loading: true },
    [GET_TOOLS_SUCCESS]: { loading: false, data: payload },
    [GET_TOOLS_ERROR]: { loading: false, error: payload },
  }
  return { ...state, ...result[type] } || { ...state };
}
