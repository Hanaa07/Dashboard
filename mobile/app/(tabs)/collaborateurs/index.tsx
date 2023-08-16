import {
    StyleSheet,
    SafeAreaView,
    FlatList, Text, View, useColorScheme, Pressable,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import Card from "@/components/Cards";
import {IconButton} from "@react-native-material/core";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {Entypo} from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import {Link, router} from "expo-router";
import {useEffect, useState} from "react";
import {get} from "@/Services/request";
import {useCookies} from "react-cookie";
import dayjs from "dayjs";

type UserType = {
    id?: string,
    _id?: string,
    adresse: string,
    email: string,
    lastName: string,
    firstName: string,
    phone: string | number,
    statut: string,
    joinedIn: string,
    birth: string,
    exp_pro: string,
    exp_mit: string,
}

const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'John Doe',
        date: '12/04/2023',
        status: 'Salarié',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Selena Petriello',
        date: '06/04/2023',
        status: 'Salarié',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Shelden Suatt',
        date: '08/05/2023',
        status: 'Stagiaire',
    },
    {
        id: 'bd7acbea-c605-aed5-a4f8-145571e29d72',
        title: 'Leora Sappson',
        date: '06/04/2022',
        status: 'Salarié',
    },
    {
        id: '58694a0f-c605-c1b1-3da1-fbd91aa97f63',
        title: 'Deny Gianinotti',
        date: '20/03/2020',
        status: 'Salarié',
    },
];

export default function IndexScreen() {
    let colorScheme = useColorScheme();
    const [users, setUsers] = useState<UserType[]>([]);
    const [cookies] = useCookies<any>([]);

    useEffect(() => {
        const jwt = cookies.jwt ? cookies.jwt : '';
        get("/user/", {
            headers: {
                'Authorization': 'Bearer ' + jwt
            }
        }).then(res => {
            let receivedData = res.data;
            console.log(receivedData);

            if (receivedData.success === true) {
                setUsers(receivedData.data);
            }
        })
            .catch((error) => {
                console.error(error)
            });
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerButtons}>
                <Link href="/(tabs)/collaborateurs/NewCollaborateur/" asChild>
                    <Text style={styles.text}>Ajouter</Text>
                </Link>
            </View>
            <FlatList
                style={styles.container}
                contentContainerStyle={styles.cards}
                showsVerticalScrollIndicator={false}
                data={users}
                renderItem={({ item }) => (
                    <Card
                        title={`${item?.firstName} ${item?.lastName}`}
                        date={dayjs(item?.joinedIn).format('DD/MM/YYYY')}
                        days={undefined}
                        status={item?.statut}
                        component={
                            <>
                                <Link href={{
                                    pathname: "/(tabs)/collaborateurs/[id]",
                                    params: {id : item?._id}
                                }} asChild>
                                    <IconButton icon={<FontAwesome name="eye" color={Colors[colorScheme ?? 'light'].text} size={moderateScale(20)} />} />
                                </Link>
                                <Link href={{
                                    pathname:"/(tabs)/collaborateurs/EditUser/[id]",
                                    params: {id : item?._id}
                                }} asChild>
                                    <IconButton icon={<Entypo name="edit" color={Colors[colorScheme ?? 'light'].text} size={moderateScale(20)} />} />
                                </Link>
                                <IconButton icon={<FontAwesome name="trash" color={Colors[colorScheme ?? "light"].error} size={moderateScale(20)} />} onPress={() => {
                                    const jwt = cookies.jwt ? cookies.jwt : '';
                                    get('/user/'+ item?._id +'/delete',{
                                        headers: {
                                            'Authorization': 'Bearer ' + jwt
                                        }
                                    }).then(()=> {
                                        return router.back()
                                    });
                                }}/>
                            </>
                        }
                    />
                )}
                keyExtractor={item => item?._id}
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
        justifyContent: 'flex-end',
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

