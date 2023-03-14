import React, {useState} from 'react';
import {View, Text, Button, StyleSheet,TextInput} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment, incrementByAmount, multiplyByAmount,exponentAmount,reset } from './counterSlice';

export function Counter() {
    const count = useSelector(state => state.counter.value);
    const dispatch = useDispatch();
    const [number, setNumber] = useState('');
    const handleExponentChange = (text) => {
        setNumber(text);
    }

    const handleExponentPress = () => {
        const parsedExponent = parseInt(number);
        dispatch(exponentAmount(parsedExponent));    }
    const handleMultiplyPress = () => {
        const parsedExponent = parseInt(number);
        dispatch(exponentAmount(parsedExponent));    }

    return (
        <View>
            <View  style={styles.counter}>
                <Button
                    title="Increment value"
                    onPress={() => dispatch(increment())}
                />
                <Text>{count}</Text>
                <Button
                    title="Decrement value"
                    onPress={() => dispatch(decrement())}
                />
                <Button
                    title="addition"
                    onPress={() => dispatch(incrementByAmount())}
                />

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Exponent"
                        keyboardType='numeric'
                        value={number}
                        onChangeText={handleExponentChange}
                    />
                    <Button
                    title="multiply by"
                    onPress={() => dispatch(multiplyByAmount())}
                />
                    <Button
                        title="exponent"
                        onPress={handleExponentPress}
                    />
                </View>
                <Button
                    title="reset"
                    onPress={() => dispatch(reset())}
                />
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    counter: {
        margin:30,
        paddingTop:20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    input: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderWidth: 1,
        borderRadius: 5,
        flex: 1,
        marginRight: 10,
    },
})