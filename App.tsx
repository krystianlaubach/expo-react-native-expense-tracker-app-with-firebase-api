import 'react-native-get-random-values';
import { Colours } from './assets/styles/Colours';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';

import MainScreen from './screens/MainScreen';
import ManageExpenseScreen from './screens/ManageExpenseScreen';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <Provider store={ store }>
            <PersistGate persistor={ persistor }>
                <StatusBar style="light"/>
                <NavigationContainer>
                    <Stack.Navigator screenOptions={{
                        headerStyle: { backgroundColor: Colours.blue800 },
                        headerTintColor: 'white',
                    }}>
                        <Stack.Screen name='MainScreen' component={ MainScreen } options={{ headerShown: false }} />
                        <Stack.Screen name='ManageExpense' component={ ManageExpenseScreen } options={{
                            presentation: 'modal',
                        }} />
                    </Stack.Navigator>
                </NavigationContainer>
            </PersistGate>
        </Provider>
    );
}
