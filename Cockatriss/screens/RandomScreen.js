import React, {useEffect, useState} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import CocktailCard from "../components/CocktailCard";
import ReformatCocktail from "../components/ReformatCocktail";
import axios from "axios";

export default function RandomScreen({navigation}) {
    const [randomCocktails, setRandomCocktails] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [page, setPage] = React.useState(1)


    useEffect(() => {
        (async () => {
            await fetchData()
        })()
    }, [])

    async function fetchData() {
        try {
            const cocktails = []
            for (let i = 0; i < 10; i++) {
                let newCocktail = null

                while (newCocktail === null) {
                    const response = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php');
                    newCocktail = ReformatCocktail(response.data.drinks[0]);

                    if(cocktails.some(item => item.id === newCocktail.id) || randomCocktails.some(item => item.id === newCocktail.id)){
                        newCocktail = null;
                    }
                }
                cocktails.push(newCocktail)
            }
            setRandomCocktails([...randomCocktails, ...cocktails])
            setIsLoading(false)
        } catch (e) {
            console.log(e)
        }
    }
    const loadMore = () => {
        if (!isLoading) {
            setPage(page + 1);
            fetchData();
        }
    };

    const renderFooter = () => {
        return isLoading ? (
            <View>
                <Text>Loading...</Text>
            </View>
        ) : null;
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: "100%" }}>
            <FlatList
                data={randomCocktails}
                keyExtractor={(cocktail) => cocktail.id}
                renderItem={({item}) => <CocktailCard cocktail={item} navigation={navigation} />}
                onEndReached={loadMore}
                onEndReachedThreshold={0.1}
                ListFooterComponent={renderFooter}
                style={{ width: "100%" }}
                numColumns={2}
                contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
            />
        </View>
    );
}