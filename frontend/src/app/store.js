import { configureStore } from "@reduxjs/toolkit";
import contactsReducer from "../features/contacts/contactsSlice";
import themeReducer from "../features/theme/themeSlice";
import userReducer from "../features/user/userSlice";

export default configureStore({
  reducer: {
    contacts: contactsReducer,
    theme: themeReducer,
    user: userReducer
  }
});
