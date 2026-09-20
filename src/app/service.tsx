import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { styles } from "../styles/styles";

export default function ServiceScreen() {
  const chooseService = (service: string) => {
    router.push({
      pathname: "/car-size",
      params: { service },
    });
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.pageTitle}>Vælg servicepakke</Text>
      <Text style={styles.pageSubtitle}>
        Vælg den bilplejepakke, du ønsker.
      </Text>

      <Pressable style={styles.card} onPress={() => chooseService("Guld")}>
        <Text style={styles.cardTitle}>Guld</Text>
        <Text style={styles.cardText}>Vælg Guld-pakken</Text>
      </Pressable>

      <Pressable style={styles.card} onPress={() => chooseService("Premium")}>
        <Text style={styles.cardTitle}>Premium</Text>
        <Text style={styles.cardText}>Vælg Premium-pakken</Text>
      </Pressable>

      <Pressable style={styles.card} onPress={() => chooseService("Diamant")}>
        <Text style={styles.cardTitle}>Diamant</Text>
        <Text style={styles.cardText}>Vælg Diamant-pakken</Text>
      </Pressable>

      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>← Tilbage</Text>
      </Pressable>
    </View>
  );
}
