import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#FCFCFC",
    justifyContent:"space-between"
  },
  navbar: {
    paddingTop: 40,
    paddingBottom: 18,
  },
  titulo: {
    fontFamily: "MontserratMedium",
    fontSize: 20,
    textAlign: "center",
  },
  label: {
    fontFamily: "MontserratRegular",
    fontSize: 16,
    marginBottom: 28,
  },
  labelButton: {
    fontFamily: "MontserratMedium",
    fontSize: 16,
    color: "white",
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
  error:{color:"red", fontSize:10},
  accordion: {
      borderColor: "#808080",
      borderWidth: 1,
      paddingVertical: 0,
      borderRadius: 8,
      backgroundColor: "white",
      height: 48,
      width: 100
  },
  viewEstados: {
    position: 'absolute',
    backgroundColor: "white",
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    borderRadius: 10,
    width: 200,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    elevation: 2,
    marginTop: 10,
    zIndex: 2,
  },

  viewCidade:{
    position: 'absolute',
    width: "65%",
    right:0,
    elevation: 11,
    zIndex: 1,
  },

  inputOrgao:{
    zIndex: 3,
  }
});

export default styles;
