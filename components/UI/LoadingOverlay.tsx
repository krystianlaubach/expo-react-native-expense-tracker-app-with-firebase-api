import { ActivityIndicator, StyleSheet, View } from 'react-native';

export default function LoadingOverlay(): JSX.Element {
    return (
        <View style={ styles.container }>
            <ActivityIndicator size='large' />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
});
