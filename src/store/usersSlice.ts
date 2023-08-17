import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import type { Update } from '@reduxjs/toolkit';
import type { State, Thunk } from './';
import type { User } from '../apollo/types';

const usersAdapter = createEntityAdapter<User>();

const updateUser =
  (payload: Update<User>): Thunk =>
  (dispatch, getState) => {
    dispatch(modifyUser(payload));
    const currentUser = getState().auth.currentUser!;
    if (currentUser.id === payload.id) {
      localStorage.setItem('user', JSON.stringify(currentUser));
    }
  };

const usersSlice = createSlice({
  name: 'users',
  initialState: usersAdapter.getInitialState(),
  reducers: {
    setUsers: usersAdapter.setAll,
    addUser: usersAdapter.addOne,
    modifyUser: usersAdapter.updateOne,
    deleteUser: usersAdapter.removeOne,
  },
});

export const usersSelectors = usersAdapter.getSelectors<State>(state => state.users);
export const { setUsers, addUser, modifyUser, deleteUser } = usersSlice.actions;
export default usersSlice.reducer;
export { updateUser };
