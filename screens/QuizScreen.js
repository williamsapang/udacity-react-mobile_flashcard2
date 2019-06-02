import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput
} from 'react-native'
import {
    clearLocalNotification,
    setLocalNotification
} from '../utils/helpers'

ShowAnswer = ({answer, answer_input}) => {
    if(answer === answer_input){
        return <Text style={{fontSize:30, fontWeight:'bold', color:'green', textAlign:'center', marginTop:20}}>correct</Text>
    }else{
        return (
            <View>
                <Text style={{fontSize:30, fontWeight:'bold', color:'red', textAlign:'center', marginTop:20}}>incorrect</Text>
                <Text style={{fontSize:17, fontWeight:'bold', textAlign:'center', marginTop:30}}>Correct Answer : </Text>
                <Text style={{fontSize:20, fontWeight:'bold', textAlign:'center'}}>{answer}</Text>
            </View>
        )   
    }
}

ResetNotification = () => {
    clearLocalNotification().then(setLocalNotification)
    return null
}
export default class QuizScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: "Quiz"
    })
    state = {
        question_number:1,
        answer_input: "",
        answer_pressed: false,
        answer_correct: 0
    }
    Answer = ({answer, answer_input}) => {
        this.setState({answer_pressed:true})
        answer === answer_input ? this.setState({answer_correct:this.state.answer_correct+1}) : null
    }
    Next = () => {
        this.setState({answer_pressed:false, answer_input: "", question_number:this.state.question_number+1})
    }
    Restart = () => {
        this.setState({
            question_number:1,
            answer_input: "",
            answer_pressed: false,
            answer_correct: 0
        })
    }
    render() {
        const { question_number, answer_input, answer_pressed, answer_correct } = this.state
        const { deck } = this.props.navigation.state.params
        const { questions } = deck
        const question_count = deck.questions.length
        const { question, answer } = question_count>0 ? questions[question_number-1] : {"":""}
        const ready = answer_input === ""
        return(
            <View style={styles.container}>
            {question_count > 0 ?
                <View style={styles.questioncontainer}>
                    <Text style={styles.questionlabel}>{"Question " + question_number + " / " + question_count}</Text>
                    <Text style={styles.questionlabel}>{question}</Text>
                    <TextInput 
                        editable={!answer_pressed}
                        style={styles.txtanswer}
                        onChangeText={(answer_input) => this.setState({answer_input})}
                        value={answer_input}
                        placeholder="Answer"
                    ></TextInput>
                    {!answer_pressed ?
                        <View style={styles.btnanswer}>
                            <Button
                                disabled={ready}
                                onPress={() => this.Answer({answer:answer, answer_input:answer_input})}
                                title="Answer"
                            />
                        </View>
                    :
                        <View>
                            <ShowAnswer answer={answer} answer_input={answer_input}></ShowAnswer>
                            { question_number === question_count ?
                                <View style={styles.questioncontainer}>
                                    <ResetNotification></ResetNotification>
                                    <Text style={{fontSize:40, marginTop:40, fontWeight:'bold', color:'blue', textAlign:'center'}}>{"Your Score : " + answer_correct}</Text>
                                    <View style={styles.btnanswer}>
                                        <Button
                                            disabled={ready}
                                            onPress={() => this.Restart()}
                                            title="Restart"
                                        />
                                    </View>
                                </View>
                                :
                                <View style={styles.btnanswer}>
                                    <Button
                                        disabled={ready}
                                        onPress={() => this.Next()}
                                        title="Next Question"
                                    />
                                </View>
                            }
                        </View>          
                    }
                </View>
                :
                <Text style={styles.label}>Sorry, you cannot take a quiz because there are no cards in the deck</Text>
            }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        textAlign: 'center',
        margin: 30,
        fontSize: 18
    },
    questioncontainer: {
        flex: 1,
        alignItems: 'center',
        margin:30
    },
    questionlabel: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    btnanswer: {
        marginTop: 20,
        width: 150,
    },
    txtanswer: {
        width: 300,
        borderColor: 'gray', 
        marginTop: 20,
        borderWidth: 1, 
        paddingLeft: 10,
        paddingRight: 10,
    },
});