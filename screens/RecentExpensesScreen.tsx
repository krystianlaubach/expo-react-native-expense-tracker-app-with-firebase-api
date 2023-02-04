import { useSelector } from 'react-redux';
import { ExpenseType } from '../redux/expensesSlice';
import { RootState } from '../redux/store';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import moment from 'moment';

export default function RecentExpensesScreen(): JSX.Element {
    const expenses: Array<ExpenseType> = useSelector((state: RootState) => state.expenses.expenses);

    const recentExpenses: Array<ExpenseType> = expenses.filter(
        (expense: ExpenseType) => {
            const sevenDaysAgo = moment().subtract(7, 'days');
            const today = moment();
            const expenseDate = moment(expense.date);

            return expenseDate.isAfter(sevenDaysAgo) && expenseDate.isSameOrBefore(today);
        }
    );

    const sortedExpenses = recentExpenses.sort(
        (expense1: ExpenseType, expense2: ExpenseType) => moment(expense2.date).diff(moment(expense1.date))
    );

    return (
        <ExpensesOutput expenses={ sortedExpenses } period='Last 7 Days' />
    );
}
