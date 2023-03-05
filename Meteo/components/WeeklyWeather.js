import React, {useEffect, useState} from "react";
import {View, Image, Text, StyleSheet, FlatList, Button} from "react-native";
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
            <View style={styles.listItem}>
                <Text style={styles.font}>{item.hour}H</Text>
                <Text style={styles.listItemText}  style={styles.font}>{item.temp}°C</Text>
                <Text style={styles.listItemText}  style={styles.font}>{item.humidity}%</Text>
                <Image source={{uri: getIcon(item.weatherIcon)}} style={{width: 30, height: 30}} />
            </View>
        );
    }

    return (
        <>
            <View style={styles.hourly}>
                <Text style={styles.hourlyText} style={styles.font}>Hourly</Text>
            </View>
            <View style={styles.listContainer}>
                <FlatList
                    data={weeklyWeather}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        </>

    )
}
export default WeeklyWeather;
const styles = StyleSheet.create({
    listContainer: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
    },
    listItem: {
        flex: 1,
        width: '33%',
        alignItems: 'center',
        justifyContent: 'center',

        paddingHorizontal: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#ccc",
        marginHorizontal: 6,
    },
    hourly: {

        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    hourlyText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    listItemText: {
        fontSize: 16,
    },
    font: {
        color:'white',
    }})
