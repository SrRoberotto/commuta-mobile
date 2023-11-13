import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import CardHeader from "../../components/CardHeader";
import CardContacts from "../../components/CardContacts";


import UserServices from "../../services/user.services";
import ContactServices from "../../services/contact.services";

// "id": 4,
// "user_id": 3,
// "contact_id": 2,
// "contact_name": "Pedro",
// "contact_organization_name": "Instituto Federal da Bahia",
// "contact_organization_acronym": "IFBA",
// "contact_city_name": "Eunápolis",
// "contact_state_uf": "BA",
// "contact_area_name": "Ciências Exatas e da Terra",
// "contact_subarea_name": "Ciência da Computação",
// "contact_title_name": "Professor EBTT"


function ContactsScreen({ navigation }) {
  const contato = {
    "id": 4,
    "user_id": 3,
    "contact_id": 2,
    "contact_name": "Pedro",
    "contact_organization_name": "Instituto Federal da Bahia",
    "contact_organization_acronym": "IFBA",
    "contact_city_name": "Eunápolis",
    "contact_state_uf": "BA",
    "contact_area_name": "Ciências Exatas e da Terra",
    "contact_subarea_name": "Ciência da Computação",
    "contact_title_name": "Professor EBTT"
  }

  const user = {
    "city_name": "Eunápolis",
    "state_uf": "BA",
  }

  const [userData, setUserData] = useState([]);
  const [contactData, setContactData] = useState([]);

  async function fetchMe() {
    try {
      const response = await UserServices.getMe()
        .then(response => {
          setUserData(response.data.me);
          console.log ("User Data: ",userData)
          //setLoading(false)
        })
        .catch(error => {
          console.log(error);
          

          }
        );
    } catch (error) {
      console.log(error)
    } finally {
      //setLoading(false)
    }
  }

  useEffect(() => { fetchMe(); }, [userData.length < 1]);


  return (
    <View style={styles.container}>
      <CardHeader />
      <View style={{paddingHorizontal: 16}}>
        <CardContacts navigation={navigation} contact={contato} user={user}/>
        <CardContacts navigation={navigation} contact={contato} user={user} />
        <CardContacts navigation={navigation} contact={contato} user={user}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    backgroundColor: "#FCFCFC",
  },
});

export default ContactsScreen;
