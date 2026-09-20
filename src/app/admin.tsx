import { router } from "expo-router";

import { FlatList, Pressable, Text, View } from "react-native";

import { styles } from "../styles/styles";
import { VAN_CAPACITY } from "../data/data";
import { useBookings } from "../context/BookingContext";

export default function AdminScreen() {
  const {
    bookings,
    currentWater,
    projectedWater,
    refillSlots,
    refillWater,
    resetDemo,
  } = useBookings();

  const waterPercentage = Math.round((currentWater / VAN_CAPACITY) * 100);

  const getWaterStatus = () => {
    if (currentWater <= 40) {
      return "Kritisk";
    }

    if (currentWater <= 70) {
      return "Lav";
    }

    return "God";
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.pageTitle}>Admin</Text>

      <Text style={styles.pageSubtitle}>Dagens overblik</Text>

      <View style={styles.waterCard}>
        <Text style={styles.adminSectionTitle}>Aktuel vandstatus</Text>

        <Text style={styles.waterAmount}>{currentWater} L</Text>

        <Text style={styles.waterCapacityText}>af {VAN_CAPACITY} L</Text>

        <Text style={styles.waterStatusText}>Status: {getWaterStatus()}</Text>

        <Text style={styles.waterPercentage}>{waterPercentage}% tilbage</Text>

        <Text style={styles.bookingInfo}>
          Forventet vand tilbage efter kommende bookinger: {projectedWater} L
        </Text>

        {refillSlots.length > 0 && (
          <Text style={styles.bookingInfo}>
            Planlagt genopfyldning: {refillSlots.join(", ")}
          </Text>
        )}

        <Pressable style={styles.refillButton} onPress={refillWater}>
          <Text style={styles.refillButtonText}>Registrer genopfyldning</Text>
        </Pressable>
      </View>

      <Text style={styles.adminSectionTitle}>Dagens bookinger</Text>

      <FlatList
        data={bookings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.bookingCard}>
            <View style={styles.bookingLeft}>
              <Text style={styles.bookingTime}>{item.time}</Text>

              <Text style={styles.bookingInfo}>
                {item.service} · {item.carSize} bil
              </Text>

              <View
                style={[
                  styles.statusBadge,
                  item.completed ? styles.completedBadge : styles.upcomingBadge,
                ]}
              >
                <Text
                  style={[
                    styles.statusBadgeText,
                    item.completed
                      ? styles.completedBadgeText
                      : styles.upcomingBadgeText,
                  ]}
                >
                  {item.completed ? "Gennemført" : "Kommende"}
                </Text>
              </View>
            </View>

            <Text style={styles.bookingWater}>{item.waterUsage} L</Text>
          </View>
        )}
      />

      <Pressable style={styles.secondaryButton} onPress={resetDemo}>
        <Text style={styles.secondaryButtonText}>Nulstil demo</Text>
      </Pressable>

      <Pressable style={styles.backButton} onPress={() => router.replace("/")}>
        <Text style={styles.backButtonText}>← Til forsiden</Text>
      </Pressable>
    </View>
  );
}
