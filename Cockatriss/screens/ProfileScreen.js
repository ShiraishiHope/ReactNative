import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';


const ProfileScreen = () => {


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to my app!</Text>
            <Text style={styles.subtitle}>This is the profile screen.</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        color: '#666',
    },
});

export default ProfileScreen;