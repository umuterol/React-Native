import AsyncStorage from '@react-native-async-storage/async-storage'

export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";
let timer;

export const authenticate = (token, userId, expiresIn) => {
  return dispatch => {
    dispatch(setLogoutTimer(expiresIn))
    dispatch({ type: AUTHENTICATE, token, userId });
  }
}

export const logout = () => {
  AsyncStorage.removeItem('userData');
  clearLogoutTimer();
  return { type: LOGOUT };
}

const clearLogoutTimer = () => {
  if (timer)
    clearTimeout(timer)
}

export const setLogoutTimer = (expiresIn) => {
  console.log(typeof expiresIn)
  return dispatch => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expiresIn)
  }
}

export const signup = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBunBJ2E8TQ-YHm9ZO0UFeuir_Wv9ip6-0",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    const resData = await response.json();
    if (!response.ok) {
      const messageId = resData.error.message;
      let message = "Something went wrong!";
      if (messageId === "EMAIL_EXISTS") {
        message = "This email exist already.";
      }
      throw new Error(message);
    }
    const { expiresIn } = resData;
    const expireDate = new Date(new Date().getTime() + parseInt(expiresIn) * 1000).toISOString();
    dispatch(authenticate(resData.idToken, resData.localId, parseInt(expiresIn) * 1000));
    storeData({ token: resData.idToken, userId: resData.localId, expireDate });
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBunBJ2E8TQ-YHm9ZO0UFeuir_Wv9ip6-0",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    const resData = await response.json();
    if (!response.ok) {
      const messageId = resData.error.message;
      let message = "Something went wrong!";
      if (messageId === "EMAIL_NOT_FOUND") {
        message = "This email could not be found";
      } else if (messageId === "INVALID_PASSWORD") {
        message = "This password is not valid!";
      }
      throw new Error(message);
    }
    const { expiresIn } = resData;
    const expireDate = new Date(new Date().getTime() + parseInt(expiresIn) * 1000).toISOString();
    dispatch(authenticate(resData.idToken, resData.localId, parseInt(expiresIn) * 1000));
    storeData({ token: resData.idToken, userId: resData.localId, expireDate });
  };
};

const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem('userData', jsonValue)
  } catch (e) {
    // saving error
    throw new Error(e.message);
  }
}