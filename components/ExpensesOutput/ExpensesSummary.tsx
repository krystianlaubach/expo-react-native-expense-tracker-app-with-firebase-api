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
        <View>
            <Text>{ period }</Text>
            <Text>£{ expensesSum.toFixed(2) }</Text>
        </View>
    );
}

const styles = StyleSheet.create({

});
