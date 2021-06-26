import React, {Component}                   from 'react';
import {View}                               from 'react-native';
import {createStore}                        from "redux";
import {Provider}                           from "react-redux";
import reducer                              from '../reducers';
import Navigation                           from "./Navigation";
import middleware                           from '../middleware';
import {setLocalNotification}               from "../utils/helpers";

const store = createStore(reducer, middleware);

class App extends Component {
    componentDidMount() {
        setLocalNotification();
    }

    render() {
        return (
            <Provider store={store}>
                <View style={{flex: 1}}>
                    <Navigation />
                </View>
            </Provider>
        );
    }
}

export default App;
