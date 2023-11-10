import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  card: {
    gap: 8,
    marginTop: 2,
    padding: 12,
    position: "absolute",
    top: 20,
    zIndex: 10,
    backgroundColor: "white",
    borderRadius: 14,
    shadowColor: "#00000047",
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
    gap: 5,
  },
  label: {
    fontSize: 16,
    fontFamily: "MontserratRegular",
    color: "#333",
    marginBottom: 8,
    width: "92%",
  },
  labelbutton: {
    fontSize: 18,
    fontFamily: "MontserratMedium",
    color: "white",
    marginBottom: 8,
  },
  smalLabel: {
    fontSize: 12,
    fontFamily: "MontserratRegular",
    color: "white",
  },
  button: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 12,
    gap: 8,
    backgroundColor: "#4B3EFF",
    alignItems: "center",
  },
  outline: {
    backgroundColor: "white",
  },
});

export default styles;
