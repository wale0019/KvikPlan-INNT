import { StyleSheet } from "react-native";

export const adminStyles = StyleSheet.create({
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

  bookingLeft: {
    flex: 1,
    paddingRight: 12,
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

  deleteButton: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    alignSelf: "flex-start",
    marginTop: 10,
  },

  deleteButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#555555",
  },
});
