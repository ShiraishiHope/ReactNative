import React, {useEffect, useState} from "react";
import {View, Image, Text, StyleSheet, FlatList, Button} from "react-native";
import {isSameDay} from "date-fns";
const getIcon = (icon) => `http://openweathermap.org/img/wn/${icon}@4x.png`
const WeeklyWeather = ({data}) => {
    const [weeklyWeather, setWeeklyWeather] = useState(null)
    const weeklyDay = (dayIndex) => {
        switch (dayIndex){
            case 0:
                return "Sun";
            case 1:
                return "Mon";
            case 2:
                return "Tue";
            case 3:
                return "Wed";
            case 4:
                return "Thu";
            case 5:
                return "Fri";
            case 6:
                return "Sat";
        }

    }
    useEffect(() => {
        const weatherData = data.list.slice(0,8).map((item, i) => ({

            "id": i,

            "day": weeklyDay(new Date(item.dt*1000).getDay()),
            "hour": new Date(item.dt*1000).getHours(),
            "temp": Math.round(item.main.temp),
            "humidity": item.main.humidity,
            "weather": item.weather[0].description,
            "weatherIcon": item.weather[0].icon
        }));
        setWeeklyWeather(weatherData);
    }, [data]);

    const renderItem = ({item}) => {
        return (
            <View style={styles.item}>
                <Text>{item.day}</Text>
                <Text>{item.hour}H</Text>
                <Text>{item.temp}°C</Text>
                <Text>{item.weather}</Text>
                <Text>{item.humidity}%</Text>
                <Image source={{uri: getIcon(item.weatherIcon)}} style={{width: 50, height: 50}} />
            </View>
        );
    }

    return (
        <>
            <FlatList
                data={weeklyWeather}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </>

    )
}
export default WeeklyWeather;
const styles = StyleSheet.create({
    item: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#ccc",
    },
})
