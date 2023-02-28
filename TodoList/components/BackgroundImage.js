import React from 'react';
import {  View, ImageBackground, Dimensions, StyleSheet} from 'react-native';

const { width, height } = Dimensions.get('window');
const BackgroundImage = () => {
const image = require('../assets/background.jpg');
    return (
        <View style={styles.container}>
            <ImageBackground
                source={image}
                resizeMode="cover"
                style={styles.img}/>
        </View>
    )
}

export default BackgroundImage;

const styles = StyleSheet.create({
    container: {
        position:'absolute',
        top:0,
        left:0,
        width:width,
        height:height,
    },
    img: {
        width:width,
        height:height,
    }
})