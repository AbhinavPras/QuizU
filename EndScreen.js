import React from 'react';
import { Text, StyleSheet } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

function EndScreen({navigation , route}) {
    const QuizQn = require('./assets/quiz.json')
    let a = QuizQn.QuizQuestions.length

    return (
        <Text style={styles.container}> Your score is {route.params.refresh()} / {a}</Text>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default EndScreen;