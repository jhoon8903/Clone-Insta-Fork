import React, {useState, useEffect, useRef} from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux';

import { COLORS } from '../style/styleGlobal';
import { BiTrash } from "react-icons/bi";
import { BsPencilFill } from "react-icons/bs";
import { HiOutlinePaperAirplane } from "react-icons/hi";
import { FaRegHeart } from "react-icons/fa";
import { AiOutlineCloseCircle } from "react-icons/ai";

import ButtonDefault from '../components/ButtonDefault';
import { isGlobalModalPostDetailAction } from '../redux/modules/postDetailSlice';
import PostDetailContent from './PostDetailContent'
import PostDetailCommentBox from './PostDetailCommentBox';


function PostDetailModal({width, height, bgColor, hoverBgColor, hoverFontColor, onClick, children}) {

  const dispatch=useDispatch()

  const isGlobalModalPostDetail=useSelector((state)=>state.postDetailSlice.isGlobalModalPostDetail)

  const onClickModalClose=()=>{ //모달 닫기
    dispatch(isGlobalModalPostDetailAction(false))
  }
  

  return (
    <StPostDetailModalWrap display={!isGlobalModalPostDetail ? "none" : "flex"}>
      <StPostDetailContentBox>
        <StPostDetailImageBox>
          <StPostDetailImage src=""/>
        </StPostDetailImageBox>
        <StPostDetailInfoBox>
          <StPostDetailUserInfo>
            <Link to="/main" title="피드 방문하기" className="linkPostDetailUserInfo">
              <StPostDetailThumb/>
              <StPostDetailNick>닉네임닉네임</StPostDetailNick>
              <StMainPostItemDate>2023-01-26</StMainPostItemDate>
            </Link>
          </StPostDetailUserInfo>
          <StPostDetailContentCommentBox>

            <PostDetailContent/>
            <PostDetailContent/>
            <PostDetailContent/>
            <PostDetailContent/>
            <PostDetailContent/>
            <PostDetailContent/>

          </StPostDetailContentCommentBox>

          <PostDetailCommentBox/>

        </StPostDetailInfoBox>
        <AiOutlineCloseCircle className="iconClose" onClick={onClickModalClose}/>
      </StPostDetailContentBox>
      <StPostDetailContentBoxDim onClick={onClickModalClose}></StPostDetailContentBoxDim>
    </StPostDetailModalWrap>
  )
}

const StMainPostItemDate=styled.span`
  margin-left: 8px;
`
const StPostDetailNick=styled.span`
  font-weight: bold;
`
const StPostDetailContentCommentBox=styled.div`
  padding: 0 20px 20px;
  height: 420px;
  overflow: auto;
  border-bottom: 1px solid #e2e2e2;
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    background-color: ${COLORS.defaultPinkLight};
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${COLORS.defaultPinkBold};
    border-radius: 10px;
  }
`
const StPostDetailThumb=styled.img`
  width: 30px;
  height:30px;
  border-radius: 30px;
  border: 1px solid ${COLORS.defaultGray};
`
const StPostDetailUserInfo=styled.div`
  border-bottom:1px solid #e2e2e2;
  padding: 10px 20px;
`
const StPostDetailInfoBox=styled.div`
  height: calc(100% - 20px);
  flex-basis: 40%;
`
const StPostDetailImage=styled.img.attrs(props=>({
  src:`${props.src || "images/logo.png"}`,
}))`
  max-width: 100%;
  max-height: 400px;
  min-width: 100px;
  min-height: 200px;
`
const StPostDetailImageBox=styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  flex-basis: 60%;
  border-right: 1px solid ${COLORS.defaultGrayLight};
`
const StPostDetailContentBoxDim=styled.div`
  width:100%;
  height:100%;
  background-color: #000;
  opacity: 0.6;
  position: absolute;
  top:0;
  left:0;
  z-index: 1;
`
const StPostDetailContentBox=styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 70%;
  min-width: 550px;
  height: 70%;
  min-height: 400px;
  border: 3px solid ${COLORS.defaultGrayLight};
  border-radius: 5px;
  position: relative;
  z-index: 2;
  background-color: #fff;
`
const StPostDetailModalWrap=styled.div`
  display: ${(props) => props.display};
  justify-content: center;
  align-items: center;
  position: fixed;
  top:0;
  right:0;
  bottom:0;
  left:0;
  z-index: 3;
  width:100vw;
  height:100vh;
`


export default PostDetailModal