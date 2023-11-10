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
  chip: {
    paddingLeft: 16,
    paddingVertical: 8,
    paddingRight: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#EDECFF",
    backgroundColor: "#FCFCFC",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  smalLabel: {
    fontFamily: "MontserratMedium",
    fontSize: 14,
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
    marginTop:40,
    marginHorizontal:16
  },
  labelbutton: {
    fontSize: 16,
    fontFamily: "MontserratMedium",
    color: "white",
   
  },
});

export default styles;
