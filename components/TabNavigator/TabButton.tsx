import { Colours } from '../../assets/styles/Colours';
import { StyleSheet, TouchableOpacity } from 'react-native'
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';

export default function TabButton(props: BottomTabBarButtonProps): JSX.Element {
    return (
        <TouchableOpacity {...props} style={ props.accessibilityState?.selected ? [props.style, styles.active] : props.style } />
    );
}

const styles = StyleSheet.create({
    active: {
        borderTopWidth: 2,
        borderTopColor: Colours.blue800,
    }
});
