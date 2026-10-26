import { router } from "expo-router";
import { Alert, FlatList, Pressable, Text, View } from "react-native";

import { useBookings } from "../context/BookingContext";
import { VAN_CAPACITY } from "../data/data";
import { adminStyles } from "../styles/adminStyles";
import { styles } from "../styles/styles";

export default function AdminScreen() {
  const {
    bookings,
    currentWater,
    projectedWater,
    refillSlots,
    refillWater,
    resetDemo,
    deleteBooking,
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

  const handleDeleteBooking = (id: string, time: string) => {
    Alert.alert("Slet booking", `Vil du slette bookingen kl. ${time}?`, [
      {
        text: "Annuller",
        style: "cancel",
      },
      {
        text: "Slet",
        style: "destructive",

        onPress: async () => {
          const deleted = await deleteBooking(id);

          if (!deleted) {
            Alert.alert("Kunne ikke slette booking", "Prøv igen.");
          }
        },
      },
    ]);
  };

  const sortedBookings = [...bookings].sort((a, b) => {
    const [aHour, aMinute] = a.time.split(":").map(Number);

    const [bHour, bMinute] = b.time.split(":").map(Number);

    return aHour * 60 + aMinute - (bHour * 60 + bMinute);
  });

  return (
    <View style={styles.screen}>
      <Text style={styles.pageTitle}>Admin</Text>

      <Text style={styles.pageSubtitle}>Dagens overblik</Text>

      <View style={adminStyles.waterCard}>
        <Text style={adminStyles.adminSectionTitle}>Aktuel vandstatus</Text>

        <Text style={adminStyles.waterAmount}>{currentWater} L</Text>

        <Text style={adminStyles.waterCapacityText}>af {VAN_CAPACITY} L</Text>

        <Text style={adminStyles.waterStatusText}>
          Status: {getWaterStatus()}
        </Text>

        <Text style={adminStyles.waterPercentage}>
          {waterPercentage}% tilbage
        </Text>

        <Text style={adminStyles.bookingInfo}>
          Forventet vand tilbage efter kommende bookinger: {projectedWater} L
        </Text>

        {refillSlots.length > 0 && (
          <Text style={adminStyles.bookingInfo}>
            Planlagt genopfyldning: {refillSlots.join(", ")}
          </Text>
        )}

        <Pressable style={adminStyles.refillButton} onPress={refillWater}>
          <Text style={adminStyles.refillButtonText}>
            Registrer genopfyldning
          </Text>
        </Pressable>
      </View>

      <Text style={adminStyles.adminSectionTitle}>Dagens bookinger</Text>

      <FlatList
        data={sortedBookings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={adminStyles.bookingCard}>
            <View style={adminStyles.bookingLeft}>
              <Text style={adminStyles.bookingTime}>{item.time}</Text>

              <Text style={adminStyles.bookingInfo}>
                {item.service} · {item.carSize} bil
              </Text>

              {item.name ? (
                <>
                  <Text style={adminStyles.bookingInfo}>
                    Kunde: {item.name}
                  </Text>

                  <Text style={adminStyles.bookingInfo}>
                    Adresse: {item.address}
                  </Text>

                  <Text style={adminStyles.bookingInfo}>
                    Tlf.: {item.phone}
                  </Text>
                </>
              ) : null}

              <View
                style={[
                  adminStyles.statusBadge,

                  item.completed
                    ? adminStyles.completedBadge
                    : adminStyles.upcomingBadge,
                ]}
              >
                <Text
                  style={[
                    adminStyles.statusBadgeText,

                    item.completed
                      ? adminStyles.completedBadgeText
                      : adminStyles.upcomingBadgeText,
                  ]}
                >
                  {item.completed ? "Gennemført" : "Kommende"}
                </Text>
              </View>

              {!item.completed && item.name ? (
                <Pressable
                  style={adminStyles.deleteButton}
                  onPress={() => handleDeleteBooking(item.id, item.time)}
                >
                  <Text style={adminStyles.deleteButtonText}>Slet booking</Text>
                </Pressable>
              ) : null}
            </View>

            <Text style={adminStyles.bookingWater}>{item.waterUsage} L</Text>
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
