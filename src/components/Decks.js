import React, {Component}                   from 'react';
import {
    View, Text, TouchableOpacity,
    FlatList, StyleSheet, Platform
}                                           from 'react-native';
import {connect}                            from "react-redux";
import {getDecks}                           from "../utils/api";
import {receiveDecks}                       from "../actions";
import {white}                              from "../utils/colors";

class Decks extends Component {
    state = {
        ready: false
    };

    componentDidMount() {
        const {dispatch} = this.props;

        getDecks()
            .then(decks => dispatch(receiveDecks(decks)))
            .then(() => this.setState({
                ready: true
            }));
    }

    renderDeck = ({item}) => {
        return (
            <View style={styles.item}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("Deck", {deckId: item})}>
                    <Text>{item}</Text>
                </TouchableOpacity>
            </View>
        )
    };

    render() {
        const {deckIds} = this.props;

        return (
            <View style={styles.container}>
                <FlatList
                    data={deckIds}
                    renderItem={this.renderDeck}
                    keyExtractor={(item, index) => `${item}_${index}`}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    noDataText: {
        fontSize: 20,
        paddingTop: 20,
        paddingBottom: 20
    },
    item: {
        backgroundColor: white,
        borderRadius: Platform.OS === "ios" ? 16 : 2,
        padding: 20,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 17,
        justifyContent: 'center',
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0,0,0,0.24)',
        shadowOffset: {
            width: 0,
            height: 3
        },
        flex: 1
    }
});

const mapStateToProps = (decks) => {
    return {
        deckIds: Object.keys(decks)
    }
};

export default connect(mapStateToProps)(Decks);
