import React, {Component}           from 'react';
import {View}                       from 'react-native';
import TextButton                   from '../ui-kit/TextButton';
import {connect}                    from "react-redux";
import {addCard}                    from "../actions";
import {addCardToDeck}              from '../utils/api';

class AddCard extends Component {
    state = {
        question: '',
        answer: ''
    };

    addCard = () => {
        const {dispatch} = this.props;
        const {question, answer} = this.state;

        if (question === '' || answer === '') {
            console.warn("EmptyData");
            return;
        }

        const card = {
            question,
            answer
        };

        dispatch(addCard(title, card));

        addCardToDeck({title, card});
    };

    render() {
        return (
            <View>
                <TextButton onPress={this.addCard}>Add Card</TextButton>
            </View>
        )
    }
}

export default connect()(AddCard);
