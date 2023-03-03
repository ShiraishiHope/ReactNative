import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import Constants from "expo-constants";
import * as Location from "expo-location";
import axios from "axios";
import WeeklyWeather from "./components/WeeklyWeather";

const apiUrl = (lat, lon) => `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=f21195c07b10c55ee15a8f363c1b3713&units=metric`;
export default function App() {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(null)


    useEffect(() => {
        const getCoordinates = async () => {
            const {status} = await Location.requestForegroundPermissionsAsync()
            if (status !== "granted") {
                return
            }
            const userLocation = await Location.getCurrentPositionAsync()
            getWeather(userLocation)
        }
        getCoordinates()
    }, [])

    const getWeather = async (location) => {
        try {
            const response = await axios.get(apiUrl(location.coords.latitude, location.coords.longitude))
            setData(response.data)
            setLoading(false)
        } catch (error) {
            console.log("getWeather crashed. You did something wrong")
        }
    }

    if (loading) {
        return <View>
            <ActivityIndicator/>
        </View>
    }
    return (
        <View style={styles.container}>
            <View style={styles.upper}>
                <Text>Test</Text>
            </View>
            <View style={styles.lower}>
                <WeeklyWeather data={data} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#6A7',
        alignItems: 'center',
        justifyContent: 'center',
    },
    upper: {
        flex: 1,
        justifyContent: 'center',
    },
    lower: {
        flex: 1,
        justifyContent: 'center',
    },
});
