export const idCheck = (id) => {
  let regExp = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
  // 대문자 포함
  // console.log("id", regExp.test(id));
  return regExp.test(id);
};

export const pwCheck = (pw) => {
  let regExp = /^[a-z|A-Z|0-9|]{4,30}$/;
  return regExp.test(pw);
};

export const nickCheck = (nick) => {
  let regExp = /^[0-9a-zA-Zㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

  return regExp.test(nick);
};

// export const emailCheck = (email) => {
//   let _reg =
//     /^[0-9a-zA-Z]([-_.0-9a-zA-Z])*@[0-9a-zA-Z]([-_.0-9a-zA-z])*.([a-zA-Z])*/;

//   return _reg.test(email);
// };
