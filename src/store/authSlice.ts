import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Thunk } from '.';
import type { User } from '../apollo/types';

interface Auth {
  currentUser: Partial<User> | null;
}

const initialState: Auth = {
  currentUser: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null,
};

const logOut = (): Thunk => dispatch => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  dispatch(setCurrentUser(null));
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<Auth['currentUser']>) => {
      state.currentUser = action.payload;
    },
  },
});

export const { setCurrentUser } = authSlice.actions;
export { logOut };
export default authSlice.reducer;
