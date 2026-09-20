import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  bookingLeft: {
    flex: 1,
  },

  statusBadge: {
    alignSelf: "flex-start",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginTop: 10,
  },

  completedBadge: {
    backgroundColor: "#E3F4E8",
  },

  upcomingBadge: {
    backgroundColor: "#E8EEF8",
  },

  statusBadgeText: {
    fontSize: 13,
    fontWeight: "700",
  },

  completedBadgeText: {
    color: "#2F7D4A",
  },

  upcomingBadgeText: {
    color: "#315D9A",
  },
  container: {
    flex: 1,
    backgroundColor: "#F4F5F7",
    paddingHorizontal: 24,
    justifyContent: "center",
  },

  content: {
    width: "100%",
    maxWidth: 520,
    alignSelf: "center",
  },

  title: {
    fontSize: 46,
    fontWeight: "800",
    color: "#111111",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 18,
    lineHeight: 26,
    color: "#555555",
    marginBottom: 40,
  },

  screen: {
    flex: 1,
    backgroundColor: "#F4F5F7",
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 24,
  },

  pageTitle: {
    fontSize: 34,
    fontWeight: "800",
    color: "#111111",
    marginBottom: 8,
  },

  pageSubtitle: {
    fontSize: 17,
    color: "#555555",
    marginBottom: 28,
  },

  primaryButton: {
    backgroundColor: "#111111",
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 14,
  },

  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
  },

  secondaryButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CCCCCC",
    paddingVertical: 17,
    paddingHorizontal: 24,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 12,
  },

  secondaryButtonText: {
    color: "#111111",
    fontSize: 16,
    fontWeight: "700",
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 16,
    padding: 22,
    marginBottom: 14,
  },

  cardTitle: {
    fontSize: 21,
    fontWeight: "700",
    color: "#111111",
    marginBottom: 5,
  },

  cardText: {
    fontSize: 15,
    color: "#666666",
    lineHeight: 21,
  },

  backButton: {
    marginTop: 18,
    paddingVertical: 12,
  },

  backButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111111",
  },

  waterInfo: {
    fontSize: 16,
    fontWeight: "600",
    color: "#444444",
    marginBottom: 20,
  },

  timeCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  timeCardUnavailable: {
    backgroundColor: "#ECEDEF",
    opacity: 0.55,
  },

  timeText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111111",
  },

  timeStatus: {
    fontSize: 15,
    fontWeight: "700",
    color: "#2F7D4A",
  },

  timeStatusUnavailable: {
    color: "#777777",
  },

  confirmationIcon: {
    fontSize: 58,
    fontWeight: "800",
    color: "#2F7D4A",
    marginBottom: 16,
  },

  summaryCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 16,
    padding: 22,
    marginTop: 18,
    marginBottom: 28,
  },

  summaryLabel: {
    fontSize: 13,
    color: "#777777",
    marginTop: 14,
  },

  summaryValue: {
    fontSize: 19,
    fontWeight: "700",
    color: "#111111",
    marginTop: 3,
  },

  adminSectionTitle: {
    fontSize: 21,
    fontWeight: "800",
    color: "#111111",
    marginBottom: 14,
  },

  waterCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 18,
    padding: 22,
    marginBottom: 28,
  },

  waterAmount: {
    fontSize: 46,
    fontWeight: "800",
    color: "#111111",
    marginTop: 4,
  },

  waterCapacityText: {
    fontSize: 16,
    color: "#666666",
    marginBottom: 16,
  },

  waterStatusText: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111111",
    marginBottom: 5,
  },

  waterPercentage: {
    fontSize: 15,
    color: "#555555",
    marginBottom: 16,
  },

  refillButton: {
    backgroundColor: "#111111",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 13,
    alignItems: "center",
    marginTop: 18,
  },

  refillButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  bookingCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 16,
    padding: 18,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  bookingTime: {
    fontSize: 20,
    fontWeight: "800",
    color: "#111111",
    marginBottom: 5,
  },

  bookingInfo: {
    fontSize: 15,
    color: "#555555",
    lineHeight: 22,
  },

  bookingWater: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111111",
  },

  placeholderContainer: {
    flex: 1,
    backgroundColor: "#F4F5F7",
    padding: 24,
    justifyContent: "center",
  },

  placeholderTitle: {
    fontSize: 32,
    fontWeight: "800",
    color: "#111111",
    marginBottom: 30,
  },
});
