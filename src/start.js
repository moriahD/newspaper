import React from "react";
import ReactDOM from "react-dom";
// import App from "./App";
import Admin from "./admin";
import App from "./app";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import reducer from "./reducer";

import { composeWithDevTools } from "redux-devtools-extension";
import { init } from "./socket";
let elem;
const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

if (location.pathname == "/admin") {
    //they are logged out
    elem = <Admin />;
} else {
    init(store);
    elem = (
        <Provider store={store}>
            <App />;
        </Provider>
    );
}

//without this none will show on the browser
ReactDOM.render(elem, document.querySelector("main"));
