import React, {Component}           from 'react';
import {View, Text}                 from 'react-native';
import {connect}                    from "react-redux";
import {handleAddCard}              from "../actions";
import Field                        from "../ui-kit/Field";
import Form                         from "../ui-kit/Form";
import Button                       from "../ui-kit/Button";
import {CommonActions}              from "@react-navigation/native";

class AddCard extends Component {
    state = {
        question: '',
        answer: ''
    };

    goBack = () => {
        this.props.navigation.dispatch(CommonActions.goBack())
    };

    addCard = () => {
        const {dispatch, deckId} = this.props;
        const {question, answer} = this.state;

        if (question === '' || answer === '') {
            console.warn("EmptyData");
            return;
        }

        const card = {
            question,
            answer
        };

        dispatch(handleAddCard(deckId, card));

        this.goBack();
    };

    changeQuestion = (question) => {
        this.setState(() => ({
            question
        }));
    };

    changeAnswer = (answer) => {
        this.setState(() => ({
            answer
        }));
    };

    render() {
        const {question, answer} = this.state;

        return (
            <Form>
                <View>
                    <Field
                        value={question}
                        placeholder="Question"
                        onChangeText={this.changeQuestion}
                    />
                    <Field
                        value={answer}
                        placeholder="Answer"
                        onChangeText={this.changeAnswer}
                    />
                </View>
                <Button onPress={this.addCard} disabled={!question.trim() || !answer.trim()}>
                    Submit
                </Button>
            </Form>
        )
    }
}

const mapStateToProps = (state, {route}) => {
    const {deckId} = route.params;

    return {
        deckId
    }
};

export default connect(mapStateToProps)(AddCard);
