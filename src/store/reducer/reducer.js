import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  token: null,
  isLoggedIn: false,
  error: null,
  userlog: null,
  allUser: []
};

const authLogout = state => {
  return updateObject(state, {
    token: null,
    isLoggedIn: false
  });
};

const authLogin = (state, action) => {
  return updateObject(state, {
    token: action.token,
    isLoggedIn: true,
    error: null
  })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state);
    case actionTypes.AUTH_SUCCESS:
      return authLogin(state, action);
    default:
      return state;
  }
};

export default reducer;
