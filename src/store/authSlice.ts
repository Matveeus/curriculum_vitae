import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Thunk } from '.';
import type { User } from '../apollo/types';

interface Auth {
  currentUser: User | null;
}

const initialState: Auth = {
  currentUser: null,
};

const logOut = (): Thunk => dispatch => {
  localStorage.removeItem('token');
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
