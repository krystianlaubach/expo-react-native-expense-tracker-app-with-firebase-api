import { Colours } from '../../assets/styles/Colours';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ExpenseType } from '../../redux/expensesSlice';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

type Props = {
    expense: ExpenseType
};

export default function ExpenseItem({ expense }: Props): JSX.Element {
    const navigation = useNavigation<any>();

    const expensePressHandler = () => {
        navigation.navigate('ManageExpense', {
            expense: expense,
        });
    };

    return (
        <Pressable style={ ({pressed}) => pressed ? [styles.expenseItem, styles.pressed] : styles.expenseItem } onPress={ expensePressHandler }>
            <View>
                <Text style={[styles.textBase, styles.description]}>{ expense.description }</Text>
                <Text style={ styles.textBase }>{ moment(expense.date).format('ddd, D MMMM YYYY') }</Text>
            </View>
            <View style={ styles.amountContainer }>
                <Text style={ styles.amountText }>£{ expense.amount }</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    expenseItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 12,
        margin: 8,
        backgroundColor: Colours.blue400,
        borderRadius: 8,
        elevation: 3,
        shadowColor: Colours.black,
        shadowOffset: { width: 1, height: 1 },
        shadowRadius: 4,
        shadowOpacity: 0.6,
    },
    pressed: {
        opacity: 0.7,
    },
    textBase: {
        color: Colours.white,
    },
    description: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    amountContainer: {
        width: 80,
        paddingVertical: 12,
        paddingHorizontal: 4,
        backgroundColor: Colours.white,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
    },
    amountText: {
        color: Colours.blue800,
        fontWeight: 'bold',
    },
});
