import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import RandomCocktail from "../components/RandomCocktail";

const RandomScreen = () => {


    const handleHomePress = () => {
        navigation.navigate('Home', {username: 'User'})
    }
    const handleRandomPress = () => {
        navigation.navigate('Random', {username: 'User'})
    }
    return (
        <View style={styles.container}>

            <RandomCocktail/>
            <Text style={styles.subtitle}>Cocktail of the day</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        color: '#666',
    },
});

export default RandomScreen;