import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});

type State = ReturnType<typeof store.getState>;
type Dispatch = typeof store.dispatch;

export type { State, Dispatch };
