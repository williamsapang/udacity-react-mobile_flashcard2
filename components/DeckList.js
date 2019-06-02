import React from 'react';
import { StatusBar, View, Text, TouchableOpacity, StyleSheet, ScrollView, Platform } from 'react-native';
import { getItem, clearAllDeck, initiateDeck } from '../utils/api'
import { NavigationEvents } from 'react-navigation'
const initiate_data = {
    React: {
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ]
    },
    JavaScript: {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    }
  }

export class DeckList extends React.Component {
    state = {
        decks: {}
    }
    componentDidMount(){
      this.deckRefresh()
    }
    deckRefresh = () => {
      // initiateDeck(initiate_data)
      // clearAllDeck()
      getItem((data) => {
        this.setState({ decks: data || {} })
      })
    }
    render() {
        const {decks} = this.state
        const {navigate} = this.props.navigation;
        const deckcalculate = Object.values(decks).length
        return (
          <View style={styles.container}>
            <NavigationEvents
              onDidFocus={payload => {this.deckRefresh()}}
            />
            {deckcalculate > 0 ? 
                <View style={{flex: 1, justifyContent: 'center'}}>
                  <ScrollView>
                  {Object.entries(decks).map(([key,deck]) => (
                      <TouchableOpacity activeOpacity={1} key={key} style={styles.deck} onPress={() => {navigate('DeckDetail', {title: deck.title, deck:deck, deckid:key, deckRefresh: this.deckRefresh.bind(this)})}}>
                          <Text style={styles.label}>{deck.title}</Text>
                          <Text style={styles.cardcount}>{deck.questions.length+" cards"}</Text>
                      </TouchableOpacity>
                  ))}
                  </ScrollView>
                </View>
                :
                <View>
                    <Text style={{fontSize:17, fontWeight:'bold', margin: 20, textAlign:'center'}}>There are no decks in list. Select "Add Deck" to create one</Text>
                </View>
            }
          </View>
      ) 
    }
    
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ee9ca7',
      justifyContent: 'center',
      alignItems: 'stretch',
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    deck: {
        backgroundColor: '#ffdde1',
        alignItems: 'center',
        padding: 20,
    },
    label: {
        fontWeight: 'bold',
        color: '#d9a7c7'
    },
    cardcount: {
        color: '#fffcdc',
        fontSize: 14
    }
  });
