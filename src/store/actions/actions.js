import * as actionTypes from "./actionTypes";
import UserAPI from "../../api/UserAPI";
import * as IP from "../../Host";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authLogout = () => {
  localStorage.removeItem("user-token");
  localStorage.removeItem("expirationDate");
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const authCheck = (token, isLoggedIn) => {
  return {
    type: actionTypes.AUTH_CHECK,
    token: token,
    isLoggedIn: isLoggedIn
  };
};

export const authSuccess = (token, isLoggedIn) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    isLoggedIn: isLoggedIn
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(authLogout());
    }, expirationTime * 1000);
  };
};

export const authLogin = userObject => {
  return dispatch => {
    dispatch(authStart());
    fetch(`${IP.Host_IP}/token-auth/`, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(userObject)
    }).then(async res => {
      const data = await res.json();
      const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
      localStorage.setItem("user-token", data.token);
      localStorage.setItem("expirationDate", expirationDate);
      dispatch(authSuccess(data.token, true));
      dispatch(checkAuthTimeout(3600));
    });
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem("user-token");
    if (token === undefined) {
      dispatch(authLogout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(authLogout());
      } else {
        dispatch(authCheck(token, true));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getItem() - new Date().getItem()) / 1000
          )
        );
      }
    }
  };
};
