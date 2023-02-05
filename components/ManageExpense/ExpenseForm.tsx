import { useState } from 'react';
import {Alert, KeyboardAvoidingView, NativeSyntheticEvent, StyleSheet, TextInputFocusEventData, View} from 'react-native';
import { ExpenseType } from '../../redux/expensesSlice';
import Input from './Input';
import Button from '../Buttons/Button';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';


type Props = {
    expense?: ExpenseType,
    onCancel: () => void,
    onSubmit: (amount: number, date: string, description: string) => void,
};

export default function ExpenseForm({ expense, onCancel, onSubmit }: Props): JSX.Element {
    const isEditMode = !!expense;

    const [amountValue, setAmountValue] = useState<string>(isEditMode ? expense.amount.toString() : '');
    const [isAmountValid, setIsAmountValid] = useState<boolean>(true);
    const [dateValue, setDateValue] = useState<string>(isEditMode ? expense.date : '');
    const [isDateValid, setIsDateValid] = useState<boolean>(true);
    const [descriptionValue, setDescriptionValue] = useState<string>(isEditMode ? expense.description : '');
    const [isDescriptionValid, setIsDescriptionValid] = useState<boolean>(true);

    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [datePickerVisible, setDatePickerVisible] = useState<boolean>(false);

    const validateAmount = (): boolean => {
        const isValid = amountValue.trim().length > 0 && !isNaN(parseFloat(amountValue)) && parseFloat(amountValue) > 0;

        setIsAmountValid(isValid);

        return isValid;
    };

    const validateDate = (): boolean => {
        const isValid = dateValue.trim().length > 0 && moment(dateValue).isValid();

        setIsDateValid(isValid);

        return isValid;
    };

    const validateDescription = (): boolean => {
        const isValid = descriptionValue.trim().length > 0;

        setIsDescriptionValid(isValid);

        return isValid;
    };

    const amountChangeHandler = (enteredAmount: string): void => {
        setAmountValue(enteredAmount);
        validateAmount();
    };

    const showDatePicker = (event: NativeSyntheticEvent<TextInputFocusEventData>): void => {
        event.target.blur();
        setDatePickerVisible(true);
    };

    const hideDatePicker = (): void => {
        setDatePickerVisible(false);
    };

    const dateChangeHandler = (date: Date) => {
        setSelectedDate(date);
        setDateValue(moment(date).format('YYYY-MM-DD'));
        hideDatePicker();
        validateDate();
    };

    const descriptionChangeHandler = (enteredDescription: string): void => {
        setDescriptionValue(enteredDescription);
        validateDescription();
    };

    const submitHandler = () => {
        const isValidAmount: boolean = validateAmount();
        const isValidDate: boolean = validateDate()
        const isValidDescription: boolean = validateDescription();

        if (!isValidAmount || !isValidDate || !isValidDescription) {
            return;
        }

        onSubmit(parseFloat(amountValue), dateValue, descriptionValue);
    };

    return (
        <KeyboardAvoidingView style={ styles.container } behavior='position'>
            <Input label='Amount' isValid={ isAmountValid } textInputConfig={{
                placeholder: 'Enter Amount...',
                keyboardType: 'numeric',
                onChangeText: amountChangeHandler,
                value: amountValue,
                onBlur: validateAmount,
            }} />
            <Input label='Date' isValid={ isDateValid } textInputConfig={{
                placeholder: 'Select Date...',
                value: dateValue,
                showSoftInputOnFocus: false,
                onFocus: showDatePicker,
            }} />
            <Input label='Description' isValid={ isDescriptionValid } textInputConfig={{
                placeholder: 'Enter Description...',
                multiline: true,
                onChangeText: descriptionChangeHandler,
                value: descriptionValue,
                onBlur: validateDescription,
            }} />
            <View style={ styles.buttonsContainer }>
                <Button style={[ styles.button, { marginRight: 8 } ]} flat={ true } onPress={ onCancel }>Cancel</Button>
                <Button style={ styles.button } flat={false} onPress={ submitHandler }>{ isEditMode ? 'Update' : 'Add' }</Button>
            </View>
            <DateTimePickerModal
                date={ selectedDate }
                isVisible={ datePickerVisible }
                mode='date'
                onConfirm={ dateChangeHandler }
                onCancel={ hideDatePicker }
            />
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 24,
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
});
