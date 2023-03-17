import { useState } from 'react';
import { 
    KeyboardAvoidingView,
    Keyboard,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import { userAuth } from '../api/firebase.auth';

import Button from '../components/Button';
import Input from '../components/Input';

import { COLORS } from '../constants/colors';

const AuthScreen = ({
    navigation,
    route
}) => {
    const [loginFlag, setLoginFlag] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    /*******************************************************************
     Screen methods
    *******************************************************************/
    
    const swapLoginFlag = () => {
        setLoginFlag(!loginFlag);
    }

    const login = async () => {
        try {
            await userAuth.login(email, password);
            setEmail('');
            setPassword('');
        }
        catch (error) {
            console.log(error);
        }
    }

    const signup = async () => {
        try {
            await userAuth.signup(email, password);
            setEmail('');
            setPassword('');
        }
        catch (error) {
            console.log(error);
        }
    }

    /*******************************************************************
     Screen lifecycle
    *******************************************************************/

    /*******************************************************************
     Screen view
    *******************************************************************/

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView 
                style={styles.loginScreenContainer}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <View style={styles.container}>
                    <Text style={styles.title}>Expense Tracker</Text>
                    <View style={styles.form}>
                        <Input 
                            label='Email'
                            value={email}
                            placeholder='Required'
                            onChange={setEmail}
                            type='email'
                            />
                        <Input 
                            label='Password'
                            value={password}
                            placeholder='Required'
                            onChange={setPassword}
                            type='password'
                        />
                        { loginFlag ? 
                            <>
                                <Button 
                                    label='Login'
                                    onPress={login}
                                />
                                <Text style={styles.hint}>
                                    Need an account? 
                                    <Text 
                                        style={styles.hintButton}
                                        onPress={swapLoginFlag} 
                                    > Singup</Text>
                                </Text>
                            </>
                            :
                            <>
                                <Button 
                                    label='Signup'
                                    onPress={signup}
                                />
                                <Text style={styles.hint}>
                                    Already have an account? 
                                    <Text 
                                        style={styles.hintButton}
                                        onPress={swapLoginFlag} 
                                    > Login</Text>
                                </Text>
                            </>
                        }
                    </View>
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
};

/*******************************************************************
  Screen styles
*******************************************************************/

const styles = StyleSheet.create({
    loginScreenContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: COLORS.primaryContainer,
    },
    
    container: {
        alignItems: 'center',
        paddingHorizontal: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 64,
    },
    form: {
        width: '100%'
    },
    hint: {
        alignSelf: 'center',
        marginTop: 8, 
    },
    hintButton: {
        color: COLORS.button,
    }
});

export default AuthScreen;