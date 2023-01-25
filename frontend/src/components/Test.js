import React from 'react'
import styled from 'styled-components'


function ButtonDefault({bgColor, hoverBgColor, hoverFontColor, onClick, children}) {
  return (
    <StButtonDefault bgColor={bgColor} hoverBgColor={hoverBgColor} hoverFontColor={hoverFontColor}
    onClick={onClick}
    >{children}
    </StButtonDefault>
  )
}

const StButtonDefault=styled.button.attrs({
})`
    width: 150px;
    height: 40px;
    border-radius: 20px;
    font-weight: bold;
    font-size: 16px;
    cursor: pointer;
    background-color: ${(props)=> props.bgColor || 'transparent'};
    border: 1px solid ${(props)=> props.bgColor || '#e2e2e2'};
    :hover{
        background-color: ${(props)=> props.hoverBgColor || 'transparent'};
        border: 1px solid ${(props)=> props.hoverBgColor || '#e2e2e2'};
        color: ${(props)=> props.hoverFontColor || '#fff'};
    }
`

export default ButtonDefault