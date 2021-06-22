import {RECEIVE_DECKS, ADD_DECK, ADD_QUESTION, REMOVE_DECK} from "../actions";

function decks (state = {}, action) {
    switch(action.type) {
        case RECEIVE_DECKS:
            return {
                ...state,
                ...action.decks
            };
        case ADD_DECK:
            return {
                ...state,
                ...action.deck
            };
        case REMOVE_DECK:
            const newState = {...state};

            newState[action.title] = undefined;
            delete newState[action.title];

            return {
                ...newState
            };
        case ADD_QUESTION:
            return {
                ...state,
                [action.title]: {
                    ...state[action.title],
                    questions: state[action.title].questions.concat([action.card])
                }
            };
        default:
            return state;
    }
}

export default decks;
