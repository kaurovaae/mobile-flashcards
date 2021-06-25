import React                                    from 'react';
import {StyleSheet, KeyboardAvoidingView}       from 'react-native';

const Form = ({children, style = {}, ...props}) => (
    <KeyboardAvoidingView behavior='padding' style={[styles.form, style]} {...props}>
        {children}
    </KeyboardAvoidingView>
);

const styles = StyleSheet.create({
    form: {
        flex: 1,
        padding: 40
    },
});

export default Form;
