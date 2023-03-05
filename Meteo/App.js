import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import {LinearGradient} from "expo-linear-gradient";
import * as Location from "expo-location";
import axios from "axios";
import WeeklyWeather from "./components/WeeklyWeather";
import CurrentWeather from "./components/CurrentWeather";
import {Dimensions} from 'react-native';

const { width, height } = Dimensions.get('window')
const forecastApiUrl = (lat, lon) => `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=f21195c07b10c55ee15a8f363c1b3713&units=metric`;
const weatherApiUrl = (lat,lon) => `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=f21195c07b10c55ee15a8f363c1b3713&units=metric`;

export default function App() {
    const [loadingForecast, setLoadingForecast] = useState(true)
    const [loadingWeather, setLoadingWeather] = useState(true)
    const [forecastData, setForecastData] = useState(null)
    const [weatherData, setWeatherData] = useState(null)


    useEffect(() => {
        const getCoordinates = async () => {
            const {status} = await Location.requestForegroundPermissionsAsync()
            if (status !== "granted") {
                return
            }
            const userLocation = await Location.getCurrentPositionAsync()
            getWeather(userLocation)
            getForecast(userLocation)
        }
        getCoordinates()
    }, [])

    const getForecast = async (location) => {
        try {
            const forecastResponse = await axios.get(forecastApiUrl(location.coords.latitude, location.coords.longitude))
            setForecastData(forecastResponse.data)
            setLoadingForecast(false)
        } catch (error) {
            console.log("getForecast crashed. You did something wrong")
        }
    }
    const getWeather = async (location) => {
        try {
            const weatherResponse = await axios.get(weatherApiUrl(location.coords.latitude, location.coords.longitude))
            setWeatherData(weatherResponse.data)
            setLoadingWeather(false)
        } catch (error) {
            console.log("getWeather crashed. You did something wrong")
        }
    }

    if (loadingForecast || loadingWeather) {
        return <View>
            <ActivityIndicator/>
        </View>
    }
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['rgba(22, 65, 146, 1)', 'rgba(58, 112, 180, 1)']}
                style={styles.gradient}
            />
            <View style={styles.upper}>
                <CurrentWeather data={weatherData} />
            </View>
            <View style={styles.middle}>
                <WeeklyWeather data={forecastData} />
            </View>
{/*            <View style={styles.lower}>
                <WeeklyWeather data={forecastData} />
            </View>*/}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width:width,
        height:height,
        alignItems: 'center',
        justifyContent: 'center',
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
    upper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

        height: '50%',
        paddingTop: 40,
    },
    middle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

        height: '25%',
        paddingHorizontal: 20,
        paddingVertical:10,
    },
    lower: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

        height: '25%',
        flexDirection:'column',
        paddingHorizontal: 20,
        paddingVertical:10,
    },

});
