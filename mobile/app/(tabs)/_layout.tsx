import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import {useColorScheme} from 'react-native';
import Colors from '@/constants/Colors';
import {Feather, FontAwesome5, Foundation, MaterialCommunityIcons} from "@expo/vector-icons";
import {IconButton} from "@react-native-material/core";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                tabBarInactiveBackgroundColor: Colors[colorScheme ?? 'light'].navBackground,
                tabBarActiveBackgroundColor: Colors[colorScheme ?? 'light'].navBackground,
                tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].tabIconDefault,
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
            }}>
            <Tabs.Screen
                name="Dashboard"
                options={{
                    title: 'Dashboard',
                    headerRight: () => (
                        <Link href="../modal.tsx" asChild>
                            <IconButton
                                icon={<FontAwesome5
                                    name="user-circle"
                                    size={28}
                                    color={Colors[colorScheme ?? 'light'].text}/>}
                            />
                        </Link>),
                    tabBarIcon: ({ color }) => <Foundation name="graph-pie" size={28} style={{ marginBottom: -3 }} color={color}/>,
                }}
            />
            <Tabs.Screen
                name="collaborateurs"
                options={{
                    title: 'Collaborateurs',
                    headerRight: () => (
                        <IconButton
                            icon={<FontAwesome5
                                name="user-circle"
                                size={28}
                                color={Colors[colorScheme ?? 'light'].text}/>}
                        />),

                    tabBarIcon: ({ color }) => <Feather name="users" size={28} style={{ marginBottom: -3 }} color={color}/>,
                }}
            />
            <Tabs.Screen
                name="Absences"
                options={{
                    title: 'Absences',
                    headerRight: () => (
                        <IconButton
                            icon={<FontAwesome5
                                name="user-circle"
                                size={28}
                                color={Colors[colorScheme ?? 'light'].text}/>}

                        />),
                    tabBarIcon: ({ color }) => <MaterialCommunityIcons name="calendar-clock" size={28} style={{ marginBottom: -3 }} color={color}/>,
                }}
            />
        </Tabs>
    );
}
