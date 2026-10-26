import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";

import { useBookings } from "../context/BookingContext";
import { formStyles } from "../styles/formStyles";
import { styles } from "../styles/styles";

export default function CustomerDetailsScreen() {
  const { service, carSize, time, estimatedWater } = useLocalSearchParams<{
    service?: string;
    carSize?: string;
    time?: string;
    estimatedWater?: string;
  }>();

  const { addBooking, setCustomerDetails } = useBookings();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [saving, setSaving] = useState(false);

  const handleContinue = async () => {
    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();
    const trimmedAddress = address.trim();

    if (!trimmedName || !trimmedPhone || !trimmedAddress) {
      Alert.alert(
        "Manglende oplysninger",
        "Udfyld navn, telefonnummer og adresse.",
      );

      return;
    }

    if (!service || !carSize || !time || !estimatedWater) {
      Alert.alert(
        "Manglende bookingdata",
        "Der mangler oplysninger fra bookingen. Prøv igen.",
      );

      return;
    }

    const waterUsage = Number(estimatedWater);

    setSaving(true);

    try {
      const bookingAdded = await addBooking({
        service,
        carSize,
        time,
        waterUsage,
        name: trimmedName,
        phone: trimmedPhone,
        address: trimmedAddress,
      });

      if (!bookingAdded) {
        Alert.alert(
          "Bookingen kunne ikke gemmes",
          "Tidspunktet kan være optaget, eller der opstod en fejl ved forbindelsen til databasen.",
        );

        return;
      }

      setCustomerDetails({
        name: trimmedName,
        phone: trimmedPhone,
        address: trimmedAddress,
      });

      router.push({
        pathname: "/confirmation",

        params: {
          service,
          carSize,
          time,
          estimatedWater,
          name: trimmedName,
          phone: trimmedPhone,
          address: trimmedAddress,
        },
      });
    } catch (error) {
      console.error("Fejl ved gemning af booking:", error);

      Alert.alert("Kunne ikke gemme booking", "Der opstod en fejl. Prøv igen.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.pageTitle}>Kundeoplysninger</Text>

      <Text style={styles.pageSubtitle}>
        Indtast dine oplysninger for at færdiggøre bookingen.
      </Text>

      <View style={formStyles.form}>
        <View style={formStyles.field}>
          <Text style={formStyles.label}>Navn</Text>

          <TextInput
            style={formStyles.input}
            value={name}
            onChangeText={setName}
            placeholder="Dit navn"
            autoCapitalize="words"
          />
        </View>

        <View style={formStyles.field}>
          <Text style={formStyles.label}>Telefonnummer</Text>

          <TextInput
            style={formStyles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder="Dit telefonnummer"
            keyboardType="phone-pad"
          />
        </View>

        <View style={formStyles.field}>
          <Text style={formStyles.label}>Adresse</Text>

          <TextInput
            style={formStyles.input}
            value={address}
            onChangeText={setAddress}
            placeholder="Din adresse"
            autoCapitalize="words"
          />
        </View>

        <Pressable
          style={styles.primaryButton}
          onPress={handleContinue}
          disabled={saving}
        >
          <Text style={styles.primaryButtonText}>
            {saving ? "Gemmer..." : "Bekræft booking"}
          </Text>
        </Pressable>
      </View>

      <Pressable
        style={styles.backButton}
        onPress={() => router.back()}
        disabled={saving}
      >
        <Text style={styles.backButtonText}>← Tilbage</Text>
      </Pressable>
    </View>
  );
}
