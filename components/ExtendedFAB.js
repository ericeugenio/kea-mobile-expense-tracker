import { 
    Pressable,
    StyleSheet,
    Text, 
} from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

const ExtendedFAB = ({
    icon,
    label,
    color = '#fff',
    backgroundColor = '#1c1c1c',
    position,
    onPress,
}) => {
    return (
        <Pressable style={[styles.extendedFABContainer(backgroundColor), position]} onPress={onPress}>
            <Text style={styles.label(color)}>{label}</Text>
            <FontAwesomeIcon 
                style={styles.icon(color)} 
                icon={icon} 
                size={20} 
            />
        </Pressable>
    );
};

const styles = StyleSheet.create({  
    extendedFABContainer: (backgroundColor) => {
        return {
            position: 'absolute',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 12,
            paddingHorizontal: 16,
            borderRadius: 24,
            backgroundColor: backgroundColor,
        }
    },

    label: (color) => {
        return {
            fontWeight: 'bold',
            color: color,
        }
    },

    icon: (color) => {
        return {
            color: color,
            marginLeft: 16,
        }
    },
});

export default ExtendedFAB;