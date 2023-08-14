import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import usersSlice from './usersSlice';
import projectsSlice from './projectsSlice';
import cvsSlice from './cvsSlice';
import type { ThunkAction, AnyAction } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    users: usersSlice,
    projects: projectsSlice,
    cvs: cvsSlice,
  },
});

type State = ReturnType<typeof store.getState>;
type Dispatch = typeof store.dispatch;
type Thunk<ReturnType = void> = ThunkAction<ReturnType, State, unknown, AnyAction>;

export type { State, Dispatch, Thunk };
