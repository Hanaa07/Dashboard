import {
    StyleSheet,
    View,
    Text, useColorScheme,
} from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import Colors from "@/constants/Colors";


type CardsProps = {
    title: string,
    date: string |undefined,
    status: string,
    days: string | undefined,
    component: any,
};

const Card = (props: CardsProps) => {
    let colorScheme = useColorScheme();
    const styles = StyleSheet.create({
        item: {
            flexDirection: 'column',
            backgroundColor: Colors[colorScheme ?? "light"].navBackground,
          padding: moderateScale(20),
            marginVertical: moderateScale(8),
            marginHorizontal: moderateScale(16),
            borderRadius: 12,
            width: scale(289),
        },
        title: {
            fontSize: moderateScale(19),
            fontWeight: 'bold',
            color: Colors[colorScheme ?? "light"].text
        },
        titleDateContainer: {
            flexWrap:'wrap',
            flexDirection: 'row',
            alignItems:'center',
            justifyContent: 'space-between',
            marginVertical: scale(8)

        },
        bigTitle: {
            fontSize: moderateScale(30),
            fontWeight: 'bold',
            color: Colors[colorScheme ?? "light"].text,
        },
        subtext: {
            fontSize: moderateScale(14),
            color: Colors[colorScheme ?? "light"].text,

        },
        text: {
            fontSize: moderateScale(16),
            color: Colors[colorScheme ?? "light"].text
        },
        buttonGroupContainer: {
            marginTop: scale(16),
            padding: scale(8),
            borderTopWidth: 2,
            borderColor: Colors[colorScheme ?? "light"].background,
            flexDirection: "row",
            justifyContent: "space-around",
        },
    });
    let {title, date, status, component, days} = props
    return(
        <View style={styles.item}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.titleDateContainer}>
                <Text style={styles.bigTitle}>{days}</Text>
                <Text style={styles.subtext}>{date}</Text>
            </View>
            <Text style={styles.text}>{status}</Text>
            <View style={styles.buttonGroupContainer}>
                {component}
            </View>
        </View>
    )
};



export default Card;