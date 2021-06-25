import {AsyncStorage} from "react-native";
import {DECKS_STORAGE_KEY} from "../utils/_flashcards";
import {initData} from '../utils/helpers';

export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const ADD_DECK = 'ADD_DECK';
export const REMOVE_DECK = 'REMOVE_DECK';
export const ADD_QUESTION = 'ADD_QUESTION';

function receiveDecks(decks) {
    return {
        type: RECEIVE_DECKS,
        decks
    }
}

export function handleReceiveDecks() {
    return (dispatch) => {
        AsyncStorage.getItem(DECKS_STORAGE_KEY)
            .then(results => {
                console.log("results", results)
                let decks;
                if (!results) {
                    decks = initData;
                    AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks));
                } else {
                    decks = JSON.parse(results);
                }
                dispatch(receiveDecks(decks));
            });
    }
}

function addDeck(deck) {
    return {
        type: ADD_DECK,
        deck
    }
}

export function handleAddDeck(title) {
    return (dispatch) => {
        const deck = {
            title,
            questions: []
        };
        dispatch(addDeck(deck));
    }
}

function removeDeck(deckId) {
    return {
        type: REMOVE_DECK,
        deckId
    }
}

export function handleRemoveDeck(deckId) {
    return (dispatch) => {
        dispatch(removeDeck(deckId));
    }
}

function addCard(deckId, card) {
    return {
        type: ADD_QUESTION,
        deckId,
        card
    }
}

export function handleAddCard(deckId, card) {
    return (dispatch) => {
        dispatch(addCard(deckId, card))
    }
}
