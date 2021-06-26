import React                                    from 'react';
import {
    TouchableOpacity, StyleSheet,
    View, Text
}                                               from 'react-native';
import {lightBlue, white}                       from "../utils/colors";

function Button({children, onPress, disabled, style = {}}) {

    const text = <Text style={styles.text}>{children}</Text>;

    if (disabled) {
        return (
            <View style={[styles.btn, styles.disabled, style]}>
                {text}
            </View>
        )
    }

    return (
        <TouchableOpacity
            style={[styles.btn, style]}
            onPress={onPress}
        >
            {text}
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
    },
    text: {
        color: white,
        textAlign: 'center',
        fontSize: 18
    }
});

export default Button;
