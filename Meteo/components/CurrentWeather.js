import React, {useEffect, useState} from "react";
import {View, Image, Text, StyleSheet, FlatList} from "react-native";
const getIcon = (icon) => `http://openweathermap.org/img/wn/${icon}@4x.png`
const CurrentWeather = ({data}) => {
    const [currentWeather, setCurrentWeather] = useState(null)

    const weeklyDay = (dayIndex) => {
        switch (dayIndex) {
            case 0:
                return "Sunday";
            case 1:
                return "Monday";
            case 2:
                return "Tuesday";
            case 3:
                return "Wednesday";
            case 4:
                return "Thursday";
            case 5:
                return "Friday";
            case 6:
                return "Saturday";
        }
    }

    useEffect(() => {
        const weatherData = [{
            "id": 1,
            "day": weeklyDay(new Date(data.dt*1000).getDay()),
            "hour": new Date(data.dt*1000).getHours(),
            "temp": Math.round(data.main.temp),
            "humidity": data.main.humidity,
            "weather": data.weather[0].description,
            "weatherIcon": data.weather[0].icon
        }]

        setCurrentWeather(weatherData);
    }, [data]);


    const renderItem = ({item}) => {
        return (
            <View style={styles.item}>
                <Text style={styles.font}>{item.day}</Text>
                <Text style={styles.font}>{item.hour}H</Text>
                <Text style={styles.font}>{item.temp}°C</Text>
                <Text style={styles.font}>{item.weather}</Text>
                <Text style={styles.font}>{item.humidity}%</Text>
                <Image source={{uri: getIcon(item.weatherIcon)}} style={{width: 50, height: 50}} />
            </View>
        );
    }

    return (
        <>
            <FlatList
                data={currentWeather}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </>

    )
}
export default CurrentWeather;
const styles = StyleSheet.create({
    item: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical:30,
        paddingHorizontal:70,
        marginVertical: 8,
        marginHorizontal: 8,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#ccc",
        color:'#fff',
    },
    font: {
        color:'white',
    }
})
