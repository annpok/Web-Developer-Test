import styled, {createGlobalStyle} from 'styled-components';
import { toast, ToastContainer } from 'react-toastify';

export const AppStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@200&display=swap');

  body {
  margin: 0;
  padding: 0;
  font-family: 'Libre Franklin', sans-serif;
  color: #000;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
`;

export const Container = styled.div`
  display: grid;
  height: 100vh;
  grid-template-rows: 0.25fr 1fr 0.25fr;
  grid-template-areas:
    "topBar"
    "main"
    "footer";
  text-align: center;
  grid-gap: 0.25rem;
  transition: all 0.25s ease-in-out;
  @media (max-width: 550px) {
    grid-template-columns: 1fr;
    grid-template-rows: 0.4fr 2.2fr 1fr;
    grid-template-areas:
      "topBar"
      "main"
      "footer";
  }
  color: white;
`;

export const TopBar = styled.nav`
  grid-area: topBar;
  padding: 1.5rem;
  box-shadow: 0 2px 5px 2px #d4d4d4;
  text-align: left;
`;

export const Main = styled.main`
  color: black;
  grid-area: main;
  padding: 1rem;
  max-width: 650px;
  margin-left: auto;
  margin-right: auto;
`;

export const Footer = styled.footer`
  grid-area: footer;
  padding: 0.25rem;
`;
