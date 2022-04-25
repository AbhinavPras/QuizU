import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { ImageBackground, Text, StyleSheet, TextInput, View, Button, RefreshControl, ScrollView, Alert, FlatList, SafeAreaView, ActivityIndicator, Image } from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import EndScreen from './EndScreen';
import { clear } from 'react-native/Libraries/LogBox/Data/LogBoxData';

/*
function GoToEndScreen(navigation) {
    navigation.navigate('End', { FinalScore: Score} )
}
*/

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

function HomeScreen () {
    /*
    const Quiz = require('./assets/quiz.json');
    */
    const [TypedText, setTypedText] = React.useState("");
    const [QnNumber, setQnNumber] = React.useState(1);
    const [Score, setScore] = React.useState(0);
    const [data, setData] = React.useState([]);
    /*
        const [data, setData] = useState({
            "results": [
            ]
            ]
        })
    */

    const [isLoading, setLoading] = React.useState(true);
    const [clearTextInput, setClearTextInput] = useState(false);
    
    useEffect(() => {
        fetch('https://opentdb.com/api.php?amount=10')
        .then( (response) => response.json() )
        .then( (json) => {
            let tempData = json;
            /*
            let tempData = data;
            tempData.results = json.results;
            for(let i = 0; i < tempData.results.length; i++) {
                tempData.results[i].incorrect_answers.push(tempData.results[i].correct_answer);
                // Randomize it.
                shuffle(tempData.results[i].incorrect_answers);
            }
            */
            for(let i = 0; i < tempData.results.length; i++) {
                tempData.results[i].incorrect_answers.push(tempData.results[i].correct_answer);
                // Randomize it.
                shuffle(tempData.results[i].incorrect_answers);
            }
            setData(json);
            setLoading(false);
        })
        .catch( (err) => console.error(err) )
        .finally(() => setLoading(false) ) 
    }, []);

    // let array = data.results;
    // if (QnNumber>1) {
        // console.log(array[QnNumber-1]);
    // }
    
    const OnPressText = () => {
        
        setTypedText("");
        // setClearTextInput(true);
        // Quiz.QuizQuestions.length
        // setQnNumber(QnNumber+1)
        
        let QuestionIndex = QnNumber - 1;
        if (TypedText.toLowerCase() == data.results[QuestionIndex].correct_answer.toLowerCase()) {
            setScore(Score+1)
        }
        
        // if (QnNumber == Quiz.QuizQuestions.length) {
        if (QnNumber == 10 ) {
            setQnNumber(QnNumber+1);
        } else {
            setQnNumber(QnNumber + 1);
        }
    }

    const IsTrueOrFalseQuestion = () => {
        if ( data.results[QnNumber-1].type == "boolean" ) {
            return " True/False "
        }
        return ""
    }
    
    const isSpecialCharacters = () => {
        let initial_str = data.results[QnNumber-1].question;
        let initial_str_2 = initial_str.replaceAll("&quot;","");
        let initial_str_3 = initial_str_2.replaceAll("&#039;","'");
        let initial_str_4 = initial_str_3.replaceAll("&deg;","°");
        let initial_str_5 = initial_str_4.replaceAll("&ldquo;",'""');
        let initial_str_6 = initial_str_5.replaceAll("&rdquo;",'""');
        let initial_str_7 = initial_str_6.replaceAll("&eacute;",'é');
        let initial_str_8 = initial_str_7.replaceAll("&amp;","&");
        let final_str = initial_str_8.replaceAll("&quot;","'");
        
        return final_str
    }
    
    const IsMCQ = () => {
        let array = [];
        let answer_string= '';
        let Options = ['A. ', 'B. ', 'C. ', 'D. '];
        // if ( data.results[QnNumber-1].type == "multiple" ) {
            for (let i = 0; i < data.results[QnNumber - 1].incorrect_answers.length; i++) {
                let example_str = data.results[QnNumber-1].incorrect_answers[i];
                let example_str2 = example_str.replaceAll("&quot;","'");
                let example_str3 = example_str2.replaceAll("&#039;","'");
                let example_str4 = example_str3.replaceAll("&deg;","°");
                let example_str5 = example_str4.replaceAll("&ldquo;",'""');
                let example_str6 = example_str5.replaceAll("&rdquo;",'""');
                let example_str7 = example_str6.replaceAll("&eacute;",'é');
                let final_example = example_str7.replaceAll("&amp;","&");
                

                answer_string += Options[i] + final_example + '\n';
            }
            
            // array.push(data.results[QnNumber-1].correct_answer);
            // array.push(data.results[QnNumber-1].incorrect_answers[0]);
            // array.push(data.results[QnNumber-1].incorrect_answers[1]);
            // array.push(data.results[QnNumber-1].incorrect_answers[2]);
            // for (let i = array.length -1; i > 0; i--) {
            //     let j = Math.floor(Math.random() * (i + 1));
            //     [array[i], array[j]] = [array[j], array[i]];
            // }
            // answer_string = array[0] + '\n';
            // answer_string += array[1] + '\n';
            // answer_string += array[2] + '\n';
            // answer_string += array[3] + '\n';

            return answer_string
        // }
            
        // array.push(data.results[QnNumber-1].correct_answer);
        // array.push(data.results[QnNumber-1].incorrect_answers[0]);

        // answer_string = array[0] + '\n';
        // answer_string += array[1] + '\n';

        // return answer_string

    }
    

    // onChangeText={(text) => setTypedText(text)}
    if (QnNumber < 11) {
        return (
            <View style={{flex: 1,backgroundColor: 'lightblue'}}>
                { isLoading ? <Text> Loading ... </Text> : 
                    (
                        <View style={styles.container}>
                            <Text style={styles.QNCOUNT}>Question {QnNumber} / 10</Text>
                            <Text style={styles.SCORECOUNT}> Score: {Score} / 10 </Text>
                            <Text style={{fontSize: 18, position: 'absolute', top: 70,}}> {isSpecialCharacters() + IsTrueOrFalseQuestion()} </Text>
                            <Text style={{fontSize: 18, position: 'absolute', top: 160, left: 50, textAlign: 'justify'}}>{IsMCQ()}</Text>
                            <Text style={styles.typtext}> Enter the answer: </Text>
                            <TextInput  style={styles.input} onChangeText={text => setTypedText(text)} value={TypedText} autoCorrect={false} clearButtonMode='always'  />
                            <View style={styles.buttonmap}>
                                <Button title='Submit answer' onPress={() => { OnPressText() }} />
                            </View>
                        </View>
                ) }
            </View>
        );
    }
    else {
        if ((Score/10) >= (7/10) ) {
            return (
                <ImageBackground style={styles.bgsuccessimagestyle} resizeMode='contain' source={require('./assets/CelebBG.png')}>
                    <Text style={styles.endscreentext}> Your score is {Score} / 10 </Text>
                    <View style={styles.successimagestyle}>
                        <Image source={require('./assets/celebration.png')}/> 
                    </View>      
                </ImageBackground> 
            
            );
        }
        else {
            return (
                <ImageBackground style={styles.bgfailimagestyle} resizeMode='contain' source={require('./assets/failBG.png')}>
                        <Text style={styles.endscreentext}> Your score is {Score} / 10 </Text>
                        <View style={styles.failimagestyle}>
                            <Image source={require('./assets/fail.png')}/> 
                        </View>      
                    </ImageBackground> 
                
                );
            }
        }
        
        
        /*
        let QuizLength = Quiz.QuizQuestions.lengthabc;
        
        if (QnNumber <= Quiz.QuizQuestions.lengthabc) {
            return (
                <View style={styles.container}> 
                <Text style={styles.QNCOUNT}> Question {QnNumber} / 2 </Text>
                <Text style={styles.SCORECOUNT}> Score: {Score} / 2 </Text>
                <Text style={styles.typtext}>{Quiz.QuizQuestions[QnNumber-1].Question}</Text>
                <Text style={styles.typtext}> Enter the answer: </Text>
                <TextInput style={styles.input} onChangeText={(text) => setTypedText(text)} value={TypedText}/>
                <View style={styles.buttonmap}>
                <Button title= "Submit answer" onPress={OnPressText}/>
                </View>
                </View>
                );
            }
            {data.results[QnNumber-1].incorrect_answers[0]}
            <Text style={{fontSize: 18, position: 'absolute', top: 175, left: 30,}}> {data.results[QnNumber-1].correct_answer} </Text>
            */
           
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        position: 'absolute',
        borderWidth: 1,
        borderColor: 'black',
        margin: 10, 
        padding: 10,
        width: 200,
        bottom: 360,
    },
    typtext: {
        fontSize: 18,
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 70,
    },
    buttonmap: {
        position: 'absolute',
        bottom: 300,
    },
    QNCOUNT: {
        position: 'absolute',
        top: 30,
        left: 30,
    },
    SCORECOUNT: {
        position: 'absolute',
        top: 30,
        right: 30,
    },
    finishbutton: {
        position: 'absolute',
        left: 30,
    },
    endscreentext: {
        flex: 1,
        position: 'absolute',
        top:150,
        left: 100,
        fontSize: 22,
        color: 'black',
    },
    successimagestyle: {
        position: 'absolute',
        top: 500,
        left: 85,
    },
    failimagestyle: {
        position: 'absolute',
        top: 550,
        left: 60,
    },
    bgsuccessimagestyle: {
        flex: 1,
        justifyContent: 'center',
        bottom: 100,
        backgroundColor: 'green',
    },
    bgfailimagestyle: {
        flex: 1,
        justifyContent: 'center',
        bottom: 100,
        backgroundColor: 'red',
    }
})

export default HomeScreen;

/*
else {
    return (
        <View style={styles.container}>
            {/* <ImageBackground style={styles.bgimagestyle} source={require('./assets/CelebBG.png')}> */
               // <Text style={styles.endscreentext}> Your score is {Score} / 2 </Text>
               // <View style={styles.imagestyle}>
               //     <Image source={require('./assets/celebration.png')}/> 
               // </View>  

           // {/* </ImageBackground> */}
       // </View>
       // );
// }

