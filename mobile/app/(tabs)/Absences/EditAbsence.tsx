import {Button, SafeAreaView, ScrollView, StyleSheet, TextInput, useColorScheme} from 'react-native';
import { Text, View } from '@/components/Themed';
import {useState} from "react";
import {moderateScale, scale} from "react-native-size-matters";
import Colors from "@/constants/Colors";

export default function NewScreen() {
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
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Modification d'une absence pour John Doe</Text>
            <ScrollView>
                <Text style={styles.textTitle}>Date de début</Text>
                <TextInput placeholder="02/05/2023" style={styles.text}/>
                <Text style={styles.textTitle}>Date de fin</Text>
                <TextInput placeholder="14/05/2023" style={styles.text}/>
                <Text style={styles.textTitle}>Jours d'absence</Text>
                <TextInput placeholder="10" style={styles.text}/>
                <View style={styles.buttonStyle}>
                    <View style={styles.button}><Button title="Valider" color="#00bcd4"/></View>
                    <View style={styles.button}><Button title="Annuler" color={Colors[colorScheme ?? "light"].error}/></View>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}