import React                            from "react";
import {createStackNavigator}           from "@react-navigation/stack";
import {NavigationContainer}            from "@react-navigation/native";
import {lightBlue}                      from "../utils/colors";
import {View}                           from "react-native";
import Constants                        from "expo-constants";
import {StatusBar}                      from "expo-status-bar";
import Deck                             from "./Deck";
import TabNav                           from './TabNavigation';
import AddCard                          from "./AddCard";

function FlashcardsStatusBar({backgroundColor, ...props}) {
    return (
        <View style={{backgroundColor, height: Constants.statusBarHeight}}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
        </View>
    )
}

const Stack = createStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <FlashcardsStatusBar backgroundColor={lightBlue} barStyle="light-content" />
            <Stack.Navigator headerMode="screen">
                <Stack.Screen
                    name="Decks"
                    component={TabNav}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="AddDeck"
                    component={TabNav}
                />
                <Stack.Screen
                    name="AddCard"
                    component={AddCard}
                />
                <Stack.Screen
                    name="Deck"
                    component={Deck}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
};

export default Navigation;
