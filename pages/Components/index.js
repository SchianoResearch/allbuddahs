import { StrictMode } from "react";
import ReactDOM from "react-dom";
import EthButton from "./EthButton";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <EthButton />
  </StrictMode>,
  rootElement
);