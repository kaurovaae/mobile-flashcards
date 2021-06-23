import React                            from "react";
import {createStackNavigator}           from "@react-navigation/stack";
import {NavigationContainer}            from "@react-navigation/native";
import {lightBlue}                      from "../utils/colors";
import {View}                           from "react-native";
import Constants                        from "expo-constants";
import {StatusBar}                      from "expo-status-bar";
import Deck                             from "./Deck";
import TabNav                           from './TabNavigation';

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
                    name="Add Deck"
                    component={TabNav}
                />
                <Stack.Screen
                    name="Deck"
                    component={Deck}
                    options={({route}) => {
                        const {title} = route.params;

                        return {
                            title
                        }
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
};

export default Navigation;
