import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';

import Colors from '@/constants/Colors';

export default function DashboardLayout() {
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
          title: 'New Window',
        }}
      />
    </Stack>
  );
}
