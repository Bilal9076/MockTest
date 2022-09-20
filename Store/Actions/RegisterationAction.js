export const USER_AUTHENTICATE = 'USER_AUTHENTICATE';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Authenticate = (userId, token, expiryTime) => {
  return dispatch => {
    dispatch({
      type: USER_AUTHENTICATE,
      userId: userId,
      token: token
    });
  };
};

export const signup = (email, password) => {
  return async dispatch => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA0n0DjQVH-8g5KlqAV5tUMyGgE4bWQdPM',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true
        })
      }
    );
    if (!response.ok) {
      const ResErrData = await response.json();
      const ErrorId = ResErrData.error.message;
      let message = 'Something went wrong!'
      if (ErrorId === 'EMAIL_EXISTS') {
          message = 'This email is already exist!'
      } else if (ErrorId === 'OPERATION_NOT_ALLOWED') {
          message = 'Password sign-in is disabled!'
      } else if (ErrorId === 'TOO_MANY_ATTEMPTS_TRY_LATER') {
          message = "Try again later!"
      }
      throw new Error(message);
  }
    const resData = await response.json();
    dispatch(Authenticate(resData.localId, resData.idToken, parseInt(resData.expiresIn) * 1000));
    const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
    saveDataToStorage(resData.idToken, resData.localId, expirationDate);
  };
};


const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    'UserData',
    JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expirationDate.toISOString()
    })
  )

};

