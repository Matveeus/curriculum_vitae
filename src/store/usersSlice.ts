import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import type { State } from './';
import type { User } from '../apollo/types';

const usersAdapter = createEntityAdapter<User>();

const usersSlice = createSlice({
  name: 'users',
  initialState: usersAdapter.getInitialState(),
  reducers: {
    setUsers: usersAdapter.setAll,
    addUser: usersAdapter.addOne,
    updateUser: usersAdapter.updateOne,
    deleteUser: usersAdapter.removeOne,
  },
});

export const usersSelectors = usersAdapter.getSelectors<State>(state => state.users);
export const { setUsers, addUser, updateUser, deleteUser } = usersSlice.actions;
export default usersSlice.reducer;
