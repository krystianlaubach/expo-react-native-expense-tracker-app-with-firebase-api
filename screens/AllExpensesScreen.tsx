import { useSelector } from 'react-redux';
import { ExpenseType } from '../redux/expensesSlice';
import { RootState } from '../redux/store';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import moment from 'moment';

export default function AllExpenseScreen(): JSX.Element {
    const expenses: Array<ExpenseType> = useSelector((state: RootState) => state.expenses.expenses);

    const sortedExpenses = [...expenses].sort(
        (expense1: ExpenseType, expense2: ExpenseType) => moment(expense2.date).diff(moment(expense1.date))
    );

    return (
        <ExpensesOutput expenses={ sortedExpenses } period='All' />
    );
}
