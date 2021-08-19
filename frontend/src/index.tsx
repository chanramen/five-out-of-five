import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GlobalFonts from "./components/ui/GlobalFonts";
import {createGlobalStyle} from "styled-components";

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    background: linear-gradient(248.66deg, #140284 16.67%, #FF0099 100%) fixed;
  }
`

ReactDOM.render(
    <React.StrictMode>
        <GlobalStyles/>
        <GlobalFonts/>
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
