import { createSlice } from "@reduxjs/toolkit";
import { fetchContacts } from "../contacts/contactsSlice";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null
  },
  reducers: {
    setUser: (state, action) => {
      if (!JSON.parse(localStorage.getItem("currentUser")))
        localStorage.setItem("currentUser", JSON.stringify(action.payload));
      state.user = action.payload;
    }
  }
});

export const { setUser } = userSlice.actions;

export const selectUser = state => state.user.user;

export const signOut = () => dispatch => {
  localStorage.removeItem("currentUser");
  dispatch(setUser(null));
};

export const setUserAndFetchContacts = u => dispatch => {
  dispatch(setUser(u));
  dispatch(fetchContacts());
};

export const loadUserFromLocalStorage = () => dispatch => {
  const u = JSON.parse(localStorage.getItem("currentUser"));
  if (u) {
    dispatch(setUserAndFetchContacts(u));
  }
};

export default userSlice.reducer;
