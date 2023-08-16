import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';

import Colors from '@/constants/Colors';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
export default function AbsenceLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      }}>
      <Stack.Screen
        name="index"
        options={{
            headerShown: false
        }}
      />
        <Stack.Screen
            name="new"
            options={{
                title: 'Nouvelle Absence',
            }}
        />
    </Stack>
  );
}
