import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { api } from "../../shared/api";

const initialState = {
  user: {},
  isLoading: false,
  error: null,
  is_login: false,
};

export const __loginUser = createAsyncThunk(
  "loginUser",
  async (payload, thunkAPI) => {
    try {
      const data = await api
        .post(`auth/local`, payload)
        .then((res) => {
          if (res.status === 200) {
            // const token = res.headers.authorization;
            // const refreshToken = res.headers.refreshauthorization;
            // localStorage.setItem("token", token);
            // localStorage.setItem("refreshToken", refreshToken);
            alert("Login sucess");
            return res;
          }
        })
        .catch((err) => {
          alert("다시 확인해주세요.");
          return err;
        });
      console.log("login data", data);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      alert("다시 확인해주세요.");
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const loginSlice = createSlice({
  name: "loginUser",
  initialState,
  reducers: {},
  extraReducers: {
    [__loginUser.pending]: (state) => {
      state.isLoading = true;
    },
    [__loginUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
      console.log("로그인 state.users", state.users);
      console.log("로그인 action payload", action.payload);
      state.isLoginOk = true;
    },
    [__loginUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      console.log("state err", state.error);
      state.isLoginOk = false;
      state.users = null;
    },
  },
});

export const {} = loginSlice.actions;
export default loginSlice.reducer;
