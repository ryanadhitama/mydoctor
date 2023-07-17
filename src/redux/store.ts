import { createStore } from 'redux';

const initialState = {
  loading: false,
  name: 'Prawito Hudoro',
  address: 'Cisauk'
};

const reducer = (state = initialState, action: any) => {
  if (action.type === 'SET_LOADING') {
    return {
      ...state,
      loading: action.value
    };
  }
  if (action.type === 'SET_NAME') {
    return {
      ...state,
      name: 'Azzamy'
    };
  }
  return state;
};

const store = createStore(reducer);

export default store;
