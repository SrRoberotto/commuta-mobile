import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import styles from "./styles";
import CardHeader from "../../components/CardHeader";
import { AntDesign } from '@expo/vector-icons'; 
import PlanoAnualModal from "../../components/PlanoAnualModal";

function Configuracao({ navigation }) {
  const [visible, setVisible] = React.useState(false)
  return (
    <View style={styles.container}>
      <PlanoAnualModal visible={visible} setVisible={setVisible}></PlanoAnualModal>
      <CardHeader />
      <View style={{paddingHorizontal:24}}>
        <Text style={[styles.titulo, { marginTop: 10 }]}>
          Estados:
        </Text>
        <View
          style={{
            flexDirection: "row",
            marginBottom: 10,
            gap: 8,
            flexWrap: "wrap",
          }}
        >
          <View style={[styles.chip]} >
            <Text style={styles.smalLabel}>Acre (AC)</Text>
          </View>
          <View style={[styles.chip]} >
            <Text style={styles.smalLabel}>Bahia (BA)</Text>
          </View>
        </View>
        <Text style={[styles.titulo, { marginTop: 10 }]}>
        Cidades:
        </Text>
        <View
          style={{
            flexDirection: "row",
            marginBottom: 10,
            gap: 8,
            flexWrap: "wrap",
          }}
        >
          <View style={[styles.chip]} >
            <Text style={styles.smalLabel}>Rio Branco (AC)</Text>
          </View>
          <View style={[styles.chip]} >
            <Text style={styles.smalLabel}>Salvador (BA)</Text>
          </View>
        </View>
        <Text style={[styles.titulo, { marginTop: 10 }]}>
        Órgão Institucional:
        </Text>
        <View
          style={{
            flexDirection: "row",
            marginBottom: 10,
            gap: 8,
            flexWrap: "wrap",
          }}
        >
          <View style={[styles.chip]} >
            <Text style={styles.smalLabel}>Instituto Federal de Educação Ciência e Tecnologia</Text>
          </View>
        </View>
        
      </View> 
      <TouchableOpacity style={styles.button} onPress={()=>setVisible(true)}>
            <AntDesign name="plus" size={20} color="white" />
            <Text style={styles.labelbutton}>Adicionar Interesse</Text>
         </TouchableOpacity>
    </View>
  );
}



export default Configuracao;
