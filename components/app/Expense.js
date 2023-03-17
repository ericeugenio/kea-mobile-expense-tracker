import { useEffect, useState } from 'react';
import { 
    Image,
    Pressable,
    StyleSheet,
    Text,
    View
} from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import { COLORS } from '../../constants/colors';
import { SIZES } from '../../constants/sizes';

import { imageStorage } from '../../api/firebase.storage';
import { dateToString } from '../../utils/dateHelper';

const Expense = ({
    data,
    onPress
}) => {
    const [image, setImage] = useState(null);

    /*******************************************************************
     Component lifecycle
    *******************************************************************/

    useEffect(() => {
        async function downloadImage() {
            if (data.hasImage) {
                try {
                    setImage(await imageStorage.download(data.id));
                }
                catch (error) {
                    console.log(error);
                }
            }
        };
      
        downloadImage();
    });
    
    /*******************************************************************
     Component view
    *******************************************************************/

    return (
        <Pressable style={styles.expenseContainer} onPress={onPress}>
            <View style={styles.expenseInnerLeftContainer}>
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
            </View>
            <View style={styles.expenseInnerRightContainer}>
                <Text style={styles.timestamp}>{dateToString(data.createdAt)}</Text>
                <View>
                    <Text style={styles.merchant}>{data.merchant}</Text>
                    <Text style={styles.amount}>{`${data.amount} €`}</Text>
                </View>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    expenseContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 128,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginHorizontal: 24,
        marginVertical: 8,
        /* ios */
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        /* android */
        elevation: 5
    },

    expenseInnerLeftContainer: {
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 1,
        borderRightColor: '#c8c8c8',
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
    },
    expenseInnerRightContainer: {
        flex: 3,
        height: '100%',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding: 12,
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
    },

    image: {
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        ...StyleSheet.absoluteFillObject,
    },
    timestamp: {
        color: '#c8c8c8',
    },
    merchant: {
        fontSize: SIZES.text,
        marginBottom: 8,
    },
    amount: {
        fontSize: SIZES.text,
        fontWeight: 'bold'
    },
});

export default Expense;