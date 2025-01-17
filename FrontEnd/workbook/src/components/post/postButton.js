import React from "react";
import styled from "styled-components";
import { COLORS } from "../../constants";

export default function PostBtn({page, onClickNum, next, prev, onClickNext, onClickPrev}) {

  return (
    <>
      <Nav>
        <Button onClick={onClickPrev}disabled={prev === false} >
          &lt;
        </Button>
        {page.map((number)=>{
          return (
            <Button 
              key={number} 
              value={number} 
              onClick={onClickNum}
            >
              {number}
            </Button>
          )
        })}
        <Button onClick={onClickNext} disabled={next === false}>
          &gt;
        </Button>
      </Nav>
    </>
  );
}

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 16px;
  gap: 4px;
  `

  const Button = styled.button`
  margin: 0;
  border: none;
  height: 30px;
  width: 30px;
  border-radius: 6px;
  background: ${COLORS.blue};
  color: white;
  font-size: 15px;
  &:hover {
    background: ${COLORS.gray};
    cursor: pointer;
    transform: translateY(-2px);
  }
  &[disabled] {
    background: ${COLORS.light_gray};
    cursor: revert;
    transform: revert;
  }
  /* &[aria-current] {
    background: ${COLORS.blue};
    font-weight: bold;
    cursor: revert;
    transform: revert;
  } */
`;
