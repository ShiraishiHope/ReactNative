import React, { useState, useEffect } from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

export default function RandomCocktail () {
    const [drinkId, setDrinkId] = useState(null);
    const [drinkName, setDrinkName] = useState(null);
    const [drinkImage, setDrinkImage] = useState(null);


    useEffect(() => {
        async function fetchData() {
            const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
            const data = await response.json()

            const drink = data.drinks[0]
            setDrinkId(drink.idDrink)
            setDrinkName(drink.strDrink)
            setDrinkImage(drink.strDrinkThumb)


        }

        fetchData();
    }, []);
console.log(drinkImage)
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{drinkName}</Text>
            <Image style={styles.image} source={{uri: drinkImage}} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    image: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        marginBottom: 10,
    },
});