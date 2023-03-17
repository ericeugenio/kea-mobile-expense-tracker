import { 
    StyleSheet, 
    Text, 
    View,
} from 'react-native';

const TopAppBar = ({
    title, 
    leading, 
    trailing,
    containerStyle,
    titleStyle,
}) => {
    const isLeading = (leading !== undefined);
    const isTrailing = (trailing !== undefined);

    return (
        <View style={[containerStyle, styles.topAppBarContainer(isTrailing)]}>
            <View style={styles.innerLeftContainer}>
                {leading}
                {title && <Text style={[titleStyle, styles.title(isLeading)]}>{title}</Text>}
            </View>
            {trailing}
        </View>
    );
};

const styles = StyleSheet.create({
    topAppBarContainer: (isTrailing) => {
        const justifyContent = isTrailing ? 'space-between' : 'flex-start';

        return {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: justifyContent,
            paddingHorizontal: 24,
            paddingTop: 64,
            paddingBottom: 12,
        }
    },

    innerLeftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    title: (isLeading) => {
        const marginLeft = isLeading ? 12 : 0;

        return {
            fontSize: 32,
            fontWeight: 'bold',
            marginLeft: marginLeft,
        }
    },
});

export default TopAppBar;
