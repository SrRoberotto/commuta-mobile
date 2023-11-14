import React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Text, Avatar, Card } from "react-native-paper";
import { List } from "react-native-paper";
import { EvilIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "./styles";


function CardContacts({navigation,data}) {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Detalhes do Contato",data);
      }}
      style={styles.card}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Avatar.Image size={48} source={require("../../assets/avatar2.png")} />
      </View>
      <View style={{ width: "80%" }}>
        <Text style={styles.titulo}>{data.contact_name}</Text>
        <Text style={styles.label}>{data.contact_title_name} ({data.contact_subarea_name})</Text>
        <View style={styles.containerRow}>
          <Text style={styles.smalLabel}>{data.contact_city_name} ({data.contact_state_uf})</Text>
          <View style={{ flexDirection: "row" }}>
            <MaterialIcons name="loop" size={16} color="#8178FF" />
            <Text style={styles.smalLabel}>user.city_name (user.state_uf)</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}



export default CardContacts;
