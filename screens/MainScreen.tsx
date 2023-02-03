import { Colours } from '../assets/styles/Colours';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import TabButton from '../components/TabNavigator/TabButton';
import RecentExpensesScreen from './RecentExpensesScreen';
import AllExpensesScreen from './AllExpensesScreen';

const Tabs = createBottomTabNavigator();

export default function MainScreen(): JSX.Element {
    return (
        <Tabs.Navigator screenOptions={{
            headerStyle: { backgroundColor: Colours.blue400 },
            headerTintColor: 'white',
            tabBarInactiveTintColor: Colours.white,
            tabBarActiveTintColor: Colours.blue100,
            tabBarStyle: { backgroundColor: Colours.blue400 },
        }}>
            <Tabs.Screen name='RecentExpenses' component={ RecentExpensesScreen } options={{
                title: 'Recent Expenses',
                tabBarButton: TabButton,
                tabBarIcon: ({color, size}) => <MaterialCommunityIcons name='timer-sand' color={ color } size={ size } />,
                tabBarLabel: 'Recent',
            }} />
            <Tabs.Screen name='AllExpenses' component={ AllExpensesScreen } options={{
                title: 'All Expenses',
                tabBarButton: TabButton,
                tabBarIcon: ({color, size}) => <MaterialCommunityIcons name='calendar-month' color={ color } size={ size } />,
                tabBarLabel: 'All Expenses',
            }} />
        </Tabs.Navigator>
    );
}
