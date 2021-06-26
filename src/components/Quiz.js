import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import TextButton from "../ui-kit/TextButton";
import Button from "../ui-kit/Button";
import Form from "../ui-kit/Form";
import {lightBlue, white} from "../utils/colors";

class Quiz extends Component {
    state = {
        showAnswer: false,
        step: 1,
        score: 0
    };

    toggle = () => {
        this.setState(prevState => ({
            ...prevState,
            showAnswer: !prevState.showAnswer
        }))
    };

    count = (isCorrect) => {
        this.setState(prevState => ({
            ...prevState,
            showAnswer: false,
            step: prevState.step + 1,
            score: isCorrect ? prevState.score + 1 : prevState.score
        }))
    };

    restart = () => {
        this.setState(() => ({
            showAnswer: false,
            step: 1,
            score: 0
        }))
    };

    toHome = () => {
        const {deckId} = this.props;
        this.props.navigation.navigate("Deck", {deckId});
    };

    render() {
        const {questions} = this.props;
        const {showAnswer, step, score} = this.state;

        if (!questions.length) {
            return (
                <Form style={{justifyContent: "center"}}>
                    <Text style={styles.text}>
                        Sorry, you cannot take a quiz because there are no cards in the deck.
                    </Text>
                    <Text style={styles.text}>
                        Add new cards and try again.
                    </Text>
                </Form>
            )
        }

        const count = questions.length;

        if (step > count) {
            return (
                <Form>
                    <View style={{flex: 2, justifyContent: "center"}}>
                        <Text style={styles.text}>
                            Your score is:
                        </Text>
                        <Text style={[styles.text, {fontSize: 40, margin: 20}]}>
                            {score} ({Math.round(score / count * 100)}%)
                        </Text>
                    </View>
                    <View style={{flex: 2}}>
                        <Button style={{marginBottom: 20, backgroundColor: white}} onPress={this.restart}>
                            <Text style={{color: lightBlue}}>
                                Restart quiz
                            </Text>
                        </Button>
                        <Button onPress={this.toHome}>
                            Back to deck
                        </Button>
                    </View>
                </Form>
            )
        }

        const active = questions[step - 1];
        const {answer, question} = active;

        const content = showAnswer ? answer : question;
        const subtitle = showAnswer ? "Show question" : "Show answer";

        return (
            <Form>
                <Text style={{flex: 1}}>{step} / {count}</Text>
                <View style={styles.question}>
                    <Text style={styles.text}>{content}</Text>
                    <TextButton style={styles.toggle} onPress={this.toggle}>
                        {subtitle}
                    </TextButton>
                </View>
                <View style={{flex: 2}}>
                    <Button style={{marginBottom: 20}} onPress={() => this.count(true)}>
                        <Text>Correct</Text>
                    </Button>
                    <Button style={{backgroundColor: white}} onPress={() => this.count(false)}>
                        <Text style={{color: lightBlue}}>Incorrect</Text>
                    </Button>
                </View>
            </Form>
        )
    }
}

const styles = StyleSheet.create({
    question: {
        flex: 2,
        alignItems: 'center',
    },
    toggle: {
        fontSize: 18,
        margin: 20
    },
    text: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 20,
    }
});

const mapStateToProps = (state, {route}) => {
    const {deckId} = route.params;
    return {
        deckId,
        questions: state[deckId] ? state[deckId].questions : []
    }
};

export default connect(mapStateToProps)(Quiz);
