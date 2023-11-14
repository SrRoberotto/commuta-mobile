import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#FCFCFC",
  },
  titulo: {
    fontFamily: "MontserratMedium",
    fontSize: 16,
    color: "#000000",
    lineHeight: 20,
    padding: 0,
    marginBottom: 17,
  },
  containerRow: {
    flexDirection: "row",
    gap: 8.5,
  },
  label: {
    fontSize: 16,
    fontFamily: "MontserratRegular",
    color: "#333333",
    paddingBottom: 8,
    flexWrap: "wrap",
    flex: 1,
  },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: "#49454F",
  },
  borderButton: {
    borderColor: "#4B3EFF",
    borderWidth: 2,
  },
  button: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 12,
    gap: 8,
    backgroundColor: "#4B3EFF",
    alignItems: "center",
    justifyContent: "center",
  },
  outline: {
    backgroundColor: "white",
  },
  labelbutton: {
    fontSize: 18,
    fontFamily: "MontserratMedium",
    color: "white",
    marginBottom: 8,
  },
});

export default styles;
