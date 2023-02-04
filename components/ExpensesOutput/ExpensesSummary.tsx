import { Colours } from '../../assets/styles/Colours';
import { StyleSheet, Text, View } from 'react-native';
import { ExpenseType } from '../../redux/expensesSlice';

type Props = {
    expenses: Array<ExpenseType>,
    period: string,
};

export default function ExpensesSummary({ expenses, period }: Props): JSX.Element {
    const expensesSum = expenses.reduce((sum, expense) => {
        return sum + expense.amount;
    }, 0);

    return (
        <View style={ styles.container }>
            <Text style={ styles.period }>{ period }</Text>
            <View style={ styles.sumContainer }>
                <Text style={ styles.sum }>£{ expensesSum.toFixed(2) }</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 12,
        margin: 8,
        borderRadius: 8,
        backgroundColor: Colours.blue800,
        elevation: 3,
        shadowColor: Colours.black,
        shadowOffset: { width: 1, height: 1 },
        shadowRadius: 4,
        shadowOpacity: 0.6,
    },
    period: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colours.blue100,
    },
    sumContainer: {
        width: 80,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 4,
        backgroundColor: Colours.blue100,
        borderRadius: 4,
    },
    sum: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colours.blue800,
    },
});
