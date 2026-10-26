import { StyleSheet } from "react-native";

export const formStyles = StyleSheet.create({
  form: {
    gap: 16,
    marginTop: 24,
  },

  field: {
    gap: 6,
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
  },

  input: {
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: "#ffffff",
  },

  errorText: {
    fontSize: 14,
    marginTop: 8,
  },
});
