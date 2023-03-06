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
    const weeklyDayIcon = (dayIndex) => {
        switch (dayIndex){
            case 0:
                return "01d";
            case 1:
            case 2:
            case 3:
                return "02d";
            case 45:
            case 48:
                return "50d";
            case 51:
            case 53:
            case 55:
            case 56:
            case 57:
            case 80:
            case 81:
            case 82:
                return "09d";
            case 61:
            case 63:
            case 65:
            case 66:
            case 67:
                return "10d";
            case 71:
            case 73:
            case 75:
            case 77:
            case 85:
            case 86:
                return "13d";
            case 95:
            case 96:
            case 99:
                return "11d";
        }

    }
    console.log("HELP: "+data.daily.time.length)
    useEffect(() => {
        const dailyData = []
       for (let i = 0; i<data.daily.time.length; i++){
            dailyData[i] = {
            "id": i,
            "day": weeklyDay(new Date(data.daily.time[i]).getDay()),
            "weathercode": weeklyDayIcon(data.daily.weathercode[i]),
            "minTemp": data.daily.temperature_2m_min[i],
            "maxTemp": data.daily.temperature_2m_max[i]
            }
       }
       console.log(dailyData)
        setWeeklyWeather(dailyData);
    }, [])


    const renderItem = ({item}) => {
        return (
            <View style={styles.listItem}>
                <Text style={[styles.listItemText, styles.font]}>{item.day}</Text>
                <Image source={{uri: getIcon(item.weathercode)}} style={{width: 30, height: 30}} />
                <Text style={[styles.listItemText, styles.font]}>{item.minTemp}°C</Text>
                <View style={styles.diagonalLine}></View>
                <Text style={[styles.listItemText, styles.font]}>{item.maxTemp}°C</Text>
            </View>
        );
    }

    return (
        <>
            <View style={styles.hourly}>
                <Text style={styles.hourlyText} style={styles.font}>Weekly</Text>
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
        paddingHorizontal: 1,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        marginHorizontal: 2,
    },
    hourly: {

        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 5,
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
    },
    diagonalLine: {


        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'white',
        width: '1%',
        height: '20%',
        transform: [{ rotate: '90deg' }]
    }

})
