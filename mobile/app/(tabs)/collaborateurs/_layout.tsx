import { Stack } from 'expo-router';
import {Button, useColorScheme} from 'react-native';

import Colors from '@/constants/Colors';
import {Icon} from "@rneui/themed";

export default function CollaborateurLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
            headerShown: false
        }}
      />
      <Stack.Screen
        name="newCollo"
        options={{
            title: 'Nouveau Collaborateur',
        }}
      />
        <Stack.Screen
        name="newSolde"
        options={{
          title: 'Nouveau Solde',
        }}
      />
        <Stack.Screen
        name="EditSolde"
        options={{
          title: 'Modification Solde',
        }}
      />
        <Stack.Screen
        name="EditUser/[id]"
        options={{
          title: 'Modification Collaborateur',
        }}
      />
        <Stack.Screen
        name="[id]"
        options={{
          title: 'Détails Collaborateur',
        }}
      />
        <Stack.Screen
        name="ViewAbsences/[id]"
        options={{
          title: 'Absence Collaborateur',
        }}
      />
        <Stack.Screen
        name="ViewSolde/[id]"
        options={{
          title: 'Solde Collaborateur',
        }}
      />

    </Stack>
  );
}
