import { createSlice } from '@reduxjs/toolkit';
import { modifyUser } from './usersSlice';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Thunk } from '.';
import type { User } from '../apollo/types';

interface Auth {
  currentUser: User | null;
}

const storedUser = localStorage.getItem('user');

const initialState: Auth = {
  currentUser: storedUser && JSON.parse(storedUser),
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
  extraReducers: builder => {
    builder.addCase(modifyUser, (state, action) => {
      const currentUser = state.currentUser!;
      const { id, changes } = action.payload;
      if (id === currentUser.id) {
        state.currentUser = { ...currentUser, ...changes };
      }
    });
  },
});

export const { setCurrentUser } = authSlice.actions;
export { logOut };
export default authSlice.reducer;
