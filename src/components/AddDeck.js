import React, {Component}                   from 'react';
import {
    KeyboardAvoidingView, Text,
    StyleSheet, TextInput
}                                           from 'react-native';
import {connect}                            from "react-redux";
import {addDeck}                            from "../actions";
import {saveDeckTitle}                      from '../utils/api';
import Button                               from "../ui-kit/Button";
import {purple, red, white}                 from "../utils/colors";
import {CommonActions}                      from '@react-navigation/native';

class AddDeck extends Component {
    state = {
        title: '',
        message: ''
    };

    toHome = () => {
        this.props.navigation.dispatch(CommonActions.goBack({
            key: 'Home'
        }))
    };

    handleAddDeck = () => {
        const {dispatch, existIds} = this.props;
        const {title} = this.state;

        if (!title) {
            return;
        }

        if (existIds.includes(title)) {
            this.setState(() => ({
                message: "The deck with this name already exists."
            }));
            return;
        }

        const deck = {
            title,
            questions: []
        };

        dispatch(addDeck({
            [title]: deck
        }));

        this.setState(() => ({
            title: '',
            message: ''
        }));

        this.toHome();

        saveDeckTitle(title, deck);
    };

    onChangeText = (text) => {
        this.setState(() => ({
            title: text,
            message: ''
        }));
    };

    render() {
        const {title, message} = this.state;

        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <Text style={styles.info}>Enter deck title</Text>
                <TextInput
                    style={[styles.field]}
                    onChangeText={this.onChangeText}
                    value={title}
                    placeholder="Deck title"
                />
                <Button style={{width: 200}} disabled={!title.trim()} onPress={this.handleAddDeck}>
                    <Text style={styles.text}>Add Deck</Text>
                </Button>
                {!!message && <Text style={styles.message}>{message}</Text>}
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 40,
    },
    text: {
        color: white,
        textAlign: 'center',
        fontSize: 18
    },
    field: {
        width: 200,
        borderWidth: 1,
        padding: 16,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 4,
        fontSize: 16,
        borderColor: purple,
        marginBottom: 24
    },
    message: {
        fontSize: 16,
        marginTop: 24,
        color: red,
        textAlign: 'center'
    },
    info: {
        fontSize: 32,
        textAlign: 'center',
        marginBottom: 24
    }
});

const mapStateToProps = (decks) => {
    return {
        existIds: decks ? Object.keys(decks) : []
    }
};

export default connect(mapStateToProps)(AddDeck);
