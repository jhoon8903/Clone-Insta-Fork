import axios from "axios";

const serverUrl = process.env.REACT_APP_API_URL;

//axios.defaults.withCredentials = true;

export const api = axios.create({
  //baseURL: serverUrl,
  baseURL: "https://f1rstweb.shop/",
  timeout: 1000,
  headers: {
    "content-type": "application/json;charset=UTF-8",
    //"Accept": "application/json," 주석 이유 : 기본 값이 application/json
  },
  //기본 헤더에는 토큰을 추가?
  //로그인 경우에는 추가할 토큰이 없다
  //헤더 컨텐츠 타입이 jsom이 아니라 fromdata일 경우는 api를 따로 제작?
});

api.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");
    try {
      if (token && refreshToken) {
        config.headers.authorization = token
        config.headers.refreshauthorization = refreshToken
        //config.headers.AccessToken = token
        //config.headers.RefreshToken = refreshToken
      }
      console.log("요청 성공! ", config);
      console.log("요청 성공! token :  ",token);
      console.log("요청 성공! refreshToken : ",refreshToken);
      return config;
    } catch (error) {
      console.log("에러! ", error);
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  function (response) {
    console.log("응답 성공! ", response);
    //로그인일 경우엔 토큰 세팅 필요
    if (response.status === 201) {
      console.log("😂😂😂로그인 res : ", response);
      const accessToken = response.data.AccessToken;
      const refreshToken = response.data.RefreshToken;
      localStorage.setItem("token", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      alert("로그인 성공!!!");
      //window.location.assign("/main");
    }
    //그러면 헤더에 토큰 값이 있을 경우를 로그인으로 처리?
    //or 인증 전용 api를 따로 제작?
    return response;
  },

  function (error) {
    console.log("응답 에러! ", error);
    if (error.response.status > 401) {
      alert("error!🔥");
      //window.location.assign("/");
    }
    return Promise.reject(error);
  }
);

// 생성한 인스턴스를 익스포트 합니다.
export default api;
