import { get } from 'lodash';

import { useSelector } from 'react-redux';

const getKey = (store, key) => get(store, key);

export default (key) => useSelector((state) => getKey(state, key));
