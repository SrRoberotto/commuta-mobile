import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert
} from "react-native";
import { Avatar, Provider, Button, Portal, Divider } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";

import { Entypo } from "@expo/vector-icons";
import CustomInput from "../../components/CustomInput";
import { AntDesign } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import styles from "./styles";
import PlanoAnualModal from "../../components/PlanoAnualModal";

import UserServices from "../../services/user.services";
import DataServices from "../../services/data.services";
import { useAuthContext } from "../../context/AuthContext";

function ProfileScreen({ navigation }) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [visible, setVisible] = React.useState(false)
  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const [userData, setUserData] = useState([]);
  // const [organizationName, setOrganizationName] = useState();
  // const [cityName, setCityName] = useState();
  // const {authToken, setAuthToken } = useAuthContext(); 

  async function fetchMe() {
    try {
      const response = await UserServices.getMe()
        .then(response => {
          //var count = response.data.length;
          //console.log ("Resposta do GetMe: ",response.data)

          setUserData(response.data);
          console.log ("User Data: ",userData)
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

  useEffect(() => { fetchMe(); }, [userData.length < 1]);

  return (
    <ScrollView style={styles.container}>
      <PlanoAnualModal visible={visible} setVisible={setVisible}></PlanoAnualModal>
      <Provider>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 20,
          }}
        >
          <View>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <MaterialIcons name="arrow-back-ios" size={20} color="#4B3EFF" />
            </TouchableOpacity>
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Avatar.Image
              size={160}
              source={require("../../assets/avatar.png")}
            />
            <Text style={[styles.titulo, { marginTop: 10 }]}>
              {userData.first_name} {userData.last_name}
            </Text>
            <TouchableOpacity style={styles.button} onPress={()=> setVisible(true)}>
              <Text style={styles.labelbutton}>Seja Premium</Text>
              <Entypo name="star" size={18} color="white" />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={openMenu} style={{ paddingLeft: 20 }}>
              <MaterialIcons name="more-vert" size={20} color="#4B3EFF" />
            </TouchableOpacity>
          </View>
        </View>
        <CustomInput label="Email:" value={userData.email} />
        <CustomInput label="Telefone:" value={userData.phone} />
        <CustomInput
          label="Profissão:"
          value="Professor (Matemática - Estatística)"
        />
        <CustomInput
          onChangeText={()=>{return true}}
          label="Órgão Institucional:"

          value={userData.organization_name}
        />
        <CustomInput label="Local:" value={`${userData.city_title} (${userData.state_letter})`} />
        <Portal>
          {menuVisible && (
            <View style={styles.menu}>
              <View style={{ alignItems: "flex-end", paddingVertical: 10 }}>
                <TouchableOpacity
                  onPress={closeMenu}
                  style={{ paddingRight: 10 }}
                >
                  <AntDesign name="close" size={20} color="#4B3EFF" />
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={closeMenu} style={styles.buttonMenu}>
                <MaterialIcons name="logout" size={18} color="black" />
                <Text style={[styles.titulo, styles.labelMenu]}>
                  Código Convite
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={closeMenu} style={styles.buttonMenu}>
                <MaterialIcons name="logout" size={18} color="black" />
                <Text style={[styles.titulo, styles.labelMenu]}>Sair</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={closeMenu} style={styles.buttonMenu}>
                <MaterialIcons name="help" size={20} color="black" />
                <Text style={[styles.titulo, styles.labelMenu]}>Ajuda</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={closeMenu} style={styles.buttonMenu}>
                <Foundation name="trash" size={24} color="black" />
                <Text style={[styles.titulo, styles.labelMenu]}>
                  Excluir conta
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Portal>
        <TouchableOpacity
          style={[styles.button, styles.outline]}
          onPress={null}
        >
          <Text style={[styles.labelbutton, { color: "#4B3EFF" }]}>
            Editar Informações
          </Text>
          <MaterialIcons name="edit" size={24} color="#4B3EFF" />
        </TouchableOpacity>
      </Provider>
    </ScrollView>
  );
}


export default ProfileScreen;
