import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    marginTop: 2,
    padding: 16,
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
    marginBottom: 17,
  },
  containerRow: {
    flexDirection: "row",
    gap: 8.5,
  },
  label: {
    fontSize: 14,
    fontFamily: "MontserratRegular",
    color: "#333333",
    paddingBottom: 8,
  },
});
export default styles;
