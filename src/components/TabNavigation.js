import React                            from "react";
import {Platform}                       from "react-native";
import {createBottomTabNavigator}       from "@react-navigation/bottom-tabs";
import {createMaterialTopTabNavigator}  from "@react-navigation/material-top-tabs";
import {FontAwesome}                    from "@expo/vector-icons";
import {lightBlue, white}               from "../utils/colors";
import Decks                            from "./Decks";
import AddDeck                          from "./AddDeck";

const Tabs =
    Platform.OS === "ios"
        ? createBottomTabNavigator()
        : createMaterialTopTabNavigator();

const TabNav = () => (
    <Tabs.Navigator
        initialRouteName="Decks"
        screenOptions={({route}) => ({
            tabBarIcon: ({color, size}) => {
                let icon;
                if (route.name === "Decks") {
                    icon = (
                        <FontAwesome name="bars" size={size} color={color} />
                    );
                } else if (route.name === "Add Deck") {
                    icon = (
                        <FontAwesome name="plus-square" size={size} color={color} />
                    );
                }
                return icon;
            }
        })}
        tabBarOptions={{
            header: null,
            activeTintColor: Platform.OS === "ios" ? lightBlue : white,
            showIcon: true,
            style: {
                height: 80,
                backgroundColor: Platform.OS === "ios" ? white : lightBlue,
                shadowColor: "rgba(0, 0, 0, 0.24)",
                shadowOffset: {
                    width: 0,
                    height: 3
                },
                shadowRadius: 6,
                shadowOpacity: 1
            }
        }}
    >
        <Tabs.Screen name="Decks" component={Decks} />
        <Tabs.Screen name="Add Deck" component={AddDeck} />
    </Tabs.Navigator>
);

export default TabNav;
