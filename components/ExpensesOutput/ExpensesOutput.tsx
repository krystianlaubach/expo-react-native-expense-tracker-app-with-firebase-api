import { StyleSheet, View } from 'react-native';
import { ExpenseType } from '../../redux/expensesSlice';
import ExpensesList from './ExpensesList';
import ExpensesSummary from './ExpensesSummary';

type Props = {
    expenses: Array<ExpenseType>,
    period: string,
};

export default function ExpensesOutput({ expenses, period }: Props): JSX.Element {
    return (
        <View style={ styles.container }>
            <ExpensesSummary expenses={ expenses } period={ period } />
            <ExpensesList expenses={ expenses } />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
});
