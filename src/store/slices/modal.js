/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  isStudentFormVisible: false,
  isStudentUpdateFromVisible: false,
  isConfirmDeleteStudentModalVisible: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggleStudentForm: (state) => {
      state.isStudentFormVisible = !state.isStudentFormVisible;
    },
    toggleConfirmDeleteStudentModal: (state) => {
      state.isConfirmDeleteStudentModalVisible =
        !state.isConfirmDeleteStudentModalVisible;
    },

    toggleStudentUpdateFrom: (state) => {
      state.isStudentUpdateFromVisible = !state.isStudentUpdateFromVisible;
    },
  },
});

export const {
  toggleStudentForm,
  toggleConfirmDeleteStudentModal,
  toggleStudentUpdateFrom,
} = modalSlice.actions;

export default modalSlice.reducer;
