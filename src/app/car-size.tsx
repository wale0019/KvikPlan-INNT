import { router, useLocalSearchParams } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { styles } from "../styles/styles";

export default function CarSizeScreen() {
  const { service } = useLocalSearchParams<{ service: string }>();

  const chooseCarSize = (carSize: string) => {
    router.push({
      pathname: "/time",
      params: {
        service,
        carSize,
      },
    });
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.pageTitle}>Vælg bilstørrelse</Text>

      <Text style={styles.pageSubtitle}>Valgt pakke: {service}</Text>

      <Pressable style={styles.card} onPress={() => chooseCarSize("Lille")}>
        <Text style={styles.cardTitle}>Lille bil</Text>
        <Text style={styles.cardText}>
          Fx VW Polo, Toyota Yaris eller lignende
        </Text>
      </Pressable>

      <Pressable style={styles.card} onPress={() => chooseCarSize("Mellem")}>
        <Text style={styles.cardTitle}>Mellem bil</Text>
        <Text style={styles.cardText}>
          Fx VW Golf, Toyota Corolla eller lignende
        </Text>
      </Pressable>

      <Pressable style={styles.card} onPress={() => chooseCarSize("Stor")}>
        <Text style={styles.cardTitle}>Stor bil</Text>
        <Text style={styles.cardText}>Fx SUV, stationcar eller lignende</Text>
      </Pressable>

      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>← Tilbage</Text>
      </Pressable>
    </View>
  );
}
