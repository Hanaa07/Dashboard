import {Button, SafeAreaView, ScrollView, StyleSheet, TextInput, useColorScheme} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Text, View } from '@/components/Themed';
import {Picker} from "@react-native-picker/picker";
import {useState} from "react";
import {moderateScale, scale} from "react-native-size-matters";
import Colors from "@/constants/Colors";
import {useCookies} from "react-cookie";
import {post} from "@/Services/request";
import {Link, router} from "expo-router";

type UserType = {
  id?: string | undefined,
  _id?: string | undefined,
  adresse: string,
  email: string,
  lastName: string,
  firstName: string,
  phone: string | number,
  statut: string | null,
  joinedIn: string,
  birth: string,
  exp_pro: string,
  exp_mit: string,
}
export default function NewScreen() {
  const [date, setDate] = useState(new Date());
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

  const [cookies] = useCookies<any>([]);
  const initialValues: UserType = {
    adresse: "",
    email: "",
    lastName: "",
    firstName: "",
    phone: "",
    statut: "",
    joinedIn: "",
    exp_pro: "",
    exp_mit: "",
    birth: ""
  }


  const handleSubmit = (values: UserType) => {
    const jwt = cookies.jwt ? cookies.jwt : '';
    post('/user/new', values, {
      headers: {
        'Authorization': 'Bearer ' + jwt
      }
    }).then((res) => {
      console.log(res.data);
      if (res.data.success === true) {
        return router.back()
      }
    });

  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Ajout d'un collaborateur</Text>
      <ScrollView>
        <Text style={styles.textTitle}>Nom</Text>
        <TextInput placeholder={initialValues.lastName} style={styles.text}/>
        <Text style={styles.textTitle}>Prénom</Text>
        <TextInput placeholder={initialValues.firstName} style={styles.text}/>
        <Text style={styles.textTitle}>Email</Text>
        <TextInput placeholder={initialValues.email} style={styles.text}/>
        <Text style={styles.textTitle}>Statut : {statut}</Text>
        <Picker
            selectedValue={statut}
            onValueChange={currentStatut => setStatut(currentStatut)}>
          <Picker.Item label="Stagiaire" value="Stagiaire" />
          <Picker.Item label="Salarié" value="Salarié" />
        </Picker>
        <Text style={styles.textTitle}>Numéro de téléphone</Text>
        <TextInput placeholder={initialValues.phone} style={styles.text}/>
        <Text style={styles.textTitle}>Adresse</Text>
        <TextInput placeholder={initialValues.adresse} style={styles.text}/>
        <Text style={styles.textTitle}>Date de naissance</Text>
        <DateTimePicker value={date} style={styles.text}/>
        <Text style={styles.textTitle}>Date d'entrée</Text>
        <DateTimePicker value={date} style={styles.text}/>
        <Text style={styles.textTitle}>Expérience professionnelle</Text>
        <DateTimePicker value={date} style={styles.text}/>
        <Text style={styles.textTitle}>Expérience à MonarkIt</Text>
        <DateTimePicker value={date} style={styles.text}/>
        <View style={styles.buttonStyle}>
          <View style={styles.button}>
            <Button
                title="Valider"
                color="#00bcd4"
                onPress={() => {
                  return handleSubmit}}
            />
          </View>
          <View style={styles.button}><Button title="Annuler" color={Colors[colorScheme ?? "light"].error}/></View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}


