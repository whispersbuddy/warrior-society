import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allCategories: [],
  publicFields: {},
  newNotifications: [],
  allCmsData: [],
};

const commonSlice = createSlice({
  name: "commonSlice",
  initialState,
  //   reducer needs a map
  reducers: {
    setAllCategories(state, action) {
      state.allCategories = action.payload;
    },
    setAllPublicFields(state, action) {
      state.publicFields = action.payload;
    },
    saveNewNotification(state, action) {
      state.newNotifications = action.payload;
    },
    setAllCmsData(state, action) {
      state.allCmsData = action.payload;
    },
  },
});

export const {
  setAllCategories,
  setAllPublicFields,
  saveNewNotification,
  setAllCmsData,
} = commonSlice.actions;

export default commonSlice.reducer;
