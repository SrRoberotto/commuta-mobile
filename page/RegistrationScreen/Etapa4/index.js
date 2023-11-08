import React ,  {useState} from "react";
import { View, Text, StyleSheet, TouchableOpacity , Keyboard, Alert} from "react-native";
import { ProgressBar } from "react-native-paper";
import Input from "../../../components/Input";
import { TextInput } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import styles from "./styles";
import { useForm } from "react-hook-form";
import { useFormContext } from "../../../context/FormContext";

import UserServices from "../../../services/user.services";

function Etapa4({ navigation }) {
  const { formData, updateFormData } = useFormContext(); 
  const [ loading, setLoading] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ email, senha }) => {
    const data = {
      email,
      senha
    }

    // const teste = {
    //   "area_id": 1,
    //   "area_name": "Ciências Exatas e da Terra", 
    //   "cargo": "Tecnico",
    //   "checkedNumberOne": false,
    //   "checkedNumberTwo": false,
    //   "cidade": "Acrelandia",
    //   "codigo": undefined,
    //   "colecaoCidades": ["EUNAPOLIS"],
    //   "colecaoEstados": ["BA"],
    //   "imagePerfil": null,
    //   "nome": "Roberto",
    //   "orgao": "Instituto Federal da Bahia",
    //   "sobrenome": "Melo",
    //   "state_id": 1,
    //   "state_name": "AC",
    //   "subArea_name": "Matemática",
    //   "subarea_id": 1,
    //   "telefoneOne": undefined,
    //   "telefoneTwo": undefined
    // }
    const userData = {
        "email": email,
        "password": senha,
        "password_confirmation": senha,
        "first_name": formData.nome,
        "last_name": formData.sobrenome,
        "genre": "M", //Falta isse campo
        "phone": formData.telefoneOne,
        "bio": "nice nice nice", //Falta esse campo
        "region_id": 2,  //Falta esse campo
        "state_id": formData.state_id,
        "city_id": 1953, //Falta esse campo
        "area_id": formData.area_id,
        "subarea_id": formData.subarea_id,
        "title_id": 1, //Falta esse campo
        "organization_id": 5
    }

    try {
      Keyboard.dismiss();
      setLoading(true);
      updateFormData(data);
      console.log("Form Data atualizado: \n",formData)
      console.log("UserData: ", userData)
      
      const response = await UserServices.createUser(userData)
        .then(response => {
          
          //verificar se foi aceito e redirecionar à página de confirmação
          console.log("Resposta:\n", response)
          navigation.navigate("ConfirmEmail")
          setLoading(false)
        })
        .catch(error => {
          if (error.response) {
            console.log("Erro retornado: ", error.response.status);
            console.log("Dados do erro:\n",error.response.data);
            
            
            Alert.alert('Erro no cadastro',
              "Ocorreu um erro durante o processamento do seu cadastro.\n\n"+
              `Código de erro: ${error.response.status}\n`+
              `Mensagem de erro: ${error.response.data.message}`);
            console.log(error.response.headers);
          }
        });

      //navigation.navigate("ConfirmEmail")
      

    } catch (e) {
      setLoading(false);
      //ShowAlert("Erro", e.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <Text style={styles.titulo}>Cadastro</Text>
      </View>
      <ProgressBar progress={1} color={"#4B3EFF"} />
      <View style={{ paddingTop: 16, gap: 16 }}>
        <Text style={[styles.titulo, { textAlign: "left" }]}>
          Dados de acesso
        </Text>
        <Text style={styles.label}>
          Estamos quase lá. Agora so falta os seus dados de acesso.
        </Text>
      </View>
      <Input placeholderName={"Email"}
        name="email"
        control={control}
        rules={{
          required: "Verifique se todos os campos estão preenchidos",
          pattern: {
            value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/,
            message: "email inválido",
          },
        }}
      />
      {errors.email && <Text style={styles.error}>Esse campo é obrigatório</Text>}
       <Input
        name="senha"
        control={control}
        secureTextEntry={true}
        rules={{
          required: "Verifique se todos os campos estão preenchidos",
        }}
        placeholderName={"Senha"}
        iconRight={<TextInput.Icon icon="eye" color={"#4B3EFF"} />}
      />
      {errors.senha && <Text style={styles.error}>Esse campo é obrigatório</Text>}    
      <Input
        name="confirmSenha"
        control={control}
        secureTextEntry={true}
        rules={{
          required: "Verifique se todos os campos estão preenchidos",
        }}
        placeholderName={"Repetir senha"}
        iconRight={<TextInput.Icon icon="eye" color={"#4B3EFF"} />}
      />
      {errors.confirmSenha && <Text style={styles.error}>Esse campo é obrigatório</Text>}
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          paddingBottom: 15,
          paddingHorizontal: 5,
        }}
      >
        <View
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            marginBottom: 5,
          }}
        >
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "white" }]}
            onPress={() => navigation.navigate("Etapa3")}
          >
            <Text style={[styles.labelButton, { color: "#4B3EFF" }]}>
              Anterior
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button]}
            onPress={handleSubmit(onSubmit)} 
          >
            <Text style={[styles.labelButton]}>Concluir</Text>

            <AntDesign name="check" size={20} color="white" />
          </TouchableOpacity>
        </View>
        <Text style={styles.smallLabel}>
          {`Ao clicar em “Concluir”, você concorda com os `}
          <Text
            style={{ color: "#4B3EFF" }}
          >{`Termos de Usos, Política de Privacidade e Política de Cookies`}</Text>
          {` do Commuta.`}
        </Text>
      </View>
    </View>
  );
}

export default Etapa4;
