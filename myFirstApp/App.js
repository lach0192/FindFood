import React, { Component } from "react";
import Main from "./components/Main";
import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

let initialState = {

    data: [],
    selectedBusiness: null,
    isFetching: false,
    isGoingBack: false
};

let store = createStore(reducers, initialState, applyMiddleware(thunk));

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Main/>
            </Provider>
        );

    };
}