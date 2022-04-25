import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import {View, Text, StyleSheet, ImageBackground, Button } from  'react-native';

/*
Goals:
1. Make answer check case insensitive
2. Use a quiz api to get the json from there and populate questions
3. The question array/object should be randomized

Reading:

1. Javascript arrow operators and usage of arrow operato
*/

function OnPressWelcomeScreenButton(navigation) {
    navigation.navigate('Home');
}

function WelcomeScreen({navigation}) {

    return (
        <ImageBackground style={styles.bgimage} source={require('./assets/portraittrivia.png')}>
            <View style={styles.container}>
                <Text style={styles.textstyle} >Welcome to QuizME! Are you ready to test your knowledge? </Text>
                <View style={styles.buttonstyle}>
                    <Button color={'gold'} title= "Start quiz " onPress={() => OnPressWelcomeScreenButton(navigation)}/>
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-around',
        
    },
    textstyle: {
        position: 'absolute',
        top: 300,
        fontSize: 24,
        color: 'gold',

    },
    bgimage: {
        flex: 1,
        width: '100%',
    },
    buttonstyle: {
        position: 'absolute',
        top: 600,
        left: 150,
        color: 'gold',
    }
})

export default WelcomeScreen;