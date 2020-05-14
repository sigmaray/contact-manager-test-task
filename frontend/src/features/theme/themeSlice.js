import { createSlice } from '@reduxjs/toolkit';

export const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    theme: 'white',
  },
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;

export const loadThemeFromLocalStorage = () => dispatch => {
  const t = localStorage.getItem("theme");
  if (t) dispatch(setTheme(t));
};

export const selectTheme = state => state.theme.theme;

export default themeSlice.reducer;
