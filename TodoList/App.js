import React, {useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Pressable,
    Button,
    Modal,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    TouchableNativeFeedback,
    Keyboard,
    TextInput,

} from 'react-native';
import DeleteButton from './components/DeleteButton';
import BackgroundImage from './components/BackgroundImage';


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
    const [selectedObjective, setSelectedObjective] = useState('')
    const [selectedObjectiveIndex, setSelectedObjectiveIndex] = useState(-1)
    const [modalVisible, setModalVisible] = useState(false)
    const handleDelete = (index) => {
        const newObjectivesList = [...objectivesList]
        newObjectivesList.splice(index, 1)
        setObjectivesList(newObjectivesList)
        setModalVisible(false)
        setSelectedObjective('')
    }
    const renderItem = ({index, item}) => (

        <Pressable
            style={{flexDirection: 'row', justifyContent: 'space-between'}}
            onPress={() => {
                setSelectedObjective(item)
                setSelectedObjectiveIndex(index)
                setModalVisible(true)

            }}>
            <View style={styles.objectiveCard}>
                <Text style={[styles.objective, item === selectedObjective ? styles.completedObjective : null]}>
                    {item}
                </Text>
            </View>
        </Pressable>

    )
    /*            */
    const addButtonPress = (item) => {
        const newObjectivesList = [...objectivesList]
        const index = newObjectivesList.indexOf(item)
        if (selectedObjective === '') {
            newObjectivesList.push(objective)
        } else if (index !== -1) {
            newObjectivesList[index] = selectedObjective
        }
        setObjectivesList(newObjectivesList)
        setModalVisible(false)
        setSelectedObjective('')
        Keyboard.dismiss()
    }
    const editButtonPress = (item, index) => {
        const updateList = objectivesList.map((currentItem, currentIndex) => (
            index == currentIndex ? item : currentItem
        ))
        setObjectivesList(updateList)
    }

    /*START OF RETURN*/
    return (
        <View style={styles.container}>
            <BackgroundImage/>
            <Text style={styles.text}>To-do List</Text>
            <FlatList
                contentContainerStyle={styles.containerList}
                data={objectivesList}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />
            <Modal
                animationType={'slide'}
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible)
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TextInput
                            style={styles.textStyle}
                            value={selectedObjective}
                            onChangeText={(text) => setSelectedObjective(text)}
                        />
                        <View style={{ flexDirection: 'row' }}>
                            <DeleteButton
                                title="Delete" onPress={() => handleDelete(index)}
                                onPress={() => handleDelete(selectedObjectiveIndex)}
                            />
                            <Pressable
                                style={[styles.button, styles.buttonSave]}
                                onPress={() => {
                                    editButtonPress(selectedObjective,selectedObjectiveIndex);
                                    setModalVisible(!modalVisible);
                                    setSelectedObjective('');
                                }}>
                                <Text style={styles.textStyle}>Save</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => {
                                    setModalVisible(!modalVisible);
                                    setSelectedObjective('');
                                }}>
                                <Text style={styles.textStyle}>Cancel</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.input}
                    placeholder={"New Task"}
                    value={objective}
                    onChangeText={(text) => setObjectives(text)}
                />
                <Button style={styles.addButton}
                    title="Add"
                    onPress={addButtonPress}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',

    },
    text: {
        color: '#F00',
        fontWeight: 'bold',
        marginTop: 50,
        fontSize: 20,
    },
    inputView: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginVertical: 10,
    },
    input: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
        color: '#000',
    },
    addButton: {
        backgroundColor: '#007AFF',
        borderRadius: 10,
        padding: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    keyboardAvoidingContainer: {
        flex: 1,
    },
    objective: {
        alignSelf: 'center',
    },
    completedObjective: {
        textDecorationLine: 'line-through',
    },
    objectiveCard: {
        backgroundColor: '#fff',
        padding: 10,
        marginVertical: 5,
        marginHorizontal: 10,
        borderRadius: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        margin: 5,
        minWidth: 80,
        alignItems: 'center',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    buttonSave: {
        backgroundColor: '#4CAF50',
    },
});