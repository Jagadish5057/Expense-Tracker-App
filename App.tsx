import React from 'react';
import { SafeAreaView, StatusBar, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ExpenseProvider } from './src/context/ExpenseContext';
import ExpenseForm from './src/screens/ExpenseForm';
import Dashboard from './src/screens/DashboardScreen';

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <ExpenseProvider>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" />
        <Stack.Navigator initialRouteName="Dashboard">
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="ExpenseForm" component={ExpenseForm} />
        </Stack.Navigator>
      </NavigationContainer>
    </ExpenseProvider>
  );
};

export default App;
