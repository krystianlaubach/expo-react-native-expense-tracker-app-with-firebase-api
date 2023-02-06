import axios, { AxiosResponse } from 'axios';
import { ExpenseData, ExpenseType } from '../redux/expensesSlice';

const API_URL = 'https://react-native-course-expe-6ad8e-default-rtdb.europe-west1.firebasedatabase.app';

export async function storeExpense(expenseData: ExpenseData): Promise<string> {
    const response = await axios.post(API_URL + '/expenses.json', expenseData, {
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
        },
    });

    return response.data.name;
}

export async function fetchExpenses(): Promise<Array<ExpenseType>> {
    const response: AxiosResponse = await axios.get(API_URL + '/expenses.json', {
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
        },
    });

    let expenses: Array<ExpenseType> = [];

    for (const key in response.data) {
        expenses.push({
            id: key,
            description: response.data[key].description,
            amount: response.data[key].amount,
            date: response.data[key].date,
        });
    }

    return expenses;
}

export async function updateExpense(id: string, expenseData: ExpenseData): Promise<ExpenseData> {
    const response = await axios.put(API_URL + `/expenses/${id}.json`, expenseData, {
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
        },
    });

    return response.data;
}

export async function deleteExpense(id: string): Promise<AxiosResponse> {
    return await axios.delete(API_URL + `/expenses/${id}.json`, {
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
        },
    });
}

function isSuccessfulResponse(response: AxiosResponse): boolean {
    return response.status >= 200 && response.status < 300;
}
