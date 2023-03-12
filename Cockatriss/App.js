import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigation from "./navigation/BottomTabNavigation";
import HomeScreen from "./screens/HomeScreen";
import RandomScreen from "./screens/RandomScreen";
import ListScreen from "./screens/ListScreen";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="BottomTabNavigation" component={BottomTabNavigation} options={{ headerShown: false }} />
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
                <Stack.Screen name="RandomScreen" component={RandomScreen} />
                <Stack.Screen name="ListScreen" component={ListScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
