import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { styles } from "../styles/styles";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>KvikPlan</Text>

        <Text style={styles.subtitle}>Book din bilpleje nemt og hurtigt.</Text>

        <Pressable
          style={styles.primaryButton}
          onPress={() => router.push("/service")}
        >
          <Text style={styles.primaryButtonText}>Book tid</Text>
        </Pressable>

        <Pressable
          style={styles.secondaryButton}
          onPress={() => router.push("/admin")}
        >
          <Text style={styles.secondaryButtonText}>Admin</Text>
        </Pressable>
      </View>
    </View>
  );
}
