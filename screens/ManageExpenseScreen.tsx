import { StyleSheet, Text, View } from 'react-native';

type Props = {

};

export default function ManageExpenseScreen({}: Props): JSX.Element {
    return (
        <View style={ styles.container }>
            <Text>Manage Expenses Screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
