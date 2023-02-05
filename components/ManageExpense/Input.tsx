import { Colours } from '../../assets/styles/Colours';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';

type Props = {
    label: string,
    textInputConfig?: TextInputProps,
    isValid: boolean,
};

export default function Input({ label, textInputConfig, isValid }: Props): JSX.Element {
    const isMultiline: boolean|undefined = textInputConfig && textInputConfig.multiline;

    return (
        <View style={ styles.container }>
            <Text style={ styles.label }>{ label }</Text>
            <TextInput style={[styles.input, isMultiline && styles.inputMultiline, !isValid && styles.invalid]} { ...textInputConfig } />
            { !isValid && <Text style={styles.error}>Please enter valid value!</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 8,
    },
    label: {
        fontSize: 12,
        color: Colours.blue400,
        marginBottom: 4,
    },
    input: {
        borderWidth: 2,
        borderColor: Colours.blue400,
        borderRadius: 8,
        padding: 8,
        fontSize: 16,
        color: Colours.blue800
    },
    inputMultiline: {
        minHeight: 100,
        textAlignVertical: 'top',
    },
    invalid: {
        borderColor: Colours.red100,
    },
    error: {
        fontSize: 12,
        color: Colours.red100,
        marginTop: 4,
    },
});
