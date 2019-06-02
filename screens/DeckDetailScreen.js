import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity
} from 'react-native'
import { removeEntry } from '../utils/api'

export default class DeckDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title
  })

  AddCard = (deck, deckid, refreshDeck) => {
    this.props.navigation.navigate('AddCard', {deck: deck, deckid: deckid, refreshDeck:refreshDeck})
  }

  StartQuiz = (deck) => {
    this.props.navigation.navigate('Quiz', {deck:deck})
  }

  DeleteDeck = (deckid) => {
    removeEntry(deckid, () => {
      this.props.navigation.goBack()
    })
  }
  render() {
    const { deck, deckid, refreshDeck } = this.props.navigation.state.params
    const { title, questions } = deck
      return (
        <View style={styles.container}>
          <Text style={styles.deckname}>{title}</Text>
          <Text style={styles.cardamount}>{questions.length+" cards"}</Text>
          <View style={styles.btnaddcard}>
            <Button
              onPress={() => this.AddCard(deck,deckid,refreshDeck)}
              title="Add Card"
            />
          </View>
          <View style={styles.btnstartquiz}>
            <Button
              onPress={() => this.StartQuiz(deck)}
              title="Start Quiz"
            />
          </View>
          <TouchableOpacity onPress={() => this.DeleteDeck(deckid)}>
            <Text style={styles.txtdelete}>Delete Deck</Text>
          </TouchableOpacity>
        </View>
      );
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
    },
    cardamount: {
      fontSize: 15,
      marginTop: 5,
    },
    btnaddcard: {
      marginTop: 90,
      width: 200
    },
    btnstartquiz: {
      marginTop: 15,
      width: 200
    },
    txtdelete: {
      marginTop: 40,
      color: '#BF4042',
      fontWeight: 'bold',
      fontSize: 20
    }
});
  