import { router, useLocalSearchParams } from "expo-router";

import { FlatList, Pressable, Text, View } from "react-native";

import { styles } from "../styles/styles";

import { TIME_SLOTS, WATER_USAGE } from "../data/data";

import { useBookings } from "../context/BookingContext";

export default function TimeScreen() {
  const { service, carSize } = useLocalSearchParams<{
    service?: string;
    carSize?: string;
  }>();

  const { bookings, addBooking, isTimeAvailable, refillSlots } = useBookings();

  const selectedService = service ?? "";
  const selectedCarSize = carSize ?? "";

  const waterUsage = WATER_USAGE as Record<string, Record<string, number>>;

  const estimatedWater = waterUsage[selectedService]?.[selectedCarSize];

  if (estimatedWater === undefined) {
    return (
      <View style={styles.screen}>
        <Text style={styles.pageTitle}>Manglende bookingdata</Text>

        <Text style={styles.pageSubtitle}>
          Vælg servicepakke og bilstørrelse igen.
        </Text>

        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>← Tilbage</Text>
        </Pressable>
      </View>
    );
  }

  const times = TIME_SLOTS.map((time) => {
    const existingBooking = bookings.find((booking) => booking.time === time);

    if (existingBooking) {
      return {
        time,
        available: false,
        status: "Optaget",
      };
    }

    // Internt reserveret til genopfyldning
    if (refillSlots.includes(time)) {
      return {
        time,
        available: false,
        status: "Optaget",
      };
    }

    const available = isTimeAvailable(time, estimatedWater);

    return {
      time,
      available,
      status: available ? "Ledig" : "Optaget",
    };
  });

  const chooseTime = (time: string) => {
    const bookingAdded = addBooking({
      time,
      service: selectedService,
      carSize: selectedCarSize,
      waterUsage: estimatedWater,
    });

    if (!bookingAdded) {
      return;
    }

    router.push({
      pathname: "/confirmation",

      params: {
        service: selectedService,
        carSize: selectedCarSize,
        time,
        estimatedWater: String(estimatedWater),
      },
    });
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.pageTitle}>Vælg tidspunkt</Text>

      <Text style={styles.pageSubtitle}>
        {selectedService} · {selectedCarSize} bil
      </Text>

      <Text style={styles.waterInfo}>
        Forventet vandforbrug: {estimatedWater} L
      </Text>

      <FlatList
        data={times}
        keyExtractor={(item) => item.time}
        renderItem={({ item }) => (
          <Pressable
            disabled={!item.available}
            onPress={() => chooseTime(item.time)}
            style={[
              styles.timeCard,

              !item.available && styles.timeCardUnavailable,
            ]}
          >
            <Text style={styles.timeText}>{item.time}</Text>

            <Text
              style={[
                styles.timeStatus,

                !item.available && styles.timeStatusUnavailable,
              ]}
            >
              {item.status}
            </Text>
          </Pressable>
        )}
      />

      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>← Tilbage</Text>
      </Pressable>
    </View>
  );
}
