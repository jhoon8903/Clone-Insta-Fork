import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const __addPostThunk = createAsyncThunk(
  "ADD_POST",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.post(`posts`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("게시글 작성", data);
      return thunkAPI.fulfillWithValue(data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.code);
    }
  }
);

export const __updatePostThunk = createAsyncThunk(
  "UPDATE_POST",
  async (payload, thunkAPI) => {
    try {
      axios.patch(`/main`, payload);
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.code);
    }
  }
);

const initialState = {
  post: {
    id: 0,
    body: "",
    nickname: "",
    content: "",
  },
  error: null,
  isLoading: false,
  isUploadModal: false,
};

export const uploadSlice = createSlice({
  name: "upload",
  initialState,
  reducers: {
    isUploadModalGlobalAction: (state, action) => {
      state.isUploadModal = action.payload;
    },
  },

  extraReducers: {
    [__addPostThunk.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.todo = action.payload;
    },
    [__addPostThunk.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__addPostThunk.pending]: (state) => {
      state.isLoading = true;
    },
    [__updatePostThunk.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.todo = action.payload;
    },
    [__updatePostThunk.pending]: (state) => {
      state.isLoading = true;
    },
    [__updatePostThunk.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { isUploadModalGlobalAction } = uploadSlice.actions;
export default uploadSlice.reducer;
