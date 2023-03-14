import * as React from 'react';
import { createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

//screens
import HomeScreen from "../screens/HomeScreen";
import ListScreen from "../screens/ListScreen";
import RandomScreen from "../screens/RandomScreen";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import DetailScreen from "../screens/DetailScreen";

const BottomTab = createBottomTabNavigator();

function HomeStack() {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
        </Stack.Navigator>
    );
}

function RandomStack() {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen
                name="RandomScreen"
                component={RandomScreen}

            />
            <Stack.Screen
                name="DetailScreen"
                component={DetailScreen}

            />
        </Stack.Navigator>
    );
}

function ListStack() {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="ListScreen" component={ListScreen}/>
        </Stack.Navigator>
    );
}

export default function BottomTabNavigation() {
    return (
        <BottomTab.Navigator
            screenOptions={{
                activeTintColor: 'blue',
                inactiveTintColor: 'gray',
            }}
        >
            <BottomTab.Screen
                name="Home"
                component={HomeStack}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home-outline" size={size} color={color} />
                    ),
                }}
            />
            <BottomTab.Screen
                name="RandomStack"
                component={RandomStack}
                options={{
                    tabBarLabel: 'Random',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="wine" size={size} color={color} />
                    ),
                }}
            />
            <BottomTab.Screen
                name="Search"
                component={ListStack}
                options={{
                    tabBarLabel: 'List',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="search" size={size} color={color} />
                    ),
                }}
            />
        </BottomTab.Navigator>
    )
}