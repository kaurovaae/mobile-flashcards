import {AsyncStorage}           from 'react-native';
import {
    DECKS_STORAGE_KEY
}                               from "./_flashcards";

export function getDecks() {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then(res => JSON.parse(res))
}

export function getDeck(id) {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then(res => JSON.parse(res)[id])
}

export function saveDeckTitle(title, deck) {
    return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
        [title]: deck
    }));
}

export function addCardToDeck(title, card) {
    return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
        [title]: {
            title,
            questions: [card]
        }
    }));
}

export function removeDeckByKey({key}) {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then(results => {
            const data = JSON.parse(results);
            data[key] = undefined;
            delete data[key];
            AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
        });
}
