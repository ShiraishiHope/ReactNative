import * as React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';


export default function Ingredient({ingredient}) {
    return (
        <View style={styles.container}>
            <Image source={{uri: `https://www.thecocktaildb.com/images/ingredients/${ingredient.name}-Small.png`}} style={styles.image} />
            <Text style={[styles.text, styles.name]} >{ingredient.name}</Text>
            <Text style={styles.text} >{ingredient.quantity}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: "100%",
        marginTop: 20,
        paddingRight: 20,
        paddingLeft: 0,
    },
    image: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
    },
    text: {
        fontSize: 20
    },
    name: {
        fontWeight: 'bold',
    }
})