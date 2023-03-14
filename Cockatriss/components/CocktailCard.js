import * as React from 'react';
import { View, Text, Image, Dimensions, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const { width } = Dimensions.get('window');
const cardWidth = (width - 40) / 2;

export default function CocktailCard({ navigation, cocktail }) {
    return (
        <TouchableOpacity onPress={() => navigation.navigate('RandomStack', {
            screen: 'DetailScreen',
            params: {cocktail}})}>
            <View style={[styles.cardContainer, styles.card]}>
                <Image source={{ uri: cocktail.image }} style={styles.cardImage} />
                <View style={styles.cardContent}>
                    <Text style={styles.cardTitle}>{cocktail.name}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        marginHorizontal:10,
    },
    cardContainer: {
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 20,
        width: cardWidth,
        height: cardWidth * 1.5,
        backgroundColor: 'white',
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 0 },
    },
    cardImage: {
        width: '100%',
        height: '75%',
    },
    cardContent: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '25%',
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: 10,
    },
});

