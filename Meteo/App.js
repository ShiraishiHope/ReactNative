import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import {LinearGradient} from "expo-linear-gradient";
import * as Location from "expo-location";
import axios from "axios";
import WeeklyWeather from "./components/WeeklyWeather";
import CurrentWeather from "./components/CurrentWeather";
import DailyWeather from "./components/DailyWeather";
import {Dimensions} from 'react-native';

const { width, height } = Dimensions.get('window')
const forecastApiUrl = (lat, lon) => `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=f21195c07b10c55ee15a8f363c1b3713&units=metric`;
const weatherApiUrl = (lat,lon) => `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=f21195c07b10c55ee15a8f363c1b3713&units=metric`;
const dailyApiUrl = (lat,lon, day1, day6) => `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto&start_date=${day1}&end_date=${day6}`;
export default function App() {
    const [loadingForecast, setLoadingForecast] = useState(true)
    const [loadingWeather, setLoadingWeather] = useState(true)
    const [loadingDailyTemp, setLoadingDailyTemp] = useState(true)
    const [forecastData, setForecastData] = useState(null)
    const [weatherData, setWeatherData] = useState(null)
    const [dailyTempData, setDailyTempData] = useState(null)
    const [day1, setDay1] = useState(new Date().toISOString().split('T')[0])
    const [day6, setDay6] = useState(() => {
        const dayPlus6 = new Date();
        dayPlus6.setDate(new Date().getDate() + 6);
        return dayPlus6.toISOString().split('T')[0];
    })



    useEffect(() => {
        const tomorrow = new Date()
        tomorrow.setDate(new Date().getDate() + 1)
        const isoTomorrow = tomorrow.toISOString().split('T')[0]
        setDay1(isoTomorrow)

        const dayPlus6 = new Date()
        dayPlus6.setDate(new Date().getDate() + 6)
        const isoDay6 = dayPlus6.toISOString().split('T')[0]
        setDay6(isoDay6)
        const getCoordinates = async () => {
            const {status} = await Location.requestForegroundPermissionsAsync()
            if (status !== "granted") {
                return
            }


            const userLocation = await Location.getCurrentPositionAsync()
            getWeather(userLocation)
            getForecast(userLocation)
            getDailyTemp(userLocation,day1,day6)


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
    const getDailyTemp = async (location, dayOne, daySix) => {
        try {

            const DailyTempResponse = await axios.get(dailyApiUrl(location.coords.latitude, location.coords.longitude, dayOne, daySix))
            console.log("DailyTemp:",DailyTempResponse.data)
            setDailyTempData(DailyTempResponse.data)
            setLoadingDailyTemp(false)
        } catch (error) {
            console.log("getDailyTemp crashed. You did something wrong")
        }
    }

    if (loadingForecast || loadingWeather || loadingDailyTemp) {
        return <View>
            <ActivityIndicator />
        </View>
    }
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['rgba(22, 65, 146, 1)', 'rgba(58, 112, 250, 1)']}
                style={styles.gradient}
            />
            <View style={styles.upper}>
                <CurrentWeather data={weatherData} />
            </View>
            <View style={styles.middle}>
                <DailyWeather data={forecastData} />
            </View>
           <View style={styles.lower}>
                <WeeklyWeather data={dailyTempData} />
            </View>
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
        paddingHorizontal: 5,
        paddingVertical:10,
    },

});
