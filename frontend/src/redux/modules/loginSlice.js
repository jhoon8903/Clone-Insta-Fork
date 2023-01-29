import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { api } from "../../shared/api";

axios.defaults.withCredentials = true;

const initialState = {
  user: {},
  isLoading: false,
  error: null,
  is_login: false,
};

export const __loginUser = createAsyncThunk(
  "loginUser",
  async (payload, thunkAPI) => {
    //기존 코드
    // try {
    //   const data = await api.post(`auth/local`, payload);
    //   console.log("login data", data);
    //   return thunkAPI.fulfillWithValue(data);
    // } catch (error) {
    //   alert("다시 확인해주세요.");
    //   return thunkAPI.rejectWithValue(error);
    // }

    //요청 인터셉터
    api.interceptors.request.use(
      function (config) {
        //요청이 전달 되기 전에 작업 수행
        const token = localStorage.getItem("token");
        const refreshToken = localStorage.getItem("refreshToken");
        try {
          if (token && refreshToken) {
            config.headers.authorization = token;
            config.headers.refreshauthorization = refreshToken;
          }
          console.log("요청 성공! ", config);
          return config;
        } catch (error) {
          console.log("에러! ", error);
        }
        return config;
      },
      function (error) {
        //요청 오류가 있는 작업 수행
        return Promise.reject(error);
      }
    );

    //응답 인터셉터
    api.interceptors.response.use(
      function (response) {
        console.log("응답 성공! ", response);
        //로그인일 경우엔 토큰 세팅 필요
        //응답 데이터가 있는 작업수행
        if (response.status === 201) {
          console.log("😂😂😂로그인 res.status : ", response);
          const accessToken = response.data.accessToken;
          const refreshToken = response.data.refreshToken;
          localStorage.setItem("token", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
          alert("로그인 성공!!!");
          window.location.assign("/main");
        }
        //그러면 헤더에 토큰 값이 있을 경우를 로그인으로 처리?
        //or 인증 전용 api를 따로 제작?
        return response;
      },
      function (error) {
        //응답 오류가 있는 작업 수행
        console.log("응답 에러! ", error);
        if (error.response.status > 401) {
          alert("error!🔥");
          window.location.assign("/");
        }
        return Promise.reject(error);
      }
    );
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
