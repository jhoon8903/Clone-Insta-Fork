import React from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'

const SideNav = () => {
    const navigate = useNavigate()
    const onClickHeaderLogo=()=>{
        navigate('/')
    }

    const onClickLogout=()=>{
        localStorage.clear('token')
        localStorage.clear('refreshToken')
        window.location.href='/'
        alert('로그아웃 되었습니다!')
        //navigate('/')
    }
    // 로그인 페이지에서 공통헤더 숨김처리
    if (window.location.pathname === '/') return null
  return (
    <StSideNavWrap>
        SideNav
    </StSideNavWrap>
  )
}

const StSideNavWrap=styled.nav`
    display: flex;
    width: 16%;
    max-width: 250px;
    min-width: 100px;
    height: calc(100vh - 40px);
    position: fixed;
    top:0;
    left:0;
    padding: 20px;
    background-color: #e0dcff;
`

export default SideNav