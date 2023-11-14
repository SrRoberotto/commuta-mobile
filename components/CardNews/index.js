import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "./styles";

function CardNews({navigation,data}) {
  //console.log(data)
  return (
    <View style={styles.card}>
      <View style={{ width: "90%" }}>
        <Text style={styles.titulo}>{data.contact_title_name}({data.contact_subarea_name})</Text>
        <View style={styles.containerRow}>
          <Entypo name="star" size={16} color="#8178FF" />
          <Text style={styles.label}>Deseja: {data.interest_city_name} (BA)</Text>
        </View>
        <View style={styles.containerRow}>
          <Entypo name="location-pin" size={16} color="#333333" />
          <Text style={styles.label}>Oferece: {data.contact_city_name} ({data.contact_state_uf})</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Detalhes do Interesse",data)}
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <MaterialIcons name="keyboard-arrow-right" size={24} color="#4B3EFF" />
      </TouchableOpacity>
    </View>
  );
}
//[{"contact_area_name": "Ciências Exatas e da Terra", "contact_city_name": "Eunápolis", "contact_id": 2, "contact_name": "Pedro", "contact_organization_acronym": "IFBA", "contact_organization_name": "Instituto Federal da Bahia", "contact_state_uf": "BA", "contact_subarea_name": "Ciência da Computação", "contact_title_name": "Professor EBTT", "id": 1}]

  // [{"contact_area_name": "Ciências Exatas e da Terra", "contact_city_name": "Eunápolis", "contact_name": "João", "contact_organization_acronym": "IFBA", "contact_organization_name": "Instituto Federal da Bahia", "contact_state_uf": "BA", "contact_subarea_name": "Ciência da Computação", "contact_title_name": "Professor EBTT", "id": 3}]


export default CardNews;
