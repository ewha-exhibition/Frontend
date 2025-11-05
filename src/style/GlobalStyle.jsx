import { createGlobalStyle } from "styled-components";
import SUITVariable from "../assets/fonts/SUIT-Variable.woff2";

export const GlobalStyle = createGlobalStyle`
    :root {
        /* OS가 다크모드여도 라이트로만 렌더링되게 */
        color-scheme: light;
    }

    @font-face {
        font-family: 'SUIT-Variable';
        font-style: normal;
        font-weight: 100 900;
        src:
            local('SUIT Variable'),        
            url(${SUITVariable}) format('woff2');
            font-display: swap;              /* iOS에서 FOIT 방지 */
    }

    * {
        font-family: 'SUIT-Variable';
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
        body {
        font-family: 'SUIT-Variable';
        font-style: normal;
        line-height: 1.4;
        letter-spacing: -0.025em; 
        margin: 0;
        background: #fff;
        display: flex;
        justify-content: center;  
        align-items: flex-start; 
    }
    
    #root {
        width: 100%;
        display: flex;
        justify-content: center;
    }

    p, h1, h2, h3 {
        margin: 0;
        padding: 0;
    }

    a {
        text-decoration: none;
        color: inherit;
    }

    button {
        border: none;
        background: none;
        padding: 0;
        cursor: pointer;
        -webkit-tap-highlight-color: transparent;
        outline: none;
        &:focus {
        outline: none;
        }
    }

    img {
        border: none;
    }
`;

export default GlobalStyle;
