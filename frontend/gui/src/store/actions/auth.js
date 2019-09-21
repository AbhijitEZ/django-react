import axios from "axios";
import * as actionTypes from "./actionTypes";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};
export const authSuccess = token => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token
  };
};
export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

const checkAuthTimeout = expirationData => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationData * 1000);
  };
};

export const authLogin = (username, password) => {
  return dispatch => {
    dispatch(authStart());
    axios
      .post("http://127.0.0.1:8000/rest-auth/login/", {
        username: username,
        password: password
      })
      .then(res => {
        const token = res.data.key;
        const expirationData = new Date(new Date().getTime() + 3600 * 1);
        localStorage.setItem("token", token);
        localStorage.username("expirationData", expirationData);
        dispatch(authSuccess(token));
        dispatch(checkAuthTimeout());
      })
      .catch(err => {
        dispatch(authFail(err));
      });
  };
};
export const authSignup = (username, email, password1, password2) => {
  return dispatch => {
    dispatch(authStart());
    axios
      .post("http://127.0.0.1:8000/rest-auth/registration/", {
        username: username,
        email: email,
        password1: password1,
        password2: password2
      })
      .then(res => {
        const token = res.data.key;
        const expirationData = new Date(new Date().getTime() + 3600 * 1);
        localStorage.setItem("token", token);
        localStorage.username("expirationData", expirationData);
        dispatch(authSuccess(token));
        dispatch(checkAuthTimeout());
      })
      .catch(err => {
        dispatch(authFail(err));
      });
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    if (token !== undefined) {
      dispatch(logout());
    } else {
      let expirationData = new Date(localStorage.getItem(expirationData));
      if (expirationData <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(token));
        dispatch(
          checkAuthTimeout(
            (expirationData.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationData");
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};
