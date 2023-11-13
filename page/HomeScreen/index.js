import React from "react";
import { View, Text, StyleSheet } from "react-native";
import CardHeader from "../../components/CardHeader";
import CardNews from "../../components/CardNews";
import PlanoAnualModal from "../../components/PlanoAnualModal";

import UserServices from "../../services/user.services";
import DataServices from "../../services/data.services";
import { useAuthContext } from "../../context/AuthContext";

function HomeScreen({ navigation }) {
  const [visible, setVisible] = React.useState(true)
  const user1 = {
    "area_name": "Ciências Exatas e da Terra",
    "subarea_name": "Ciência da Computação",
    "title_name": "Professor EBTT",
    "interest_organization_name": "Instituto Federal da Bahia",
    "interest_organization_acronym": "IFBA",
    "interest_city_name": "Eunápolis"
  }
  return (
    <View style={styles.container}>
      <PlanoAnualModal visible={visible} setVisible={setVisible}></PlanoAnualModal>
      <CardHeader></CardHeader>
      <View style={{ paddingHorizontal: 16 }}>
        <CardNews navigation={navigation} data={user1}/>
        <CardNews navigation={navigation} data={user1}/> 
        <CardNews navigation={navigation} data={user1}/> 
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

export default HomeScreen;
