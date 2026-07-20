/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const login = async (email, password) => {
  // alert(email, password);
  // console.log(email, password);
  // console.log('LOGIN');
  try {
    const res = await axios({
      method: 'POST',
      // url: 'http://127.0.0.1:3000/api/v1/users/login',
      url: '/api/v1/users/login',
      data: {
        email,
        password,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Logged in successfully!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
    // console.log(res);
  } catch (err) {
    // console.log(err.response.data);
    showAlert('error', err.response.data.message);
  }
};

export const signup = async (name, email, password, passwordConfirm) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/signup',
      data: {
        name,
        email,
        password,
        passwordConfirm,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Account created successfully!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    showAlert(
      'error',
      err.response?.data?.message || 'Unable to create your account. Try again.',
    );
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      // url: 'http://127.0.0.1:3000/api/v1/users/logout',
      url: '/api/v1/users/logout',
    });
    if (res.data.status === 'success') location.reload(true);
  } catch (err) {
    console.log(err.response);
    showAlert('error', 'Error logging out! Try Again.');
  }
};
