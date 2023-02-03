import { useSelector } from 'react-redux';
import { ExpenseType } from '../redux/expensesSlice';
import { RootState } from '../redux/store';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';

type Props = {

};

export default function RecentExpensesScreen({}: Props): JSX.Element {
    const expenses: Array<ExpenseType> = useSelector((state: RootState) => state.expenses.expenses);

    return (
        <ExpensesOutput expenses={ expenses } period='Last 7 Days' />
    );
}
