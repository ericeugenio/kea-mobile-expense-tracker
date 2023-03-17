import { 
    Pressable,
} from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

const IconButton = ({
    icon, 
    size = 16, 
    color = '#1c1c1c',
    onPress,
    containerStyle,
}) => {
    return (
        <Pressable style={containerStyle} onPress={onPress}>
            <FontAwesomeIcon 
                icon={icon} 
                size={size} 
                color={color} 
            />
        </Pressable>
    );
};

export default IconButton;