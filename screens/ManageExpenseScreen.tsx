import {useLayoutEffect, useState} from 'react';
import { Colours } from '../assets/styles/Colours';
import { Alert, ScrollView, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useDispatch } from 'react-redux';
import { addExpense, deleteExpense, updateExpense, ExpenseType, ExpenseData } from '../redux/expensesSlice';
import { storeExpense, updateExpense as sendUpdateRequest, deleteExpense as sendDeleteRequest } from '../services/HttpRequestHandler';
import IconButton from '../components/Buttons/IconButton';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import moment from 'moment/moment';
import LoadingOverlay from '../components/UI/LoadingOverlay';

type Props = {
    route: RouteProp<any>,
    navigation: NativeStackNavigationProp<any>,
};

export default function ManageExpenseScreen({ route, navigation }: Props): JSX.Element {
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
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

    const confirmHandler = async (amount: number, date: string, description: string): Promise<void> => {
        const expenseData: ExpenseData = {
            description: description,
            amount: amount,
            date: moment(date).format('YYYY-MM-DD'),
        };

        setIsProcessing(true);

        if (isEditMode) {
            await sendUpdateRequest(expense.id, expenseData)
                .then((updatedExpenseData: ExpenseData) => {
                    dispatch(updateExpense({
                        id: expense.id,
                        data: updatedExpenseData,
                    }));

                    setIsProcessing(false);
                    navigation.goBack();
                })
                .catch((error: Error) => {
                    Alert.alert('An error occurred!', error.message);
                    setIsProcessing(false);
                });
        }

        if (!isEditMode) {
            await storeExpense(expenseData)
                .then((expenseId: string) => {
                    dispatch(addExpense({
                        id: expenseId,
                        description: description,
                        amount: amount,
                        date: moment(date).format('YYYY-MM-DD'),
                    }));

                    setIsProcessing(false);
                    navigation.goBack();
                })
                .catch((error: Error) => {
                    Alert.alert('An error occurred!', error.message);
                    setIsProcessing(false);
                });
        }
    };

    const deleteHandler = async (): Promise<void> => {
        if (expense) {
            setIsProcessing(true);

            await sendDeleteRequest(expense.id)
                .then(() => {
                    dispatch(deleteExpense({ id: expense.id }));
                    setIsProcessing(false);
                    navigation.goBack();
                })
                .catch((error: Error) => {
                    Alert.alert('An error occurred!', error.message);
                    setIsProcessing(false);
                });
        }
    };

    return (
        isProcessing
            ? <LoadingOverlay />
            : <ScrollView style={ styles.container }>
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
