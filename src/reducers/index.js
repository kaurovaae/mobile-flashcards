import {
    RECEIVE_DECKS,
    ADD_DECK,
    ADD_QUESTION,
    REMOVE_DECK
}                                           from "../actions";
import {AsyncStorage}                       from "react-native";
import {DECKS_STORAGE_KEY}                  from "../utils/helpers";

function decks (state = null, action) {
    switch(action.type) {
        case RECEIVE_DECKS:
            return {
                ...state,
                ...action.decks
            };
        case ADD_DECK:
            const stateWithAddedDeck = {
                ...state,
                [action.deck.title]: {
                    ...action.deck
                }
            };

            AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(stateWithAddedDeck));

            return stateWithAddedDeck;
        case REMOVE_DECK:
            const stateWithoutDeck = {
                ...state
            };

            stateWithoutDeck[action.deckId] = undefined;
            delete stateWithoutDeck[action.deckId];

            AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(stateWithoutDeck));

            return stateWithoutDeck;
        case ADD_QUESTION:
            const stateWithQuestion = {
                ...state,
                [action.deckId]: {
                    ...state[action.deckId],
                    questions: state[action.deckId].questions.concat([action.card])
                }
            };

            AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(stateWithQuestion));

            return stateWithQuestion;
        default:
            return state;
    }
}

export default decks;
