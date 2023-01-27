import React, {useState, useEffect, useRef} from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'

import { COLORS } from '../style/styleGlobal';
import { BiTrash } from "react-icons/bi";
import { BsPencilFill } from "react-icons/bs";
import { HiOutlinePaperAirplane } from "react-icons/hi";
import { FaRegHeart } from "react-icons/fa";
import ButtonDefault from '../components/ButtonDefault';


function PostItem({width, height, bgColor, hoverBgColor, hoverFontColor, onClick, children}) {


  //상태 값
  const [isEdit, setIsEdit]=useState(false)

  const onClickPostEdit=()=>{ //수정 토글
    setIsEdit(!isEdit)
  }
  const onClickPostDelete=()=>{ //글 삭제
    if(window.confirm('삭제하시겠습니까?')){
      alert('삭제완료!')
    }else{
      alert('삭제취소')
    }
  }

  

  return (
    <StMainPostItem>
          <StMainPostItemTopInfo>
            <StMainPostItemUserInfo>
              <Link to="/main" title="피드 방문하기">
                <StMainPostItemNick>닉네임닉네임 ·</StMainPostItemNick>
                <StMainPostItemDate>2023-01-26</StMainPostItemDate>
              </Link>
            </StMainPostItemUserInfo>
            <StMainPostItemPostFunction>
              <BsPencilFill onClick={onClickPostEdit} className="iconEdit"/>
              <BiTrash onClick={onClickPostDelete}/>
            </StMainPostItemPostFunction>
          </StMainPostItemTopInfo>
          <StMainPostItemImageBox>
            <StMainPostItemImage src=""/>
          </StMainPostItemImageBox>
          <StMainPostItemBottomInfo>
            <StMainPostItemLikeBox>
              <FaRegHeart/><HiOutlinePaperAirplane/>
            </StMainPostItemLikeBox>
            <StMainPostItemLikeTotal>좋아요 999개</StMainPostItemLikeTotal>
              <StMainPostItemContent>
                <StMainPostItemNickContent>
                  <Link to="/main" title="피드 방문하기">닉네임닉네임</Link>
                </StMainPostItemNickContent>
                {!isEdit
                ?<>
                  <StMainPostItemDescContent>
                    게시글 설명글 게시글 설명글 게시글 설명글 게시글 설명글 게시글 설명글 게시글 설명글 게시글 설명글 게시글 설명글 게시글 설명글 
                  </StMainPostItemDescContent>
                  <ButtonDefault bgColor={`${COLORS.defaultLemon}`} hoverBgColor={`${COLORS.defaultBold}`}>모두보기</ButtonDefault>
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
        </StMainPostItem>
  )
}

const StMainPostItemCommentTotal=styled.span`
  color: ${COLORS.defaultGray};
  cursor: pointer;
`
const StMainPostItemDescContentEdit=styled.textarea`
  width: calc(100% - 10px);
  height: 30px;
  margin: 10px 0;
  padding: 5px;
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
const StMainPostItemNickContent=styled.span`
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
const StMainPostItemImage=styled.img.attrs(props=>({
  src:`${props.src || "images/logo.png"}`,
}))`
  max-width: 100%;
  max-height: 400px;
  min-width: 100px;
  min-height: 200px;
`
const StMainPostItemImageBox=styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  border: 1px solid #e2e2e2;
  border-radius: 5px;
`
const StMainPostItemDate=styled.span`
  margin-left: 8px;
`
const StMainPostItemNick=styled.span`

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



export default PostItem