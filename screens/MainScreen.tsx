import { Colours } from '../assets/styles/Colours';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import TabButton from '../components/TabNavigator/TabButton';
import RecentExpensesScreen from './RecentExpensesScreen';
import AllExpensesScreen from './AllExpensesScreen';
import IconButton from '../components/Buttons/IconButton';

const Tabs = createBottomTabNavigator();

export default function MainScreen(): JSX.Element {
    return (
        <Tabs.Navigator screenOptions={({ navigation }) => ({
            headerStyle: { backgroundColor: Colours.blue400 },
            headerTintColor: 'white',
            tabBarInactiveTintColor: Colours.white,
            tabBarActiveTintColor: Colours.blue100,
            tabBarStyle: { borderTopWidth: 0, elevation: 0, backgroundColor: Colours.blue400 },
            headerRight: ({tintColor}) => <IconButton
                icon='view-grid-plus'
                size={28}
                color={ tintColor as string }
                style={{ marginHorizontal: 12 }}
                onPress={() => {
                    navigation.navigate('ManageExpense');
                }}
            />,
        })}>
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
