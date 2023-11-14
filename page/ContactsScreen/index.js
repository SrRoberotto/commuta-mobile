import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import CardHeader from "../../components/CardHeader";
import CardContacts from "../../components/CardContacts";


import UserServices from "../../services/user.services";
import ContactServices from "../../services/contact.services";


function ContactsScreen({ navigation }) {
  const [userData, setUserData] = useState([]);
  const [contactData, setContactData] = useState([]);


  async function fetchContactList() {
    try {
      const response = await ContactServices.getContacts()
        .then(response => {
          //var count = response.data.length;
          console.log ("Resposta do Contact: ",response.data)

          setContactData(response.data);

          //setLoading(false)
        })
        .catch(error => {
          console.log(error);
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
      <CardHeader />
      <View style={{paddingHorizontal: 16}}>
      {contactData.length > 0 ?
        contactData.map((item) => {
          //console.log(item)
          return (
            <CardContacts navigation={navigation} data={item}/>
          );
        }) : (
          <Text style={styles.titulo}>Nenhum contato</Text>
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

export default ContactsScreen;
