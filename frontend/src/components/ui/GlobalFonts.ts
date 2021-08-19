import {createGlobalStyle} from "styled-components";
import lobster from "../../fonts/Lobster/Lobster-Regular.ttf"

export default createGlobalStyle`
  @font-face {
    font-family: "Lobster";
    src: url("${lobster}");
  }
`