import React, { useState, useEffect }  from "react";
import { View, Text, StyleSheet } from "react-native";
import CardHeader from "../../components/CardHeader";
import CardNews from "../../components/CardNews";
import PlanoAnualModal from "../../components/PlanoAnualModal";


import ContactServices from "../../services/contact.services";
import UserServices from "../../services/user.services";
import DataServices from "../../services/data.services";
import { useAuthContext } from "../../context/AuthContext";



function HomeScreen({ navigation }) {
  //console.log("Navigation: ",navigation)
  const [visible, setVisible] = React.useState(true)
  const [contactData, setContactData] = useState([]);

  async function fetchContactList() {
    try {
      const response = await ContactServices.getPendingContacts()
        .then(response => {
          //var count = response.data.length;
          //console.log ("Resposta do Contact: ",response.data)

          setContactData(response.data);

          //setLoading(false)
        })
        .catch(error => {
          console.log(error);
          
          // console.log("Erro retornado: ", error.response.status);
          // console.log("Dados do erro:\n",error.response.data);

          // Alert.alert('Erro na requisição',error.response.status + ": " + error.response.data.message);

          }
        );
    } catch (error) {
      console.log(error)
      console.log("Erro retornado: ", error.response.status);
      console.log("Dados do erro:\n",error.response.data);
    } finally {
      //setLoading(false)
    }
  }

  
  useEffect(() => { fetchContactList(); }, [contactData.length < 1]);

  return (
    <View style={styles.container}>
      <PlanoAnualModal visible={visible} setVisible={setVisible}></PlanoAnualModal>
      <CardHeader></CardHeader>
      <View style={{ paddingHorizontal: 16 }}>

      {contactData.length > 0 ?
        contactData.map((item) => {
          //console.log(item)
          return (
            <CardNews navigation={navigation} data={item}/>
          );
        }) : (
          <Text style={styles.titulo}>Nenhuma novidade</Text>
        )}
      </View>
    </View>
  );
}

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
});

export default HomeScreen;
