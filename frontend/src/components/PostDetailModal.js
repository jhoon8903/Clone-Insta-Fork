import React, {useState, useEffect, useRef} from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux';

import { COLORS } from '../style/styleGlobal';
import { BiTrash } from "react-icons/bi";
import { BsPencilFill } from "react-icons/bs";
import { HiOutlinePaperAirplane } from "react-icons/hi";
import { FaRegHeart } from "react-icons/fa";
import ButtonDefault from '../components/ButtonDefault';
import { isGlobalModalPostDetailAction } from '../redux/modules/postDetailSlice';


function PostDetailModal({width, height, bgColor, hoverBgColor, hoverFontColor, onClick, children}) {

  const dispatch=useDispatch()

  const isGlobalModalPostDetail=useSelector((state)=>state.postDetailSlice.isGlobalModalPostDetail)

  const onClickModalClose=()=>{ //모달 닫기
    dispatch(isGlobalModalPostDetailAction(false))
  }
  

  return (
    <>
    <StPostDetailModalWrap display={!isGlobalModalPostDetail ? "none" : "flex"}>
      <StPostDetailContentBox>
        <StPostDetailImageBox>
          <StPostDetailImage src=""/>
        </StPostDetailImageBox>
        <StPostDetailInfoBox>
          <StPostDetailUserInfo>
            <Link to="/main" title="피드 방문하기" className="linkPostDetailUserInfo">
              <StPostDetailThumb></StPostDetailThumb>
              <StPostDetailNick>닉네임닉네임</StPostDetailNick>
              <StMainPostItemDate>2023-01-26</StMainPostItemDate>
            </Link>
          </StPostDetailUserInfo>
        </StPostDetailInfoBox>
      </StPostDetailContentBox>

      <StPostDetailContentBoxDim onClick={onClickModalClose}></StPostDetailContentBoxDim>
    </StPostDetailModalWrap>

    {/* <StMainPostItem display={isGlobalModalPostDetail ? "true" : "false"}>
    

      <StMainPostItemTopInfo>
        <StMainPostItemUserInfo>
          <Link to="/main" title="피드 방문하기">
            <StPostDetailNick>닉네임닉네임 ·</StPostDetailNick>
            <StMainPostItemDate>2023-01-26</StMainPostItemDate>
          </Link>
        </StMainPostItemUserInfo>
        <StMainPostItemPostFunction>
          <BsPencilFill onClick={onClickPostEdit} className="iconEdit"/>
          <BiTrash onClick={onClickPostDelete}/>
        </StMainPostItemPostFunction>
      </StMainPostItemTopInfo>
      
      <StMainPostItemBottomInfo>
        <StMainPostItemLikeBox>
          <FaRegHeart/><HiOutlinePaperAirplane/>
        </StMainPostItemLikeBox>
        <StMainPostItemLikeTotal>좋아요 999개</StMainPostItemLikeTotal>
          <StMainPostItemContent>
            <StPostDetailNickContent>
              <Link to="/main" title="피드 방문하기">닉네임닉네임</Link>
            </StPostDetailNickContent>
            {!isEdit
            ?<>
              <StMainPostItemDescContent>
                게시글 설명글 게시글 설명글 게시글 설명글 게시글 설명글 게시글 설명글 게시글 설명글 게시글 설명글 게시글 설명글 게시글 설명글 
              </StMainPostItemDescContent>
              <ButtonDefault onClick={onClickModalPostDetail}
              bgColor={`${COLORS.defaultLemon}`} hoverBgColor={`${COLORS.defaultBold}`}
              >모두보기</ButtonDefault>
              </> 
            :<>
                <StMainPostItemDescContentEdit autoFocus placeholder="value = 게시글 설명글"/>
                <ButtonDefault 
                width="100px"
                bgColor={`${COLORS.defaultBlueLight}`} hoverBgColor={`${COLORS.defaultBold}`}
                >수정</ButtonDefault>
              </>
            }
          </StMainPostItemContent>
          <StMainPostItemCommentTotal>댓글 999개</StMainPostItemCommentTotal>
      </StMainPostItemBottomInfo>
    </StMainPostItem> */}
    </>
  )
}


const StMainPostItemDate=styled.span`
  margin-left: 8px;
`
const StPostDetailNick=styled.span`
  
`
const StPostDetailThumb=styled.img`
  width: 30px;
  height:30px;
  border-radius: 30px;
  border: 1px solid ${COLORS.defaultGray};
`
const StPostDetailUserInfo=styled.div`
  border-bottom:1px solid #e2e2e2;
  padding-bottom: 20px;
`
const StPostDetailInfoBox=styled.div`
  border:1px solid red;
  height: calc(100% - 10px);
  flex-basis: 40%;
  padding: 5px;
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
  border: 1px solid #e2e2e2;
  border-radius: 5px;
`
const StPostDetailContentBoxDim=styled.div`
  width:100%;
  height:100%;
  background-color: #000;
  opacity: 0.5;
  position: absolute;
  top:0;
  left:0;
  z-index: 1;
`
const StPostDetailContentBox=styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  column-gap: 10px;
  width: 70%;
  min-width: 550px;
  height: 70%;
  min-height: 400px;
  padding: 16px 10px;
  border: 1px solid red;
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

const StMainPostItemCommentTotal=styled.span`
  color: ${COLORS.defaultGray};
  cursor: pointer;
`
const StMainPostItemDescContentEdit=styled.textarea`
  width: calc(100% - 10px);
  height: 30px;
  margin: 10px 0;
  padding: 5px;
  border: 1px solid ${COLORS.defaultOrange};
  resize: none;
`
const StMainPostItemDescContent=styled.p`
  max-height: 30px;
  padding: 10px;
  margin-bottom: 6px;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-height: 20px;
`
const StPostDetailNickContent=styled.span`
  font-weight:bold;
  :hover{
    color: ${COLORS.defaultBlueBold}
  }
`
const StMainPostItemContent=styled.div`
`
const StMainPostItemLikeTotal=styled.span`
  font-weight: bold;
`
const StMainPostItemLikeBox=styled.div`
  display: flex;
  column-gap: 5px;
`
const StMainPostItemBottomInfo=styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 14px;
`


const StMainPostItemPostFunction=styled.div`
  
`
const StMainPostItemUserInfo=styled.span`
  :hover{
    color: ${COLORS.defaultBlueBold}
  }
`
const StMainPostItemTopInfo=styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`
const StMainPostItem=styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  row-gap: 10px;
  width: 40%;
  max-width: 450px;
  min-width: 240px;
  padding: 10px;
  border-bottom: 1px solid #e2e2e2;
`



export default PostDetailModal