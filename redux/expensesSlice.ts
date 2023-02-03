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

export type ExpensePayload = {
    expense: ExpenseType,
};

const initialState: ExpensesState = {
    expenses: [],
};

const expensesSlice = createSlice({
    name: 'expenses',
    initialState: initialState,
    reducers: {
        addExpense: (state: ExpensesState, action: PayloadAction<ExpensePayload>): void => {
            state.expenses.push(action.payload.expense);
        },
        removeExpense: (state: ExpensesState, action: PayloadAction<ExpensePayload>): void => {
            state.expenses.splice(state.expenses.indexOf(action.payload.expense), 1);
        },
    },
});

export const { addExpense, removeExpense } = expensesSlice.actions;
export default expensesSlice.reducer;
