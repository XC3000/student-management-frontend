/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../config";
import moment from "moment";

const fetchStudents = createAsyncThunk(`fetch students`, async () => {
  const response = await axiosInstance.get("/student");
  return response.data.data;
});

const addStudent = createAsyncThunk(`add student`, async (studentData) => {
  const response = await axiosInstance.post("/student", studentData);
  return response.data.data;
});

const deleteStudent = createAsyncThunk(`delete student`, async (id) => {
  const response = await axiosInstance.delete(`/student/${id}`);
  return response.data.data;
});

const updateStudent = createAsyncThunk(
  `update student`,
  async (studentData) => {
    const id = studentData._id ? studentData._id : studentData.get("_id");

    const response = await axiosInstance.put(`/student/${id}`, studentData);
    return response.data.data;
  }
);

export const initialState = {
  students: [],
  loading: false,
  error: null,

  student: {},
  studentLoading: false,
  studentError: null,

  addStudentLoading: false,

  studentToDelete: {},

  selectedStudent: {},

  studentUpdatingLoading: false,
  studentUpdatingError: null,

  studentDeletingLoading: false,
  studentDeletingError: null,
};

export const studentSlice = createSlice({
  name: "students",
  initialState,

  reducers: {
    setStudentToDelete: (state, action) => {
      state.studentToDelete = action.payload;
    },
    removeStudentToDelete: (state) => {
      state.studentToDelete = {};
    },

    setSelectedStudent: (state, action) => {
      state.selectedStudent = action.payload;
    },
    removeSelectedStudent: (state) => {
      state.selectedStudent = {};
    },

    filterBDay: (state) => {
      const students = state.students;

      const month = (new Date().getMonth() + 1).toString().padStart(2, 0);
      const day = new Date().getDate().toString().padStart(2, 0);

      const sortedStudents = students.filter((student) => {
        if (moment(student.dob).format("MM") > month) {
          return student;
        } else if (
          moment(student.dob).format("MM") === month &&
          moment(student.dob).format("DD") > day
        ) {
          return student;
        }
        return false;
      });

      state.students = sortedStudents;
    },

    filterByPercentage: (state) => {
      const students = state.students;
      students.sort((a, b) => {
        if (a.percentage > b.percentage) return 1;
        if (a.percentage < b.percentage) return -1;
        return 0;
      });

      console.log(students);

      state.students = students;
    },
  },

  extraReducers: (builder) => {
    /*
     * fetchStudents Cases
     */

    builder.addCase(fetchStudents.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchStudents.fulfilled, (state, action) => {
      state.loading = false;
      state.students = action.payload;
    });
    builder.addCase(fetchStudents.rejected, (state) => {
      state.loading = false;
    });

    /*
     * Add Student Cases
     */

    builder.addCase(addStudent.pending, (state) => {
      state.addStudentLoading = true;
    });
    builder.addCase(addStudent.fulfilled, (state, action) => {
      state.addStudentLoading = false;
      state.students = [...state.students, action.payload];
    });
    builder.addCase(addStudent.rejected, (state) => {
      state.addStudentLoading = false;
    });

    /*
     * Delete Student Cases
     */

    builder.addCase(deleteStudent.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteStudent.fulfilled, (state, action) => {
      const students = state.students;

      const sortedStudents = students.filter(
        (student) =>
          student._id.toString() !== state.studentToDelete._id.toString()
      );

      state.students = sortedStudents;

      state.studentToDelete = {};
      state.loading = false;
    });
    builder.addCase(deleteStudent.rejected, (state) => {
      state.loading = false;
    });

    /*
     * Update Student Cases
     */

    builder.addCase(updateStudent.pending, (state) => {
      state.studentUpdatingLoading = true;
    });
    builder.addCase(updateStudent.fulfilled, (state, action) => {
      const students = state.students;

      const studentIndex = students.findIndex(
        (student) =>
          student._id.toString() === state.selectedStudent._id.toString()
      );

      students[studentIndex] = action.payload;

      state.studentUpdatingLoading = false;
    });
    builder.addCase(updateStudent.rejected, (state, action) => {
      state.studentUpdatingLoading = false;
      state.studentUpdatingError = action.payload;
    });
  },
});

export default studentSlice.reducer;

export const {
  setStudentToDelete,
  removeStudentToDelete,
  setSelectedStudent,
  removeSelectedStudent,
  filterBDay,
  filterByPercentage,
} = studentSlice.actions;

export { fetchStudents, addStudent, deleteStudent, updateStudent };
