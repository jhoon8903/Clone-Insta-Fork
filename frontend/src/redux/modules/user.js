import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../shared/api"

const initialState = {
  postDetailObj:{},
  isLoading: false,
  error: null,
  isGlobalModalPostDetail : false,
};


export const __userOauthKakao = createAsyncThunk(
  "oauth/USER_OAUTH_KAKAO",
  async (payload, thunkAPI) => {
    try{
      const data = await api.post(`auth/kakao`, payload)
      console.log('🔒 카카오 로그인 data : ', data)
      return thunkAPI.fulfillWithValue(data)
    }catch(error){
      console.log('🔒 카카오 로그인 error : ', error)
      return thunkAPI.rejectWithValue(error)
    }
  }
);




const userOauth = createSlice({
  name: "userOauth",
  initialState,
  reducers: {
  },
  extraReducers: {
    [__userOauthKakao.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경
    },
    [__userOauthKakao.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경
      state.postDetail = action.payload; // Store에 있는 state.data에 서버에서 가져온 action.payload 추가
      console.log('state.postDetail : ' , state.postDetail)
    },
    [__userOauthKakao.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경
      state.error = action.payload; // catch 된 error 객체를 state.error에 추가
    },
  },
});

// 액션크리에이터는 컴포넌트에서 사용하기 위해 export 하고
export const {} = userOauth.actions;
// reducer 는 configStore에 등록하기 위해 export default 합니다.
export default userOauth.reducer;