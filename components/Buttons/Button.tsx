import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Colours } from '../../assets/styles/Colours';

type Props = {
    children: string,
    onPress: () => void,
    style?: ViewStyle|Array<ViewStyle>,
    flat?: boolean
};

export default function Button({ children, onPress, style, flat = false }: Props): JSX.Element {
    return (
        <View style={ style }>
            <Pressable style={({pressed}) => [styles.button, flat && styles.flat, pressed && styles.pressed]} onPress={ onPress }>
                <View>
                    <Text style={[ styles.buttonText, flat && styles.flatText ]}>{ children }</Text>
                </View>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: Colours.blue400,
        borderRadius: 8,
        padding: 9,
    },
    flat: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: Colours.blue400,
        padding: 7,
    },
    buttonText: {
        fontSize: 18,
        textTransform: 'uppercase',
        color: Colours.white,
    },
    flatText: {
        color: Colours.blue400,
    },
    pressed: {
        opacity: 0.7,
    },
});
