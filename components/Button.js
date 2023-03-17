import { 
    Pressable,
    Text,
    StyleSheet
} from 'react-native';

const Button = ({
    label,
    color = '#fff',
    backgroundColor = '#1c1c1c',
    onPress,
    containerStyle,
}) => {
    return (
        <Pressable 
            style={[
                styles.buttonContainer(backgroundColor), 
                containerStyle
            ]} 
            onPress={onPress}
        >
            <Text style={styles.label(color)}>{label.toUpperCase()}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({  
    buttonContainer: (backgroundColor) => {
        return {
            paddingVertical: 12,
            paddingHorizontal: 16,
            borderRadius: 8,
            backgroundColor: backgroundColor,
            marginVertical: 8,
        }
    },

    label: (color) => {
        return {
            fontWeight: 'bold',
            alignSelf: 'center',
            color: color,
        }
    },
});

export default Button;