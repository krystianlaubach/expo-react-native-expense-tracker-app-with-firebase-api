import { useSelector } from 'react-redux';
import { ExpenseType } from '../redux/expensesSlice';
import { RootState } from '../redux/store';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';

type Props = {

};

export default function AllExpenseScreen({}: Props): JSX.Element {
    const expenses: Array<ExpenseType> = useSelector((state: RootState) => state.expenses.expenses);

    return (
        <ExpensesOutput expenses={ expenses } period='All' />
    );
}
