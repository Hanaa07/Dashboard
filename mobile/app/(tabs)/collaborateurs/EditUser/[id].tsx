import {Button, SafeAreaView, ScrollView, StyleSheet, TextInput, useColorScheme} from 'react-native';
import { Text, View } from '@/components/Themed';
import {Picker} from "@react-native-picker/picker";
import {useEffect, useState} from "react";
import {moderateScale, scale} from "react-native-size-matters";
import Colors from "@/constants/Colors";
import {router, useLocalSearchParams} from "expo-router";
import {useCookies} from "react-cookie";
import {get, put} from "@/Services/request";

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
export default function EditScreen() {
    let colorScheme = useColorScheme();
    const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        title: {
            margin: scale(10),
            fontSize: moderateScale(20),
            fontWeight: 'bold',
            alignItems: "center",
            color: Colors[colorScheme ?? "light"].text
        },
        textTitle: {
            marginHorizontal: scale(10),
            marginTop: scale(5),
            fontSize: moderateScale(16),
            color: Colors[colorScheme ?? "light"].text
        },
        text: {
            marginHorizontal: scale(10),
            marginTop: scale(10),
            fontSize: moderateScale(16),
            color: Colors[colorScheme ?? "light"].text,
            borderBottomWidth: 2,
            borderColor: Colors[colorScheme ?? "light"].navBackground,
        },
        buttonStyle: {
            margin: scale(10),
            flexDirection: "row",
            justifyContent: "center",
        },
        button: {
            padding: scale(5),
            width: scale(132),
        },
    });
    const [statut, setStatut] = useState('Stagiaire');

    const [user, setUser] = useState<UserType>()
    const { id } = useLocalSearchParams();
    const [cookies] = useCookies<any>([]);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const jwt = cookies.jwt ? cookies.jwt : '';
        get("/user/"+ id, {
            headers: {
                'Authorization': 'Bearer ' + jwt
            }
        }).then(res => {
            let receivedData = res.data;
            setIsConnected(receivedData.isAuthorised);
            if (receivedData.success === true) {
                setUser(receivedData.data);
            }
        });
    }, [id]);

    const fetchData = async () => {
        const jwt = cookies.jwt ? cookies.jwt : '';
        const res = await get('/user/' + id,{
            headers: {
                'Authorization': 'Bearer ' + jwt
            }
        })
        const receivedData = res.data;
        setIsConnected(receivedData.isAuthorised);
        if (receivedData.success === true) {
            setUser(receivedData.data);
        }
    }
    useEffect(() => {
        fetchData().catch(e => console.log(e))
    }, [id])

    const handleSubmit = (values: UserType) => {
        const jwt = cookies.jwt ? cookies.jwt : '';
        console.log("value finale", values)

        put('/user/'+ id + '/edit', values, {
            headers: {
                'Authorization': 'Bearer ' + jwt
            }
        }).then((res) => {
            let receivedData = res.data;
            setIsConnected(receivedData.isAuthorised);
            if (receivedData.success === true) {
                return router.back()
            }
        });
    };
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Modification des informations de {user?.firstName} {user?.lastName}</Text>
            <ScrollView>
                <Text style={styles.textTitle}>Nom</Text>
                <TextInput value={user?.lastName} style={styles.text}/>
                <Text style={styles.textTitle}>Prénom</Text>
                <TextInput value={user?.firstName} style={styles.text}/>
                <Text style={styles.textTitle}>Numéro de téléphone</Text>
                <TextInput value={user?.phone} style={styles.text}/>
                <Text style={styles.textTitle}>Email</Text>
                <TextInput value={user?.email} style={styles.text}/>
                <Text style={styles.textTitle}>Statut : {user?.statut}</Text>
                <Picker
                    selectedValue={statut}
                    onValueChange={currentStatut => setStatut(currentStatut)}>
                    <Picker.Item label="Stagiaire" value="stagiaire" />
                    <Picker.Item label="Salarié" value="salarié" />
                </Picker>
                <Text style={styles.textTitle}>Adresse</Text>
                <TextInput value={user?.adresse} style={styles.text}/>
                <Text style={styles.textTitle}>Date d'entrée</Text>
                <TextInput placeholder="30/04/2020" style={styles.text}/>
                <Text style={styles.textTitle}>Expérience professionnelle</Text>
                <TextInput placeholder="24/04/2015" style={styles.text}/>
                <Text style={styles.textTitle}>Expérience à MonarkIt</Text>
                <TextInput placeholder="01/02/2020" style={styles.text}/>
                <Text style={styles.textTitle}>Date de naissance</Text>
                <TextInput placeholder="01/01/1990" style={styles.text}/>
                <View style={styles.buttonStyle}>
                    <View style={styles.button}><Button title="Valider" color="#00bcd4"/></View>
                    <View style={styles.button}><Button title="Annuler" color={Colors[colorScheme ?? "light"].error}/></View>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}


