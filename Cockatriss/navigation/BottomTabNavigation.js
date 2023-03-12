import * as React from 'react';
import { createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

//screens
import HomeScreen from "../screens/HomeScreen";
import ListScreen from "../screens/ListScreen";
import RandomScreen from "../screens/RandomScreen";

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigation() {
    return (
        <BottomTab.Navigator
            screenOptions={{
                activeTintColor: 'blue',
                inactiveTintColor: 'gray',
            }}>
            <BottomTab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home-outline" size={size} color={color} />
                    ),
                }}
            />
            <BottomTab.Screen
                name="Surprise Me"
                component={RandomScreen}
                options={{
                    tabBarLabel: 'Random',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="wine" size={size} color={color} />
                    ),
                }}
            />
            <BottomTab.Screen
                name="Search"
                component={ListScreen}
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
