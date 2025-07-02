import { createGlobalStyle } from 'styled-components';
import Quantum from './fonts/Quantum.otf'; 

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Quantum';
    src: url(${Quantum}) format('opentype');
    font-weight: normal;
    font-style: normal;
  }

  body {
    font-family: 'Quantum', sans-serif;
  }
`;