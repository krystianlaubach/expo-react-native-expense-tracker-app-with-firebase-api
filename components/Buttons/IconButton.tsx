import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type Props = {
    icon: 'view-grid-plus'|'trash-can',
    size: number,
    color: string,
    onPress: () => void,
    style?: ViewStyle,
};

export default function IconButton({ icon, size, color, onPress, style }: Props): JSX.Element {
    return (
        <Pressable style={({pressed}) => pressed ? [style, styles.pressed] : style} onPress={ onPress }>
            <MaterialCommunityIcons name={ icon } size={ size } color={ color } />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.7,
    },
});
