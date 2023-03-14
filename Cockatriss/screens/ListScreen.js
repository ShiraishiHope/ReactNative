import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image} from 'react-native';

const ListScreen = () => {
    const [selectedSearchType, setSelectedSearchType] = useState(null);
    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearchTypePress = (searchType) => {
        setSelectedSearchType(searchType);
    };

    const handleNameValidationPress = async () => {
        try {
            const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInput}`);
            const data = await response.json();
            setSearchResults(data.drinks);
        } catch (error) {
            console.error(error);
        }
    };
    const handleIngredientValidationPress = async () => {
        try {
            const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchInput}`);
            const data = await response.json();
            setSearchResults(data.drinks);
        } catch (error) {
            console.error(error);
        }
    };

    const renderNameSearchInput = () => {
        if (selectedSearchType === 'search-name') {
            return (
                <View style={styles.searchInputContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder={`Search by ${selectedSearchType}`}
                        onChangeText={setSearchInput}
                        value={searchInput}
                    />
                    <TouchableOpacity
                        style={styles.validationButton}
                        onPress={handleNameValidationPress}
                    >
                        <Text style={styles.validationButtonText}>Search</Text>
                    </TouchableOpacity>
                    {searchResults.length > 0 && (
                        <ScrollView contentContainerStyle={styles.searchResultsContainer}>
                            {searchResults.map((result) => (
                                <SearchResult key={result.idDrink} result={result} />
                            ))}
                        </ScrollView>
                    )}
                </View>
            );
        }
        return null;
    };

    const renderIngredientSearchInput = () => {
        if (selectedSearchType === 'search-ingredient') {
            return (
                <View style={styles.searchInputContainer}>
                    <TextInput style={styles.searchInput} placeholder={`Search by ${selectedSearchType}`}
                               onChangeText={setSearchInput} value={searchInput}/>
                    <TouchableOpacity style={styles.validationButton} onPress={handleIngredientValidationPress}>
                        <Text style={styles.validationButtonText}>Search</Text>
                    </TouchableOpacity>
                    <ScrollView contentContainerStyle={styles.searchResultsContainer}>
                        {searchResults.map((result) => (
                            <SearchResult key={result.idDrink} result={result}/>
                        ))}
                    </ScrollView>
                </View>
            );
        }
        return null;
    };
    const SearchResult = ({result}) => {
        return (
            <View style={styles.searchResultCard}>
                <Image source={{uri: result.strDrinkThumb}} style={styles.searchResultImage}/>
                <Text style={styles.searchResultTitle}>{result.strDrink}</Text>
                <Text style={styles.searchResultDescription}>{result.strInstructions}</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View>
                <View style={styles.buttonRow}>
                    <TouchableOpacity
                        style={selectedSearchType === 'search-ingredient' ? styles.selectedButton : styles.button}
                        onPress={() => handleSearchTypePress('search-ingredient')}>
                        <Text
                            style={selectedSearchType === 'search-ingredient' ? styles.selectedButtonText : styles.buttonText}>
                            Search by Ingredient
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={selectedSearchType === 'search-name' ? styles.selectedButton : styles.button}
                        onPress={() => handleSearchTypePress('search-name')}>
                        <Text
                            style={selectedSearchType === 'search-name' ? styles.selectedButtonText : styles.buttonText}>
                            Search by name
                        </Text>
                    </TouchableOpacity>
                </View>
                {renderNameSearchInput()}
                {renderIngredientSearchInput()}
            </View>

            <View style={styles.searchResultsContainer}>
                {searchResults.map((result) => (
                    <Text key={result.idDrink}>{result.strDrink}</Text>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchResultCard: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        margin: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchResultImage: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    searchResultTitle: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    searchResultDescription: {
        fontSize: 14,
        marginTop: 5,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    button: {
        backgroundColor: 'white',
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        width: '48%',
    },
    selectedButton: {
        backgroundColor: 'blue',
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        width: '48%',
    },
    buttonText: {
        color: 'black',
    },
    selectedButtonText: {
        color: 'white',
    },
    searchInputContainer: {
        width: '100%',
        paddingHorizontal: 20,
    },
    searchInput: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    searchResultsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ListScreen;