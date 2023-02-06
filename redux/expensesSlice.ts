import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type ExpenseType = {
    id: string,
    description: string,
    amount: number,
    date: string,
};

export type ExpensesState = {
    expenses: Array<ExpenseType>,
};

type DeleteExpensePayload = {
    id: string,
};

export type ExpenseData = {
    description: string,
    amount: number,
    date: string,
};

type UpdateExpensePayload = {
    id: string,
    data: ExpenseData,
};

const initialState: ExpensesState = {
    expenses: [],
};

const expensesSlice = createSlice({
    name: 'expenses',
    initialState: initialState,
    reducers: {
        setExpenses: (state: ExpensesState, action: PayloadAction<any>) => {
            state.expenses = [...action.payload];
        },
        addExpense: (state: ExpensesState, action: PayloadAction<ExpenseType>): void => {
            state.expenses = [{ ...action.payload }, ...state.expenses];
        },
        deleteExpense: (state: ExpensesState, action: PayloadAction<DeleteExpensePayload>): void => {
            state.expenses.splice(state.expenses.findIndex((expense: ExpenseType) => expense.id === action.payload.id), 1);
        },
        updateExpense: (state: ExpensesState, action: PayloadAction<UpdateExpensePayload>): void => {
            const expenseToUpdateIndex: number = state.expenses.findIndex((expense: ExpenseType) => expense.id === action.payload.id);
            const expenseToUpdate: ExpenseType = state.expenses[expenseToUpdateIndex];

            state.expenses[expenseToUpdateIndex] = { ...expenseToUpdate, ...action.payload.data };
        },
    },
});

export const { setExpenses, addExpense, deleteExpense, updateExpense } = expensesSlice.actions;
export default expensesSlice.reducer;
