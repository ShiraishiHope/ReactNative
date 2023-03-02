import React, {useEffect, useState} from "react";
import {View,Image, Text, StyleSheet} from "react-native";
import {isSameDay} from "date-fns";
const getIcon = (icon) => `http://openweathermap.org/img/wn/${icon}@4x.png`
const CurrentWeather = ({data}) => {
    const [currentWeather, setCurrentWeather] = useState(null)
    useEffect(()=> {
        const currentW = data.list.filter(forecast => {
            const today = new Date().getTime()+Math.abs(data.city.timezone*1000)
            const forecastDate = new Date(forecast.dt * 1000)
            return isSameDay(today, forecastDate)
        })
        setCurrentWeather(currentW[0])
    }, [data])
    return (
        <>
            <Text style={styles.city}>{data?.city?.name}</Text>
            <Text>Today</Text>
            <Image source = {{uri:getIcon(currentWeather?.weather[0].icon)}}
                   style={{width:200, height:200}}
            />
            <Text>{Math.round(currentWeather?.main.temp)}°C</Text>
            <Text>{currentWeather?.weather[0].description}</Text>


        </>
    )
}
export default CurrentWeather;
const styles = StyleSheet.create({
    city: {
        fontSize: 24,
        fontWeight: "bold",
    },
})
