import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity
} from 'react-native'
import { submitCard } from '../utils/api'

export default class AddCardScreen extends React.Component {
    static navigationOptions = {
        title: "Add Card"
    }
    state = {
        question : "",
        answer : ""
    }

    Submit = (deckid, refreshDeck) => {
        const newCard = {
            question: this.state.question,
            answer: this.state.answer,
            myanswer: ""
        }
        submitCard(newCard,deckid,(newdeck)=>{
            this.props.navigation.navigate('DeckDetail', {title: newdeck[deckid].title, deck:newdeck[deckid], deckid:deckid, refreshDeck:refreshDeck})
            refreshDeck()
        })
    }
    render(){
        const {question, answer} = this.state
        const ready = question === "" || answer === ""

        const { deck, deckid, refreshDeck } = this.props.navigation.state.params
        return(
            <View style={styles.container}>
                <Text style={styles.deckname}>{deck.title}</Text>
                <TextInput
                    style={styles.txtinput}
                    onChangeText={(question) => this.setState({question})}
                    value={this.state.question}
                    placeholder="Question"
                />
                <TextInput
                    style={styles.txtinput}
                    onChangeText={(answer) => this.setState({answer})}
                    value={this.state.answer}
                    placeholder="Answer"
                />
                <View style={styles.btnsubmit}>
                    <Button
                        disabled={ready}
                        onPress={() => this.Submit(deckid,refreshDeck)}
                        title="Submit"
                    />
                </View>
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
    deckname: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    txtinput: {
        width: '80%',
        borderColor: 'gray', 
        marginTop: 20,
        borderWidth: 1, 
        paddingLeft: 10,
        paddingRight: 10,
    },
    btnsubmit: {
        marginTop: 150,
        width: 150,
    },
})