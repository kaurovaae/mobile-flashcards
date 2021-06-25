import React, {Component}                   from 'react';
import {Text, StyleSheet, View}             from 'react-native';
import {connect}                            from "react-redux";
import {handleAddDeck}                      from "../actions";
import Button                               from "../ui-kit/Button";
import Field                                from "../ui-kit/Field";
import Form                                 from "../ui-kit/Form";
import {red}                                from "../utils/colors";

class AddDeck extends Component {
    state = {
        title: '',
        message: ''
    };

    toHome = () => {
        this.props.navigation.navigate("Decks");
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

        dispatch(handleAddDeck(title));

        this.setState(() => ({
            title: '',
            message: ''
        }));

        this.toHome();
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
            <Form style={{flex: 1}}>
                <View>
                    <Text style={styles.info}>
                        Please, enter the title of your new deck
                    </Text>
                    <Field
                        value={title}
                        placeholder="Deck title"
                        onChangeText={this.onChangeText}
                    />
                </View>
                <View>
                    <Button disabled={!title.trim()} onPress={this.handleAddDeck}>
                        Add Deck
                    </Button>
                    {!!message && <Text style={styles.message}>{message}</Text>}
                </View>
            </Form>
        )
    }
}

const styles = StyleSheet.create({
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
