import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux';

import PostItem from '../components/PostItem';
import PostDetailModal from '../components/PostDetailModal';



const Main = () => {

  const isGlobalModalPostDetail=useSelector((state)=>state.postDetailSlice.isGlobalModalPostDetail)

  return (
    <StMainWrap
    //모달 창 오픈시 뒷 배경 스크롤 막기
    overflow={!isGlobalModalPostDetail ? "auto" : "hidden"}
    height={!isGlobalModalPostDetail ? "auto" : "calc(100vh - 110px)"}
    >
      <StMainPostItemBox>
        <PostItem></PostItem>
        <PostItem></PostItem>
      </StMainPostItemBox>
      <PostDetailModal/>
    </StMainWrap>
  )
}



const StMainWrap=styled.div`
  margin-left: 290px;
  padding: 30px 20px 80px 20px;
  overflow-y: ${(props)=> props.overflow || 'auto'};
  height: ${(props)=> props.height || 'auto'};
`
const StMainPostItemBox=styled.div`
  width: auto;
  max-width: 1200px;
  min-width: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  row-gap: 16px;
`

export default Main