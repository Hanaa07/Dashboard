import {Pressable, StyleSheet, useColorScheme} from 'react-native';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import {Link} from "expo-router";
import { SafeAreaView, FlatList } from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import Card from "@/components/Cards";
import {IconButton} from "@react-native-material/core";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {Entypo} from "@expo/vector-icons";
import Colors from "@/constants/Colors";

const ABSENCES = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        name: 'John Doe',
        days: '10 jours',
        remainingDays: '5 jours restants du solde',
        dateS: '02/05/2023',
        dateE: '14/05/2023'
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        name: 'Selena Petriello',
        days: '2 jours',
        remainingDays: '21 jours restants du solde',
        dateS: '20/07/2023',
        dateE: '27/07/2023'
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        name: 'Shelden Suatt',
        days:  '7 jours',
        remainingDays: '19 jours restants du solde',
        dateS: '16/01/2023',
        dateE: '23/01/2023'
    },
    {
        id: 'bd7acbea-c605-aed5-a4f8-145571e29d72',
        name: 'Leora Sappson',
        days:  '15 jours',
        remainingDays: '15 jours restants du solde',
        dateS: '19/07/2023',
        dateE: '27/07/2023'
    },
    {
        id: '58694a0f-c605-c1b1-3da1-fbd91aa97f63',
        name: 'Deny Gianinotti',
        days:  '4 jours',
        remainingDays: '-1 jours restants du solde',
        dateS: '09/08/2023',
        dateE: '15/08/2023'
    },
    
]
export default function IndexScreen() {
    let colorScheme = useColorScheme();
    return (
    <SafeAreaView style={styles.container}>
            <FlatList
                contentContainerStyle={styles.cards}
                showsVerticalScrollIndicator={false}
                data={ABSENCES}
                renderItem={({item}) => <Card
                    title={item.name}
                    date={item.remainingDays}
                    status={`${item.dateE} - ${item.dateS}`}
                    days={item.days}
                    component={
                        <>
                            <Link href="/(tabs)/Absences/EditAbsence" asChild>
                                <Entypo name="edit" color={Colors[colorScheme ?? 'light'].text} size={moderateScale(20)}/>
                            </Link>
                            <Link href="/(tabs)/Absences/EditAbsence" asChild>
                                <FontAwesome name="trash" color={Colors[colorScheme ?? "light"].error} size={moderateScale(20)}/>
                            </Link>
                        </>}/>}
                keyExtractor={item => item.id}
            />
    </SafeAreaView>
);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cards:{
        alignItems:"center"
    },
    headerButtons: {
        flexDirection: "row",
        justifyContent: 'space-between',
    },
    text: {
        fontSize: moderateScale(16),
        color: "#00bcd4",
        margin: 10,
    },
    separator: {
        marginVertical: moderateScale(30),
        height: 1,
        width: '80%',
    },
});
