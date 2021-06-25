import React                                    from 'react';
import {StyleSheet, TextInput}                  from 'react-native';
import {lightBlue, white}                       from "../utils/colors";

const Field = ({value, onChangeText, placeholder}) => (
    <TextInput
        style={[styles.field]}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
    />
);

const styles = StyleSheet.create({
    field: {
        borderWidth: 1,
        padding: 16,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 4,
        fontSize: 16,
        borderColor: lightBlue,
        marginBottom: 24,
        backgroundColor: white
    },
});

export default Field;
