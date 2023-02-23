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
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 10,
        alignSelf: 'flex-end',
        borderWidth:2,
        borderColor:'#000',
    },
    text: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default DeleteButton;