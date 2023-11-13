import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    gap: 8,
    marginTop: 2,
    padding: 16,
    paddingLeft: 8,
    backgroundColor: "white",
    borderRadius: 14,
    shadowColor: "#000000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: {
      height: 2,
      width: 0,
    },
    elevation: 3,
    marginBottom: 16,
  },
  titulo: {
    fontFamily: "MontserratMedium",
    fontSize: 16,
    color: "#000000",
    lineHeight: 24,
    padding: 0,
    marginBottom: 8,
  },
  containerRow: {
    flexDirection: "row",
    gap: 8.5,
  },
  label: {
    fontSize: 16,
    fontFamily: "MontserratRegular",
    color: "#1A1A1A",
    marginBottom: 8,
  },
  smalLabel: {
    fontSize: 12,
    fontFamily: "MontserratRegular",
    color: "#333333",
  },
});

export default styles;
