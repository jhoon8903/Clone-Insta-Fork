import axios from "axios";

const serverUrl = process.env.REACT_APP_API_URL;

export const api = axios.create({
  //baseURL: serverUrl,
  baseURL: "http://f1rstweb.shop/",
  timeout: 1000,
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json,",
  },
  //기본 헤더에는 토큰을 추가?
  //로그인 경우에는 추가할 토큰이 없다
  //헤더 컨텐츠 타입이 json이 아니라 fromdata일 경우는 api를 따로 제작?
});
console.log("수정");
api.interceptors.request.use(function (config) {
  // console.log("들어가나");

  const access_token = sessionStorage.getItem("access_token");
  if (access_token !== null) {
    // console.log(access_token);
    config.headers.common["Authorization"] = `Bearer ${access_token}`;
  }
  return config;
});

//이전코드;
api.interceptors.request.use(
  function (config) {
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
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  function (response) {
    console.log("응답 성공! ", response);

    return response;
  },

  function (error) {
    console.log("응답 에러! ", error);
    if (error.response.status > 401) {
      alert("error!🔥");
      window.location.assign("/");
    }
    return Promise.reject(error);
  }
);

// 생성한 인스턴스를 익스포트 합니다.
export default api;
