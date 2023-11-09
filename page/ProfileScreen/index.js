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

import UserServices from "../../services/user.services";
import { useAuthContext } from "../../context/AuthContext";

function ProfileScreen({ navigation }) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [userData, setUserData] = useState([]);
  const { authData, updateAuthData } = useAuthContext(); 

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);


  async function fetchMe() {
    try {
      //setLoading(true)

      const response = await UserServices.getMe(authData)
        .then(response => {
          var count = response.data.length;
          //console.log (response)

          //setUserData(arrayAreas);
          setLoading(false)
        })
        .catch(error => {
          console.log(error);
          
          console.log("Erro retornado: ", error.response.status);
          console.log("Dados do erro:\n",error.response.data);

          Alert.alert('Erro na requisição',error.response.status + ": " + error.response.data.message);

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
              Lucas Pereira Santos
            </Text>
            <TouchableOpacity style={styles.button} onPress={null}>
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
        <CustomInput label="Email:" value="lucaspereira@email.com" />
        <CustomInput label="Telefone:" value="(73) 98123-4567" />
        <CustomInput
          label="Profissão:"
          value="Professor (Matemática - Estatística)"
        />
        <CustomInput
          label="Órgão Institucional:"
          value="Instituto Federal de Educação Ciência e Tecnologia"
        />
        <CustomInput label="Local:" value="Eunápolis (BA)" />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCFCFC",
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  titulo: {
    fontFamily: "MontserratMedium",
    fontSize: 16,
    color: "#000000",
    lineHeight: 20,
    padding: 0,
    marginBottom: 17,
  },
  button: {
    flexDirection: "row",
    paddingVertical: 16,
    paddingHorizontal: 25,
    borderRadius: 12,
    gap: 8,
    backgroundColor: "#4B3EFF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  labelbutton: {
    fontSize: 16,
    fontFamily: "MontserratMedium",
    color: "white",
  },
  outline: {
    backgroundColor: "white",
  },
  menu: {
    backgroundColor: "white",
    width: 208,
    position: "absolute",
    top: 0.3,
    right: 5,
    elevation: 4,
    borderRadius: 8,
  },
  buttonMenu: {
    flexDirection: "row",
    justifyContent: "start",
    padding: 10,
    gap: 8,
  },
  labelMenu: {
    fontSize: 14,
    marginBottom: 0,
  },
});

export default ProfileScreen;
