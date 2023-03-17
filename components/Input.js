import { 
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';

const Input = ({
    type, 
    label, 
    value,
    onChange,
    placeholder,
    containerStyle,
    labelStyle,
    inputStyle
}) => {
    return (
        <View style={[styles.inputContainer, containerStyle]}>
            <Text style={[styles.label, labelStyle]}>{label}</Text>
            <TextInput 
                inputMode={(type === 'multiline'  || type === 'password') ? 'text' : type}
                value={value}
                onChangeText={onChange}
                multiline={type === 'multiline'}
                secureTextEntry={type === 'password'}
                placeholder={placeholder}
                style={[styles.input, inputStyle]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        marginBottom: 12,
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#c8c8c8',
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 12
    },
});


export default Input;