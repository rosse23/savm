import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuth: false,
  token: localStorage.getItem('userToken')
    ? localStorage.getItem('userToken')
    : '',
  name: localStorage.getItem('userName')
    ? localStorage.getItem('userName')
    : '',
  role: localStorage.getItem('userRole')
    ? localStorage.getItem('userRole')
    : '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogin(state, action) {
      console.log(action.payload);
      state.token = action.payload.token;
      state.name = action.payload.name;
      state.role = action.payload.role;
      state.isAuth = true;
      localStorage.setItem('userToken', action.payload.token);
      localStorage.setItem('userName', action.payload.name);
      localStorage.setItem('userRole', action.payload.role);
    },
    setLogout(state) {
      state.isAuth = false;
      state.token = '';
      state.name = '';
      state.role = '';
      localStorage.removeItem('userToken');
      localStorage.removeItem('userName');
      localStorage.removeItem('userRole');
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
