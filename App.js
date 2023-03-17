import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

import AuthScreen from './screens/AuthScreen';
import ExpenseScreen from './screens/ExpenseScreen';
import HomeScreen from './screens/HomeScreen';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faChartSimple } from '@fortawesome/free-solid-svg-icons/faChartSimple';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons/faFloppyDisk';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faReceipt } from '@fortawesome/free-solid-svg-icons/faReceipt';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons/faRightFromBracket';

import { userAuth } from './api/firebase.auth';

const Stack = createNativeStackNavigator();

library.add(
    faChartSimple,
    faChevronLeft,
    faFloppyDisk,
    faPlus, 
    faReceipt,
    faRightFromBracket,
);

export default function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = userAuth.listener((user) => {
            setUser(user);
        });

        return unsubscribe;
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{ headerShown: false}}
            >
                { !user ? (
                    <Stack.Screen 
                        name='Auth' 
                        component={gestureHandlerRootHOC(AuthScreen)} 
                    />
                ) : (
                    <>
                        <Stack.Screen 
                            name='Home' 
                            component={gestureHandlerRootHOC(HomeScreen)} 
                        />
                        <Stack.Screen 
                            name='Expense' 
                            component={gestureHandlerRootHOC(ExpenseScreen)} 
                        />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
