import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"
import { serverUrl, tokenLocal } from ".";

const initialState = {
  signup:[],
  isLoading: false,
  error: null,
  isGlobalModalPostDetail : false,
};


export const postDetail = createAsyncThunk(
  "posts/POST_DETAIL",
  async (payload, thunkAPI) => {
    try{
      const {data} = await axios.post(`${serverUrl}/user/signup`, payload, {
        headers: {
          // authorization: tokenLocal
        }
      })
      return thunkAPI.fulfillWithValue(data)
    }catch(error){
      return thunkAPI.rejectWithValue(error)
    }
  }
);




const postDetailSlice = createSlice({
  name: "postDetail",
  initialState,
  reducers: {
    isGlobalModalPostDetailAction : (state, action)=>{
      state.isGlobalModalPostDetail = action.payload
    }
  },
  extraReducers: {
    [postDetail.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경
    },
    [postDetail.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경
      state.signup = action.payload; // Store에 있는 state.data에 서버에서 가져온 action.payload 추가
    },
    [postDetail.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경
      state.error = action.payload; // catch 된 error 객체를 state.error에 추가
    },
  },
});

// 액션크리에이터는 컴포넌트에서 사용하기 위해 export 하고
export const {isGlobalModalPostDetailAction} = postDetailSlice.actions;
// reducer 는 configStore에 등록하기 위해 export default 합니다.
export default postDetailSlice.reducer;