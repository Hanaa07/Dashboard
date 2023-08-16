import {Button, SafeAreaView, ScrollView, StyleSheet, Text, useColorScheme} from "react-native";
import {moderateScale, scale} from "react-native-size-matters";
import { View } from '@/components/Themed';
import Colors from "@/constants/Colors";
import {Avatar} from "@react-native-material/core";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {Feather, MaterialIcons} from "@expo/vector-icons";
import {Icon} from "@rneui/themed";
import StickerElement from "@/components/StickerElement";
import {Link, router, useLocalSearchParams} from "expo-router";
import {useEffect, useState} from "react";
import {get} from "@/Services/request";
import {useCookies} from "react-cookie";
import {useParams} from "react-router";
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

export default function Views(){
    let colorScheme = useColorScheme();

    const [user, setUser] = useState<UserType>();
    const [cookies] = useCookies<any>([]);
    const {id} = useLocalSearchParams();
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const jwt = cookies.jwt ? cookies.jwt : '';
        get("/user/"+ id, {
            headers: {
                'Authorization': 'Bearer ' + jwt
            }
        }).then(res => {
            let receivedData = res.data;
            console.log(receivedData)
            setIsConnected(receivedData.isAuthorised);

            if (receivedData.success === true) {
                setUser(receivedData.data);
            }
        });
    }, []);


    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
        },
        title: {
            margin: scale(10),
            fontSize: moderateScale(20),
            fontWeight: 'bold',
            alignItems: "center",
            color: Colors[colorScheme ?? "light"].text
        },
        textTitle: {
            marginTop: scale(5),
            fontSize: moderateScale(16),
            color: Colors[colorScheme ?? "light"].text
        },
        text: {
            marginTop: scale(10),
            fontSize: moderateScale(13),
            color: Colors[colorScheme ?? "light"].text,
            borderBottomWidth: 2,
            borderColor: Colors[colorScheme ?? "light"].navBackground,
        },
        button: {
            padding: scale(5),
            justifyContent: "center",
            width: scale(250)
        },
        avatarContainer: {
            alignItems: 'center', // Center avatar horizontally
            marginBottom: scale(20), // Add some space at the bottom
        },
        stickerContainer: {
            backgroundColor: Colors[colorScheme ?? "light"].navBackground,
            borderWidth: 10,
            borderColor: Colors[colorScheme ?? "light"].navBackground,
            borderRadius: 12,
            width: scale(250),
            alignItems: 'center',
            marginTop: scale(10),
        },
    });

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{flex:1}} contentContainerStyle={{alignItems:"center"}}>
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Détails Collaborateur</Text>

                <View style={styles.avatarContainer}>
                    <Avatar
                        label={`${user?.firstName} ${user?.lastName}`}
                        labelStyle={{color: Colors[colorScheme ?? 'light'].navBackground}}
                        size={scale(100)}
                        color={Colors[colorScheme ?? 'light'].tint}
                    />
                    <Text style={styles.textTitle}>{user?.firstName} {user?.lastName}</Text>
                </View>
                <View style={styles.stickerContainer}>
                    <StickerElement stickerText={user?.email} stickerIcon={<Icon type="MaterialIcons" name="alternate-email" color={Colors[colorScheme ?? "light"].text} size={20}/>}/>
                    <StickerElement stickerText={user?.phone} stickerIcon={<Icon type="simple-line-icon" name="phone" color={Colors[colorScheme ?? "light"].text} size={20}/>}/>
                    <StickerElement stickerText={user?.adresse} stickerIcon={<Icon type="simple-line-icon" name="home" color={Colors[colorScheme ?? "light"].text} size={20}/>}/>
                    <StickerElement stickerText={dayjs(user?.birth).format('DD/MM/YYYY')} stickerIcon={<Icon type="font-awesome" name="birthday-cake" color={Colors[colorScheme ?? "light"].text} size={20}/>}/>
                    <StickerElement stickerText={dayjs(user?.exp_pro).format('DD/MM/YYYY')} stickerIcon={<Icon type="simple-line-icon" name="briefcase" color={Colors[colorScheme ?? "light"].text} size={20}/>}/>
                    <StickerElement stickerText={dayjs(user?.exp_mit).format('DD/MM/YYYY')} stickerIcon={<Icon type="font-awesome" name="code" color={Colors[colorScheme ?? "light"].text} size={20}/>}/>
                </View>
                <View style={{marginTop: 10}}>
                    <View style={styles.button}>
                        <Link href="/(tabs)/collaborateurs/newAbsence" asChild>
                        <Button title="Ajouter une absence" color="#00bcd4"/>
                        </Link>
                    </View>
                    <View style={styles.button}>
                        <Link href="/(tabs)/collaborateurs/viewSolde" asChild>
                            <Button title="Voir son solde" color="#00bcd4"/>
                        </Link>
                    </View>
                    <View style={styles.button}>
                        <Link href="/(tabs)/collaborateurs/viewAbsences" asChild>
                            <Button title="Voir ses absences" color="#00bcd4"/>
                        </Link>
                    </View>
                </View>
        </SafeAreaView></ScrollView>
    );
}