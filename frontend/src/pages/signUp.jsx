import React from "react";
import styled from "styled-components";

const signUp = () => {
  return (
    <>
      <StContainer>
        <StMain>
          <div>Logo</div>
          <StForm>
            <StInputWrap>
              <StInput placeholder="이메일 주소" />
              <StInput placeholder="성명" />
              <StInput placeholder="사용자 이름" />
              <StInput placeholder="비밀번호" />

              <StButton>가입</StButton>
            </StInputWrap>
          </StForm>
          <StPassword>비밀번호를 잊으셨나요?</StPassword>
        </StMain>
        <StSignUpBox>
          계정이 있으신가요?<span style={{ color: "#5252d4" }}>로그인</span>
        </StSignUpBox>
      </StContainer>
    </>
  );
};

export default signUp;

const StContainer = styled.div`
  border: 2px solid #d2d2d2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px;
  height: 100vh;
  background-color: #f4f4f4;
  gap: 10px;
`;

const StMain = styled.div`
  border: 2px solid #d2d2d2;
  width: 350px;
  height: 480px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
  margin: 10px;
  background-color: white;
`;

const StInputWrap = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const StForm = styled.form``;

const StPassword = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #141467;
`;

const StInput = styled.input`
  box-sizing: border-box;
  border: 1px solid gray;
  background-color: #f3f3f3;
  width: 268px;
  height: 36px;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-left: 8px;
`;

const StButton = styled.button`
  border: 1px solid;
  margin-top: 20px;
  border-radius: 8px;
  width: 268px;
  height: 35px;
  background-color: #298dff;
  color: white;
  font-size: 15px;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: #3e3ea9;
  }
`;

const StSignUpBox = styled.div`
  border: 2px solid #d2d2d2;
  width: 350px;
  height: 63px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  font-weight: 500;
  background-color: white;
`;
