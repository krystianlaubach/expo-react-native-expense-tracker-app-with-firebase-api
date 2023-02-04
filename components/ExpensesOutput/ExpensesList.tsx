import { FlatList, ListRenderItemInfo } from 'react-native';
import { ExpenseType } from '../../redux/expensesSlice';
import ExpenseItem from './ExpenseItem';

type Props = {
    expenses: Array<ExpenseType>,
};

export default function ExpensesList({ expenses }: Props): JSX.Element {
    const keyExtractor = (expense: ExpenseType): string => {
        return expense.id;
    };

    const renderItem = (itemData: ListRenderItemInfo<ExpenseType>): JSX.Element => {
        const expense: ExpenseType = itemData.item;

        return (
            <ExpenseItem expense={ expense } />
        );
    };

    return (
        <FlatList data={ expenses } keyExtractor={ keyExtractor } renderItem={ renderItem } />
    );
}
