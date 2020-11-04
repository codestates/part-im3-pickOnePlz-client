import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";

import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import { Provider } from "react-redux";
import reducers from "./modules";
import App from "./App";

import { CookiesProvider } from "react-cookie"; // 쿠키에서 값을 받아오기 위함 (session_id=2 등에서, 2를 받아오기 위해서)
import { composeWithDevTools } from "redux-devtools-extension"; // devtool에서 보다 깔끔하게 store(state)를 확인하기 위함.

import { persistStore } from "redux-persist"; // 새로고침을 하면 store(state)가 날아가는데,
import { PersistGate } from "redux-persist/integration/react"; // 이것을 localStorage에 저장한 뒤 불러오기 위함.

import "./index.css";

const loggerMiddleware = createLogger();

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunkMiddleware, loggerMiddleware))
);

const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <CookiesProvider>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </CookiesProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
