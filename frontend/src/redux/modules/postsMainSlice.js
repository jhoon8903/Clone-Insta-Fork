import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../shared/api"

const initialState = {
  posts:[],
  isLoading: false,
  error: null,
  isGlobalModalPostDetail : false,
};


export const __postsMain = createAsyncThunk(
  "posts/POSTS_MAIN",
  async (payload, thunkAPI) => {
    try{
      const {data} = await api.get(`posts`)
      return thunkAPI.fulfillWithValue(data)
    }catch(error){
      return thunkAPI.rejectWithValue(error)
    }
  }
);


const postsMainSlice = createSlice({
  name: "postDetail",
  initialState,
  reducers: {
    isGlobalModalPostDetailAction : (state, action)=>{
      state.isGlobalModalPostDetail = action.payload
    }
  },
  extraReducers: {
    [__postsMain.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경
    },
    [__postsMain.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경
      state.posts = action.payload; // Store에 있는 state.data에 서버에서 가져온 action.payload 추가
      console.log('posts main state.posts : ', state.posts)
      console.log('posts main action.payload : ', action.payload)
    },
    [__postsMain.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경
      state.error = action.payload; // catch 된 error 객체를 state.error에 추가
    },
  },
});

// 액션크리에이터는 컴포넌트에서 사용하기 위해 export 하고
export const {} = postsMainSlice.actions;
// reducer 는 configStore에 등록하기 위해 export default 합니다.
export default postsMainSlice.reducer;