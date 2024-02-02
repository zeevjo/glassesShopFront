import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import global_en from "./translations/en/global.json";
import global_heb from "./translations/heb/global.json";
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import {DataProvider} from "contexts";

i18next.init({
  interpolation: { escapeValue: false },
  lng: "en",
  resources: {
    en: { global: global_en },
    heb: {
      global: global_heb,
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <DataProvider>
      <I18nextProvider i18n={i18next}>
        <App />
      </I18nextProvider>
    </DataProvider>
  </BrowserRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
