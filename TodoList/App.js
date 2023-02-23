import {useState} from 'react';
import {StyleSheet, Text, View, FlatList, TextInput, Button, StatusBar} from 'react-native';
import DeleteButton from './components/DeleteButton';

const sampleGoals = [
    "Faire les courses",
    "Aller à la salle de sport 3 fois par semaine",
    "Monter à plus de 5000m d altitude",
    "Acheter mon premier appartement",
    "Perdre 5 kgs",
    "Gagner en productivité",
    "Apprendre un nouveau langage",
    "Faire une mission en freelance",
    "Organiser un meetup autour de la tech",
    "Faire un triathlon",
];

export default function App() {
    const [objective, setObjectives] = useState('')
    const [objectivesList, setObjectivesList] = useState(sampleGoals)
    const handleDelete = (index) => {
        const newObjectivesList = [...objectivesList];
        newObjectivesList.splice(index, 1);
        setObjectivesList(newObjectivesList);
    }
    const renderItem = ({index, item}) => (
        <View style={{flexDirection: 'row'}}>
            <Text style={styles.objective}>{item} </Text>
            <DeleteButton
                style={styles.deleteButton}
                title="Delete" onPress={() => handleDelete(index)}
                onPress={() => handleDelete(index)}
            />
        </View>)
    const handleButtonPress = () => {
        setObjectivesList([...objectivesList, objective]);
        setObjectives('');
    }
    return (

        <View style={styles.container}>
            <StatusBar style="auto"/>
            <Text style={styles.text}>What's 42?</Text>
            <View style={styles.list}>

                <FlatList
                    contentContainerStyle={styles.containerList}
                    data={objectivesList}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
                <View style={styles.inputView}>
                <TextInput
                    style={styles.input}
                    placeholder={"Don't write here"}
                    value={objective}
                    onChangeText={(text) => setObjectives(text)}
                />
                <Button
                    title="Don't Press me"
                    onPress={handleButtonPress}
                />
                </View>
            </View>


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',


    },
    text: {
        color: '#F00',
        fontWeight: 'bold',
    },
    input: {
        height: 40,
        minWidth: 80,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    objective: {
        alignSelf: 'center',
    },
    containerList: {
        flex: 1,
        justifyContent: 'center',
    },
    deleteButton: {
        alignSelf: 'flex-end',
        backgroundColor: '#F00',
    },
    inputView: {
        alignSelf: 'center',
    },
});
