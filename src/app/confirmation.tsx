import { router, useLocalSearchParams } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { styles } from "../styles/styles";

export default function ConfirmationScreen() {
  const { service, carSize, time, estimatedWater } = useLocalSearchParams<{
    service: string;
    carSize: string;
    time: string;
    estimatedWater: string;
  }>();

  return (
    <View style={styles.screen}>
      <Text style={styles.confirmationIcon}>✓</Text>

      <Text style={styles.pageTitle}>Booking bekræftet</Text>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>Servicepakke</Text>
        <Text style={styles.summaryValue}>{service}</Text>

        <Text style={styles.summaryLabel}>Bilstørrelse</Text>
        <Text style={styles.summaryValue}>{carSize}</Text>

        <Text style={styles.summaryLabel}>Tidspunkt</Text>
        <Text style={styles.summaryValue}>{time}</Text>

        <Text style={styles.summaryLabel}>Estimeret vandforbrug</Text>
        <Text style={styles.summaryValue}>{estimatedWater} L</Text>
      </View>

      <Pressable
        style={styles.primaryButton}
        onPress={() => router.replace("/")}
      >
        <Text style={styles.primaryButtonText}>Til forsiden</Text>
      </Pressable>
    </View>
  );
}
