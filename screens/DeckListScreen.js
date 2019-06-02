import React from 'react';
import {
  Platform,
  StyleSheet,
  View,
  StatusBar,
  ScrollView
} from 'react-native';


import { DeckList } from '../components/DeckList';
import { connect } from 'react-redux';
import { NavigationEvents } from 'react-navigation'
import { bindActionCreators } from 'redux';
import { addDeck } from '../actions/deckactions';
class DeckListScreen extends React.Component {
  static navigationOptions = {
    header: null,
    // tabBarOnPress: ({navigation, defaultHandler}) => {
    //   console.log("TAB BAR PRESSED")
    //   defaultHandler()
    // }
  };
  
  // static navigationOptions = () => {
  //   return {
  //     tabBarOnPress({navigation,defaultHandler}){
  //       console.log("ASDASDASDASD")
  //       defaultHandler()
  //     }
  //   }
  // }
  render() {
    return (
      <DeckList navigation={this.props.navigation}></DeckList>
    );
  }


}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'stretch',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  }
});


const mapStateToProps = (state) => {
  const { decks } = state
  return { decks }
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    addDeck,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(DeckListScreen);