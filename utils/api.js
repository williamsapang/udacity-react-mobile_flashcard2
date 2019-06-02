import { AsyncStorage } from 'react-native'

const STORAGE_KEY = "MobileFlashCards:MyDecks"
const STORAGE_KEY2 = "MobileFlashCards"
export function submitEntry ({ entry, key }) {
  return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
    [key]: entry
  }))
}

export function submitCard ({question, answer},deckid,refreshDecks) {
  return AsyncStorage.getItem(STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      data[deckid].questions.push({
        question: question,
        answer: answer
      })
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data))
      refreshDecks(data)
    })
}

export function submitDeck (newdata, callback) {
  return AsyncStorage.getItem(STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      const temp = {
        ...data,
        ...newdata
      }
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(temp))
      callback()
    })
}

export function initiateDeck (deck) {
  AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(deck))
}

export function clearAllDeck () {
  return AsyncStorage.clear()
}

export function removeEntry (key, callback) {
  return AsyncStorage.getItem(STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      data[key] = undefined
      delete data[key]
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data))
      callback()
    })
}

export function getEntry () {
    AsyncStorage.getAllKeys((e, keys)=> {
        console.log(keys.length)
    })
}

export function getItem (func) {
    AsyncStorage.getItem(STORAGE_KEY)
        .then((results) => {
            const data = JSON.parse(results)
            return func(data)
        })
  }