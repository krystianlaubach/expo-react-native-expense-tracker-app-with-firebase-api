import { useLayoutEffect } from 'react';
import { Colours } from '../assets/styles/Colours';
import { ScrollView, StyleSheet, View } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { v4 as uuid } from 'uuid';
import { useDispatch } from 'react-redux';
import { addExpense, deleteExpense, ExpenseType, updateExpense } from '../redux/expensesSlice';
import IconButton from '../components/Buttons/IconButton';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import moment from 'moment/moment';

type Props = {
    route: RouteProp<any>,
    navigation: NativeStackNavigationProp<any>,
};

export default function ManageExpenseScreen({ route, navigation }: Props): JSX.Element {
    const expense: ExpenseType|undefined = route.params?.expense;
    const isEditMode = !!expense;
    const dispatch = useDispatch();

    useLayoutEffect((): void => {
        navigation.setOptions({
            title: isEditMode ? 'Edit Expense' : 'Add Expense',
        });
    }, [navigation, isEditMode]);

    const cancelHandler = (): void => {
        navigation.goBack();
    };

    const confirmHandler = (amount: number, date: string, description: string): void => {
        if (isEditMode) {
            dispatch(updateExpense({
                id: expense.id,
                data: {
                    description: description,
                    amount: amount,
                    date: moment(date).format('YYYY-MM-DD'),
                },
            }));
        }

        if (!isEditMode) {
            dispatch(addExpense({
                id: uuid(),
                description: description,
                amount: amount,
                date: moment(date).format('YYYY-MM-DD'),
            }));
        }

        navigation.goBack();
    };

    const deleteHandler = (): void => {
        if (expense) {
            dispatch(deleteExpense({ id: expense.id }));
        }

        navigation.goBack();
    };

    return (
        <ScrollView style={ styles.container }>
            <ExpenseForm expense={ expense } onCancel={ cancelHandler } onSubmit={ confirmHandler } />
            { isEditMode && <IconButton
                icon='trash-can'
                size={28}
                color={ Colours.white }
                style={ styles.deleteButton }
                onPress={ deleteHandler }
            /> }
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
    },
    deleteButton: {
        backgroundColor: Colours.red100,
        borderRadius: 8,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 6
    },
});
