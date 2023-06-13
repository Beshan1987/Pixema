import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface DataState {
  data: string | null;
}

export const initialState: DataState = {
  data: ''
};

export const searchDataSlice = createSlice({
  name: 'searchData',
  initialState,
  reducers: {
    getSearchData: (state, action: PayloadAction<string | null>) => {
      state.data = action.payload;
    }
  }
});

export const { getSearchData } = searchDataSlice.actions;

export const searchDataReducer = searchDataSlice.reducer;
