import { useLayoutEffect } from 'react';
import { Colours } from '../assets/styles/Colours';
import { StyleSheet, Text, View } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useDispatch } from 'react-redux';
import { addExpense, deleteExpense, updateExpense, ExpenseType } from '../redux/expensesSlice';
import { v4 as uuid } from 'uuid';
import moment from 'moment';
import IconButton from '../components/Buttons/IconButton';
import Button from '../components/Buttons/Button';

type Props = {
    route: RouteProp<any>,
    navigation: NativeStackNavigationProp<any>,
};

export default function ManageExpenseScreen({ route, navigation }: Props): JSX.Element {
    const expense: ExpenseType|undefined = route.params?.expense;
    const isEditMode = !!expense;
    const dispatch = useDispatch();

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditMode ? 'Edit Expense' : 'Add Expense',
        });
    }, [navigation, isEditMode]);

    const cancelHandler = () => {
        navigation.goBack();
    };

    const confirmHandler = () => {
        if (isEditMode) {
            dispatch(updateExpense({
                id: expense.id,
                data: {
                    description: 'A pair of shoes',
                    amount: 35.99,
                    date: moment('2022-12-19').format('YYYY-MM-DD'),
                },
            }));
        }

        if (!isEditMode) {
            dispatch(addExpense({
                id: uuid(),
                description: 'Tequila',
                amount: 18.99,
                date: moment('2023-03-01').format('YYYY-MM-DD'),
            }));
        }

        navigation.goBack();
    };

    const deleteHandler = () => {
        if (expense) {
            dispatch(deleteExpense({ id: expense.id }));
        }

        navigation.goBack();
    };

    return (
        <View style={ styles.container }>
            { isEditMode && <View><Text>{ expense.id }</Text><Text>{ expense.description }</Text></View>}
            <View style={ styles.buttonsContainer }>
                <Button style={[ styles.button, {marginRight: 8} ]} flat={ true } onPress={ cancelHandler }>Cancel</Button>
                <Button style={ styles.button } flat={false} onPress={ confirmHandler }>Confirm</Button>
            </View>
            { isEditMode && <IconButton
                icon='trash-can'
                size={28}
                color={ Colours.white }
                style={ styles.deleteButton }
                onPress={ deleteHandler }
            /> }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 8,
    },
    button: {
        flex: 1,
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
