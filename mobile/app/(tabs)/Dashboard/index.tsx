import {Pressable, StyleSheet, useColorScheme} from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import {Link} from "expo-router";

export default function IndexScreen() {
  const colorScheme = useColorScheme();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard index</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/Dashboard/" />


      <Link href="/(tabs)/Dashboard/new" asChild>
        <Pressable>
          {({ pressed }) => {
              return <Text style={{fontSize: 24}}>Go to New Screen</Text>
          }}
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
