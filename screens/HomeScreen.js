import { useCallback, useEffect, useState } from 'react';
import { 
    Dimensions,
    RefreshControl,
    SectionList,
    StyleSheet,
    Text,
    View
} from 'react-native';

import IconButton from '../components/IconButton';
import TopAppBar from '../components/TopAppBar';
import Expense from '../components/app/Expense';

import { COLORS } from '../constants/colors';
import { SIZES } from '../constants/sizes';

import { userAuth } from '../api/firebase.auth';
import { expenseDB } from '../api/firebase.db';

const SCREEN_HEIGHT = Dimensions.get('window').height;

const HomeScreen = ({
    navigation,
    route
}) => {
    const [expenses, setExpenses] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    /*******************************************************************
     Screen methods
    *******************************************************************/

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        setExpenses(await expenseDB.readAll());
        setRefreshing(false);
    }, []);

    /*******************************************************************
     Screen lifecycle
    *******************************************************************/

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            try {
                setExpenses(await expenseDB.readAll());
            }
            catch (error) {
                console.log(error);
            }
        });
      
        return unsubscribe;
    }, [navigation]);

    /*******************************************************************
     Screen view
    *******************************************************************/

    return (
        <View style={styles.homeScreenContainer}>
            <TopAppBar 
                title={'Expenses'}
                trailing={
                    <View style={styles.topAppBarTrailingContainer}>
                        <IconButton 
                            icon='fa-plus'
                            color={COLORS.button}
                            size={SIZES.icon}
                            onPress={() => navigation.navigate('Expense')}
                        />
                        <IconButton 
                            icon='fa-right-from-bracket'
                            color={COLORS.button}
                            size={SIZES.icon}
                            onPress={userAuth.signout}
                            containerStyle={{marginLeft: 24}}
                        />
                    </View>
                }
            />
            <View style={styles.expensesListContainer}>
                <SectionList 
                    sections={expenses}
                    renderSectionHeader={({section}) => (
                        <Text style={styles.expensesListHeader}>{section.title.toUpperCase()}</Text>
                    )}
                    renderItem={({item}) => (
                        <Expense 
                            data={item} 
                            onPress={() => {
                                navigation.navigate('Expense', { expense: {
                                    id: item.id,
                                    merchant: item.merchant,
                                    description: item.description,
                                    amount: item.amount.toString(),
                                    hasImage: item.hasImage,
                                }})
                            }}
                        />
                    )}
                    refreshControl={
                        <RefreshControl 
                            refreshing={refreshing} 
                            onRefresh={onRefresh} 
                        />
                    }
                    ListEmptyComponent={
                        <View style={styles.empty}>
                            <Text style={styles.emptyText}>Seems you have no expenses yet</Text>
                        </View>
                    }
                />
            </View>
        </View>
    );
};

/*******************************************************************
  Screen styles
*******************************************************************/

const styles = StyleSheet.create({
    homeScreenContainer: {
        flex: 1,
        backgroundColor: COLORS.primaryContainer,
    },

    /* Top app bar */
    topAppBarTrailingContainer: {
        flexDirection:'row',
    },

    /* Expenses list */
    expensesListContainer: {
        flex: 1,
    },

    expensesListHeader: {
        color: COLORS.primary,
        fontSize: 12,
        fontWeight: 'bold',
        backgroundColor: COLORS.primaryContainer,
        paddingTop: 24,
        paddingBottom: 8,
        paddingHorizontal: 24,
    },

    empty: {
        height: SCREEN_HEIGHT - 120,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyText: {
        color: '#c8c8c8'
    }
});

export default HomeScreen;