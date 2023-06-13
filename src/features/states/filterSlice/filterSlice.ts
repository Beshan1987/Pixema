import { createSlice } from '@reduxjs/toolkit';

export interface FilterState {
  isOpen: boolean;
}

export const initialState: FilterState = {
  isOpen: false
};

export const filterSlice = createSlice({
  name: 'filterSwitch',
  initialState,
  reducers: {
    switchFilterState: (state) => {
      state.isOpen === false ? (state.isOpen = true) : (state.isOpen = false);
    }
  }
});

export const { switchFilterState } = filterSlice.actions;

export const filterReducer = filterSlice.reducer;
