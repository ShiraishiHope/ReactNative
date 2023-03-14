import * as React from 'react';
import { View, Text, StyleSheet, Dimensions, Image, ScrollView } from 'react-native';
import Ingredient from "../components/Ingredients";

export default function DetailScreen({route}) {
    const cocktail = route.params.cocktail;

    return (
        <ScrollView>
            <View style={styles.container}>
                <View >
                    <Text style={styles.title} >{cocktail.name}</Text>
                </View>
                <Image source={{ uri: cocktail.image }} style={styles.image} />
                <View />
                <View />
                <View />
                <Text style={styles.midTitle} >Instructions</Text>
                <Text style={styles.instructions} >{cocktail.instructions}</Text>
                <Text style={styles.midTitle} >Ingredients</Text>
                {
                    cocktail.ingredients.map((item, index) => (
                        <Ingredient key={index} ingredient={item} />
                    ))
                }
            </View>
        </ScrollView>
    );
}

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%",
        marginTop: 40,
        marginBottom: 40
    },
    header: {
        alignItems: 'center',
        justifyContent: 'center',
        width: width - 40,
        height: 50,
        backgroundColor: 'deepskyblue',
        position: 'relative',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        verticalAlign: 'middle',
        color: 'midnightblue',
    },
    image: {
        width: width - 40,
        height: width - 40,
        borderRadius: 100,
        borderWidth: 5,

    },
    instructions: {
        textAlign: 'justify',
        color: '#333333',
        margin: 10,
        fontSize: 18,
    },
    midTitle: {
        textAlign: 'left',
        fontSize: 25,
        textDecorationLine: 'underline',
        fontWeight: 'bold',
        color: 'dimgray',
        marginTop: 30,
    }
})