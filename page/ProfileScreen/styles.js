import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCFCFC",
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  titulo: {
    fontFamily: "MontserratMedium",
    fontSize: 16,
    color: "#000000",
    lineHeight: 20,
    padding: 0,
    marginBottom: 17,
  },
  button: {
    flexDirection: "row",
    paddingVertical: 16,
    paddingHorizontal: 25,
    borderRadius: 12,
    gap: 8,
    backgroundColor: "#4B3EFF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  labelbutton: {
    fontSize: 16,
    fontFamily: "MontserratMedium",
    color: "white",
  },
  outline: {
    backgroundColor: "white",
  },
  menu: {
    backgroundColor: "white",
    width: 208,
    position: "absolute",
    top: 0.3,
    right: 5,
    elevation: 4,
    borderRadius: 8,
  },
  buttonMenu: {
    flexDirection: "row",
    justifyContent: "start",
    padding: 10,
    gap: 8,
  },
  labelMenu: {
    fontSize: 14,
    marginBottom: 0,
  },
});

export default styles;
