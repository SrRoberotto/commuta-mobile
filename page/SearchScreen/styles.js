import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex:1,
    paddingHorizontal: 16,
    backgroundColor: "#FCFCFC",
  },
  cardContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 60,
  },
  input: {
    backgroundColor: "white",
    fontFamily: "MontserratRegular",
    lineHeight: 24,
    marginBottom: 16,
  },
  label: {
    fontFamily: "MontserratMedium",
    fontSize: 16,
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
  button: {
    flexDirection: "row",
    backgroundColor: "#4B3EFF",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    gap: 8,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 8,
  },
  labelButton: {
    fontFamily: "MontserratMedium",
    fontSize: 18,
    color: "white",
  },
  error:{color:"red", fontSize:10}
});


export default styles;
