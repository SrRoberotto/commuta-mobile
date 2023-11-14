import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import CardHeader from "../../components/CardHeader";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Avatar } from "react-native-paper";
import { Foundation } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import styles from "./styles";

import ContactServices from "../../services/contact.services";

function DetailsScreen({ route }) {
  const isScreenContact = route.name != "Detalhes do Interesse";
  const params = route.params
  console.log(params)

  const handleLike = async (params) => {
    try {
      console.log("Botão de like: \n");

      const response = await ContactServices.acceptContact(params)
      .then(response => {
        //verificar se foi aceito e redirecionar à página de confirmação
        console.log("Resposta:\n", response)
        navigation.navigate("Home")
      })
      .catch(error => {
          if (error.response) {
            console.log("Erro retornado: ", error.response.status);
            console.log("Dados do erro:\n",error.response.data);
            console.log(error.response.headers);
          }
        }
      );
      //navigation.navigate("Etapa3");

    } catch (e) {
      console.log(e)
      // setLoading(false);
      // ShowAlert("Erro", e.message);
    }
  }

  const handleDisike = async (params) => {
    try {
      console.log("Botão de dislike: \n");

      const response = await ContactServices.rejectContact(params)
      .then(response => {
        //verificar se foi aceito e redirecionar à página de confirmação
        console.log("Resposta:\n", response)
        navigation.navigate("Home")
      })
      .catch(error => {
          if (error.response) {
            console.log("Erro retornado: ", error.response.status);
            console.log("Dados do erro:\n",error.response.data);
            console.log(error.response.headers);
          }
        }
      );
    } catch (e) {
      console.log(e)
      // setLoading(false);
      // ShowAlert("Erro", e.message);
    }
  }


  return (
    <ScrollView style={styles.container}>
      <CardHeader />
      {isScreenContact && (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  width: "80%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Avatar.Image
                  size={100}
                  source={require("../../assets/avatar2.png")}
                />
              </View>
              <View style={{ justifyContent: "flex-start" }}>
                <Foundation name="trash" size={24} color="black" />
              </View>
            </View>

            <Text style={[styles.titulo, { marginTop: 10 }]}>
              {params.contact_name}
            </Text>
          </View>
        )
      }

      <View style={{ paddingHorizontal: 16 }}>
        <Text style={styles.titulo}>Trabalho Atual:</Text>
        <View style={styles.containerRow}>
          <Ionicons name="person" size={20} color="#A59EFF" />

          <Text style={styles.label}>
          {params.contact_title_name} ({params.contact_area_name} - {params.contact_subarea_name}) ({params.contact_state_uf})
          </Text>
        </View>
        <View style={styles.containerRow}>
          <MaterialIcons name="apartment" size={20} color="#A59EFF" />
          <Text style={styles.label}>
          {params.contact_organization_name}
          </Text>
        </View>
        <View style={[styles.containerRow]}>
          <MaterialIcons name="place" size={20} color="#A59EFF" />
          <Text style={[styles.label, styles.border]}>
            Oferece: {params.contact_city_name} ({params.contact_state_uf})
          </Text>
        </View>
        <Text style={[styles.titulo, , { marginTop: 16 }]}>
          Deseja Trabalhar em :
        </Text>
        <View style={styles.containerRow}>
          <MaterialIcons name="apartment" size={24} color="#A59EFF" />
          <Text style={styles.label}>
            Instituto Federal de Educação Ciência e Tecnologia
          </Text>
        </View>
        <View style={styles.containerRow}>
          <MaterialIcons name="place" size={20} color="#A59EFF" />
          <Text style={styles.label}>Eunápolis (BA)</Text>
        </View>
        {isScreenContact ? (
            <View
              style={[
                styles.containerRow,
                { gap: 30, flexWrap: "wrap", marginTop: 16 },
              ]}
            >
              {/* <TouchableOpacity style={styles.button} onPress={null}>
                <FontAwesome5 name="whatsapp" size={20} color="white" />
                <Text style={styles.labelbutton}>Whatsapp</Text>
              </TouchableOpacity> */}
              <TouchableOpacity
                style={[styles.button, styles.outline, styles.borderButton]}
                onPress={null}
              >
                <Foundation name="telephone" size={24} color="#4B3EFF" />

                <Text style={[styles.labelbutton, { color: "#4B3EFF" }]}>
                  Telefone
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.outline, styles.borderButton]}
                onPress={null}
              >
                <MaterialIcons name="email" size={24} color="#4B3EFF" />
                <Text style={[styles.labelbutton, { color: "#4B3EFF" }]}>
                  Ignorar
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={[{ marginTop: 30, gap: 20 }]}>
              <TouchableOpacity style={styles.button} onPress={() => handleLike(params)}>
                <Text style={styles.labelbutton}>Gostei</Text>
                <AntDesign name="like1" size={20} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.outline]}
                onPress={() => handleDislike(params)}
              >
                <AntDesign name="dislike1" size={20} color="#333333" />
                <Text style={[styles.labelbutton, { color: "#333333" }]}>
                  Ignorar
                </Text>
              </TouchableOpacity>
            </View>
          )
        }
      </View>
    </ScrollView>
  );
}

export default DetailsScreen;
