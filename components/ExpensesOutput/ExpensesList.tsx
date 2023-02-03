import { FlatList, ListRenderItemInfo, StyleSheet, Text } from 'react-native';
import { ExpenseType } from '../../redux/expensesSlice';

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
            <Text>{ expense.description }</Text>
        );
    };

    return (
        <FlatList data={ expenses } keyExtractor={ keyExtractor } renderItem={ renderItem } />
    );
}

const styles = StyleSheet.create({

});
