import React, {Component}                   from 'react';
import {View, Text, StyleSheet}             from 'react-native';
import TextButton                           from "../ui-kit/TextButton";
import {removeDeckByKey}                    from "../utils/api";
import {removeDeck}                         from "../actions";
import {connect}                            from "react-redux";
import Button                               from "../ui-kit/Button";
import {gray, lightBlue, red, white} from "../utils/colors";

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
                <View style={{alignItems: 'center'}}>
                    <Text style={{fontSize: 32}}>{title}</Text>
                    <Text style={{fontSize: 18, marginTop: 10, color: gray}}>{count} cards</Text>
                </View>
                <View>
                    <Button style={[styles.btn, styles.light]} onPress={this.goToAddCard}>
                        <Text style={[styles.text, styles.lightText]}>Add Card</Text>
                    </Button>
                    <Button style={styles.btn} onPress={this.startQuiz}>
                        <Text style={styles.text}> Start Quiz</Text>
                    </Button>
                    <TextButton style={styles.textBtn} onPress={this.removeDeck}>
                        Remove Deck
                    </TextButton>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 40,
        justifyContent: 'space-around',
    },
    btn: {
        marginBottom: 24
    },
    light: {
        backgroundColor: white,
    },
    text: {
        color: white,
        textAlign: 'center',
        fontSize: 18
    },
    lightText: {
        color: lightBlue
    },
    textBtn: {
        marginTop: 10,
        fontSize: 18,
        color: red
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
