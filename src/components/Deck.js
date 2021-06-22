import React, {Component}                   from 'react';
import {View, Text, StyleSheet}             from 'react-native';
import TextButton                           from "../ui-kit/TextButton";
import {removeDeckByKey}                    from "../utils/api";
import {removeDeck}                         from "../actions";
import {connect}                            from "react-redux";

class Deck extends Component {
    startQuiz = () => {
        console.log("goToStartQuiz")
    };

    goToAddCard = () => {
        console.log("goToAddCard")
    };

    removeDeck = () => {
        const {title} = this.props;

        dispatch(removeDeck(title));
        removeDeckByKey({key: title});
    };

    render() {
        const {data} = this.props;
        const {title, questions} = data;

        const count = questions.length;

        return (
            <View style={styles.container}>
                <Text>{title}</Text>
                <Text>{count} cards</Text>
                <TextButton onPress={this.goToAddCard}>
                    Add Card
                </TextButton>
                <TextButton onPress={this.startQuiz}>
                    Start Quiz
                </TextButton>
                <TextButton onPress={this.removeDeck}>
                    Remove Deck
                </TextButton>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

const mapStateToProps = (state, {route}) => {
    const {deckId} = route.params;

    return {
        deckId,
        data: state[deckId]
    }
};

function mapDispatchToProps(dispatch, {route, navigation}) {
    return {
        goBack: () => navigation.goBack()
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Deck);
