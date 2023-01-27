import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'

import ButtonDefault from '../components/ButtonDefault';
import PostItem from '../components/PostItem';
import PostDetailModal from '../components/PostDetailModal';

import { COLORS } from '../style/styleGlobal';
import { BiTrash } from "react-icons/bi";
import { BsPencilFill } from "react-icons/bs";
import { HiOutlinePaperAirplane } from "react-icons/hi";
import { FaRegHeart } from "react-icons/fa";


const Main = () => {
  return (
    <StMainWrap>
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