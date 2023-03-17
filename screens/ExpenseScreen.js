import { useEffect, useState } from 'react';
import { 
    Alert,
    Image,
    Keyboard,
    Pressable,
    StyleSheet,
    TouchableWithoutFeedback,
    View
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import ExtendedFAB from '../components/ExtendedFAB';
import IconButton from '../components/IconButton';
import Input from '../components/Input';
import TopAppBar from '../components/TopAppBar';

import { COLORS } from '../constants/colors';
import { SIZES } from '../constants/sizes';

import { expenseDB } from '../api/firebase.db';
import { imageStorage } from '../api/firebase.storage';

const ExpenseScreen = ({
    navigation, 
    route
}) => {
    const [merchant, setMerchant] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [image, setImage] = useState(null);

    const expense = route.params?.expense;

    /*******************************************************************
     Screen methods
    *******************************************************************/

    const chooseImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync();
    
        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const saveExpense = async () => {
        if (merchant === '' || amount === '') {
            Alert.alert('Fill required values before saving.');
        }
        else {
            try {
                const newExpense = {
                    merchant: merchant,
                    description: description,
                    amount: parseFloat(amount.replace(',', '.')),
                    hasImage: image !== null,
                };

                /* Decide whether to create or update expense */
                if (expense != null) {
                    newExpense.id = expense.id
                    await expenseDB.update(newExpense);
                }
                else {
                    newExpense.id = await expenseDB.create(newExpense);
                }

                /* Upload image */
                if (newExpense.hasImage) {
                    await imageStorage.upload(image, newExpense.id);
                }
            }
            catch (error) {
                console.log(error);
            }
            finally {
                navigation.navigate('Home');
            }
        }
    };

    /*******************************************************************
     Screen lifecycle
    *******************************************************************/

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            if (expense != null) {
                setMerchant(expense.merchant);
                setDescription(expense.description);
                setAmount(expense.amount);

                if (expense.hasImage) {
                    try {
                        setImage(await imageStorage.download(expense.id));
                    }
                    catch (error) {
                        console.log(error);
                    }
                }
            }
        });
      
        return unsubscribe;
    }, [navigation]);

    /*******************************************************************
     Screen view
    *******************************************************************/

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.expenseScreenContainer}>
                <TopAppBar 
                    leading={
                        <IconButton 
                            icon='fa-chevron-left'
                            color={COLORS.button}
                            size={SIZES.icon}
                            onPress={() => navigation.goBack()}
                        />
                    }
                />
                <View style={styles.expenseContainer}>
                    <Pressable 
                        style={styles.imageContainer}
                        onPress={chooseImage} 
                    >
                        { image ?
                            <Image 
                                source={{
                                    uri: image 
                                }} 
                                style={styles.image} 
                            />
                            : 
                            <FontAwesomeIcon 
                                icon='fa-receipt' 
                                size={32} 
                                color={COLORS.icon}
                            />
                        }
                    </Pressable>
                    <Input 
                        label='Merchant'
                        value={merchant}
                        placeholder='Required'
                        onChange={setMerchant}
                    />
                    <Input 
                        label='Amount' 
                        value={amount}
                        placeholder='Required'
                        onChange={setAmount}
                        type='decimal'
                    />
                    <Input 
                        label='Description' 
                        value={description}
                        onChange={setDescription}
                        type='multiline'
                        inputStyle={{height: 128}}
                    />
                    <ExtendedFAB
                        icon='fa-floppy-disk'
                        label='Save'
                        position={{
                            bottom: 80,
                            alignSelf: 'center',
                        }}
                        onPress={saveExpense}
                    />
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

/*******************************************************************
  Screen styles
*******************************************************************/

const styles = StyleSheet.create({
    expenseScreenContainer: {
        flex: 1,
        backgroundColor: COLORS.primaryContainer,
    },

    /* Expense */
    expenseContainer: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 24,
    },
    imageContainer: {
        width: 128,
        height: 128,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
    },
    image: {
        borderRadius: 8,
        ...StyleSheet.absoluteFillObject,
    }
});

export default ExpenseScreen;