import React from 'react';
import {Container, TopBar, Main, Footer, AppStyle} from  './styled.js';
import {injectStyle} from "react-toastify/dist/inject-style.js";
import { toast, ToastContainer } from 'react-toastify';
import Cart from  '../components/Cart.js';
import Top from  '../components/Top.js';
injectStyle();
toast.configure();

export default function App() {

  return (
    <>
    <AppStyle/>
    <Container>
      <TopBar><Top/></TopBar>
      <Main><Cart/></Main>
      <Footer></Footer>
    </Container>
        <ToastContainer autoClose={3000} position={'top-center'} closeOnClick={true} />
    </>
  );
}
