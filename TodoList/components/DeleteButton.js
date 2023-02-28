import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';


const DeleteButton = ({ onPress }) => {
    return (
        <TouchableOpacity
            style={[styles.button, { backgroundColor: '#F00' }]}
            onPress={onPress}
        >
            <Text style={styles.text}>Delete</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        margin: 5,
        minWidth: 80,
        alignItems: 'center',

    },
    text: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default DeleteButton;