import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"
import { serverUrl, tokenLocal } from ".";

const initialState = {
  signup:[],
  isLoading: false,
  error: null,
  isModalToggleSignup : false
};


export const __signup = createAsyncThunk(
  "posts/SIGNUP",
  async (payload, thunkAPI) => {
    try{
      const {data} = await axios.post(`${serverUrl}/user/signup`, payload, {
        headers: {
          authorization: tokenLocal
        }
      })
      return thunkAPI.fulfillWithValue(data)
    }catch(error){
      return thunkAPI.rejectWithValue(error)
    }
  }
);




const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    isModalGlobalToggleSignup : (state, action)=>{
      state.isModalToggleSignup = action.payload
    }
  },
  extraReducers: {
    [__signup.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경
    },
    [__signup.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경
      state.signup = action.payload; // Store에 있는 state.data에 서버에서 가져온 action.payload 추가
    },
    [__signup.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경
      state.error = action.payload; // catch 된 error 객체를 state.error에 추가
    },
  },
});

// 액션크리에이터는 컴포넌트에서 사용하기 위해 export 하고
export const {isModalGlobalToggleSignup} = signupSlice.actions;
// reducer 는 configStore에 등록하기 위해 export default 합니다.
export default signupSlice.reducer;