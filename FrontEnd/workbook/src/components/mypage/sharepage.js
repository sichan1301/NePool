import React from 'react';
import styled from 'styled-components';
import HeaderSignin from '../header/header';
import Left from './left';
import Myshared from './myshared';

export default function Share_page() {


  return (
    <>
      <HeaderSignin />
      <h1>공유된 페이지 일단 샘플임 ㅎ</h1>
      {/* <Section>
        <Left />
        <Myshared />
      </Section> */}
    </>
    )
} 


const Section = styled.article`
    width:100%;
    height:79vh;
    margin-top:80px;
    display:flex;
`;

