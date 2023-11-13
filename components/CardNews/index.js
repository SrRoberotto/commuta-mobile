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
        <Text style={styles.titulo}>{data.title_name}({data.subarea_name})</Text>
        <View style={styles.containerRow}>
          <Entypo name="star" size={16} color="#8178FF" />
          <Text style={styles.label}>Deseja: {data.interest_city_name} (BA)</Text>
        </View>
        <View style={styles.containerRow}>
          <Entypo name="location-pin" size={16} color="#333333" />
          <Text style={styles.label}>Oferece: Ilhéus (BA)</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Detalhes do Interesse")}
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <MaterialIcons name="keyboard-arrow-right" size={24} color="#4B3EFF" />
      </TouchableOpacity>
    </View>
  );
}



export default CardNews;
