import React                                    from 'react';
import {TouchableOpacity, StyleSheet, View}     from 'react-native';
import {lightBlue}                              from "../utils/colors";

function Button({children, onPress, disabled, style = {}}) {

    if (disabled) {
        return (
            <View style={[styles.btn, styles.disabled, style]}>
                {children}
            </View>
        )
    }

    return (
        <TouchableOpacity
            style={[styles.btn, style]}
            onPress={onPress}
        >
            {children}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btn: {
        backgroundColor: lightBlue,
        borderColor: lightBlue,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        paddingLeft: 25,
        paddingRight: 25
    },
    disabled: {
        opacity: 0.4
    }
});

export default Button;
