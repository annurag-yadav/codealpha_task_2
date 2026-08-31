import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: JSON.parse(localStorage.getItem('socialUser')) || null,
  token: localStorage.getItem('socialToken') || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      localStorage.setItem('socialUser', JSON.stringify(user));
      localStorage.setItem('socialToken', token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('socialUser');
      localStorage.removeItem('socialToken');
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      localStorage.setItem('socialUser', JSON.stringify(state.user));
    },
  },
});

export const { setCredentials, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;
