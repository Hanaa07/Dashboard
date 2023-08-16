import {SafeAreaView, ScrollView, StyleSheet, Text, useColorScheme} from "react-native";
import {moderateScale, scale} from "react-native-size-matters";
import { View } from '@/components/Themed';
import Colors from "@/constants/Colors";

type StickerProps = {
    stickerText: any,
    stickerIcon: any,
}

export default function StickerElement(props: StickerProps){
    let colorScheme = useColorScheme();
    let {stickerText, stickerIcon} = props

    const styles = StyleSheet.create({
        stickerContainer: {
            width: scale(250),
            alignItems: 'center',
        },
        text: {
            fontSize: moderateScale(13),
            width: scale(200),
            color: Colors[colorScheme ?? "light"].text,
            marginBottom: 10,
        },
        sticker: {
            flexDirection: "row",
            justifyContent: "center",
            borderWidth: 10,
            borderBottomWidth: 2,
            borderColor: Colors[colorScheme ?? "light"].navBackground,
            borderBottomColor: Colors[colorScheme ?? "light"].background,
            backgroundColor: Colors[colorScheme ?? "light"].navBackground,
        }

    });
    return (
            <View style={styles.sticker}>
                <Text style={styles.text}>{stickerText}</Text>
                {stickerIcon}
            </View>
    )
}