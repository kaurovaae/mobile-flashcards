import React, {Component}                   from 'react';
import {
    View, Text, TouchableOpacity,
    FlatList, StyleSheet, Platform
}                                           from 'react-native';
import {connect}                            from "react-redux";
import {handleReceiveDecks}                 from "../actions";
import {white}                              from "../utils/colors";

class Decks extends Component {
    state = {
        ready: false
    };

    componentDidMount() {
        this.props.dispatch(handleReceiveDecks());
        this.setState({
            ready: true
        });
    }

    renderDeck = ({item}) => {
        const {decks} = this.props;
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate("Deck", {deckId: item})} style={styles.item}>
                <Text style={{fontSize: 18}}>{item}</Text>
                <Text style={{fontSize: 16}}>{decks[item].questions.length} cards</Text>
            </TouchableOpacity>
        )
    };

    render() {
        const {deckIds} = this.props;

        return (
            <View style={styles.container}>
                {!!deckIds.length ? (
                    <FlatList
                        data={deckIds}
                        renderItem={this.renderDeck}
                        keyExtractor={(item, index) => `${item}_${index}`}
                    />
                ) : (
                    <View style={styles.noData}>
                        <Text style={styles.noDataText}>
                            There are no decks yet. Add new deck and try again.
                        </Text>
                    </View>
                )}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        paddingBottom: 40
    },
    noDataText: {
        fontSize: 20,
        textAlign: 'center',
        paddingLeft: 20,
        paddingRight: 20,
    },
    noData: {
        flex: 1,
        justifyContent: 'center'
    },
    item: {
        backgroundColor: white,
        borderRadius: Platform.OS === "ios" ? 10 : 2,
        padding: 20,
        marginBottom: 16,
        marginLeft: 20,
        marginRight: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
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
        decks,
        deckIds: decks ? Object.keys(decks) : []
    }
};

export default connect(mapStateToProps)(Decks);
