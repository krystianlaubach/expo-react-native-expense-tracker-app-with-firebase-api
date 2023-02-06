import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setExpenses, ExpenseType } from '../redux/expensesSlice';
import { RootState } from '../redux/store';
import { fetchExpenses } from '../services/HttpRequestHandler';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import moment from 'moment';
import LoadingOverlay from '../components/UI/LoadingOverlay';

export default function AllExpenseScreen(): JSX.Element {
    const [isFetching, setIsFetching] = useState<boolean>(true);
    const expenses: Array<ExpenseType> = useSelector((state: RootState) => state.expenses.expenses);
    const dispatch = useDispatch();

    useEffect(() => {
        const getExpenses = async (): Promise<Array<ExpenseType>> => {
            return await fetchExpenses();
        };

        setIsFetching(true);

        getExpenses()
            .then((expenses: Array<ExpenseType>) => {
                dispatch(setExpenses(expenses));
                setIsFetching(false);
            })
            .catch((error: Error) => {
                Alert.alert('An error occurred!', error.message);
                setIsFetching(false);
            });
    }, []);

    const sortedExpenses = [...expenses].sort(
        (expense1: ExpenseType, expense2: ExpenseType) => moment(expense2.date).diff(moment(expense1.date))
    );

    return (
        isFetching
            ? <LoadingOverlay />
            : <ExpensesOutput expenses={ sortedExpenses } period='All' />
    );
}
