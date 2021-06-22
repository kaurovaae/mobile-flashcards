import React                                from 'react';
import {View}                               from 'react-native';
import {createStore}                        from "redux";
import {Provider}                           from "react-redux";
import reducer                              from '../reducers';
import Navigation                           from "./Navigation";

export default function App() {
    return (
        <Provider store={createStore(reducer)}>
            <View style={{flex: 1}}>
                <Navigation />
            </View>
        </Provider>
    );
}
