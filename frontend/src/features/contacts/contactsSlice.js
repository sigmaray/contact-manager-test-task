import { createSlice } from "@reduxjs/toolkit";
import axiosForUser from "../../lib/axiosForUser";
import handleError from "../../lib/handleError";
import noty from "../../lib/noty";
import { remove } from "lodash";

export const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    loading: true,
    contacts: []
  },
  reducers: {
    fetchTransfersSuccess: (state, action) => {
      state.contacts = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    likeContactSuccess: (state, action) => {
      state.contacts.find(item => item.id === action.payload).is_liked = true;
    },
    unlikeContactSuccess: (state, action) => {
      state.contacts.find(item => item.id === action.payload).is_liked = false;
    },
    deleteContactSuccess: (state, action) => {
      remove(state.contacts, item => item.id === action.payload);
    },
    editContactSuccess: (state, action) => {
      state.contacts.forEach(function(item, i) {
        if (item.id === action.payload.id) {
          state.contacts[i] = {
            ...state.contacts[i],
            ...action.payload.values
          };
        }
      });
    },
    createContactSuccess: (state, action) => {
      state.contacts.unshift(action.payload);
    }
  }
});

export const {
  fetchTransfersSuccess,
  setLoading,
  likeContactSuccess,
  unlikeContactSuccess,
  deleteContactSuccess,
  editContactSuccess,
  createContactSuccess
} = contactsSlice.actions;

export const fetchContacts = () => (dispatch, getState) => {
  dispatch(setLoading(true));
  axiosForUser(getState().user.user)
    .get("/api/contacts")
    .then(({ data }) => {
      dispatch(fetchTransfersSuccess(data.contacts));
      dispatch(setLoading(false));
    })
    .catch(function(error) {
      handleError(error);
    });
};

export const likeContact = id => (dispatch, getState) => {
  axiosForUser(getState().user.user)({
    method: "PUT",
    url: `/api/contacts/${id}/like`
  })
    .then(response => {
      noty("Liked contact");
      dispatch(likeContactSuccess(id));
    })
    .catch(error => {
      handleError(error);
    });
};

export const unlikeContact = id => (dispatch, getState) => {
  axiosForUser(getState().user.user)({
    method: "PUT",
    url: `/api/contacts/${id}/unlike`
  })
    .then(response => {
      noty("Unliked contact");
      dispatch(unlikeContactSuccess(id));
    })
    .catch(error => {
      handleError(error);
    });
};

export const deleteContact = id => (dispatch, getState) => {
  axiosForUser(getState().user.user)({
    method: "DELETE",
    url: `/api/contacts/${id}`
  })
    .then(response => {
      noty("Deleted contact");
      dispatch(deleteContactSuccess(id));
    })
    .catch(error => {
      handleError(error);
    });
};

export const editContact = (id, values) => (dispatch, getState) => {
  return axiosForUser(getState().user.user)({
    method: "PUT",
    url: `/api/contacts/${id}`,
    data: { contact: values }
  })
    .then(response => {
      noty("Contact was edited");
      dispatch(editContactSuccess({ id, values }));
    })
    .catch(error => {
      handleError(error);
    });
};

export const createContact = values => (dispatch, getState) => {
  axiosForUser(getState().user.user)({
    method: "POST",
    url: "/api/contacts",
    data: { contact: values }
  })
    .then(response => {
      noty("Contact was created");
      dispatch(createContactSuccess(response.data.contact));
    })
    .catch(error => {
      handleError(error);
    });
};

export const selectContacts = state => state.contacts.contacts;
export const selectLoading = state => state.contacts.loading;

export default contactsSlice.reducer;
