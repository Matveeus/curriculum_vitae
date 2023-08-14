import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import type { State } from './';
import type { Cv } from '../apollo/types';

const cvsAdapter = createEntityAdapter<Cv>();

const cvsSlice = createSlice({
  name: 'cvs',
  initialState: cvsAdapter.getInitialState(),
  reducers: {
    setCvs: cvsAdapter.setAll,
    addCv: cvsAdapter.addOne,
    updateCv: cvsAdapter.updateOne,
    deleteCv: cvsAdapter.removeOne,
  },
});

export const cvsSelectors = cvsAdapter.getSelectors<State>(state => state.cvs);
export const { setCvs, addCv, updateCv, deleteCv } = cvsSlice.actions;
export default cvsSlice.reducer;
