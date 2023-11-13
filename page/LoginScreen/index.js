import React, { useState } from "react";
import { ScrollView, View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import { useForm } from "react-hook-form";
import styles from "./styles";
import { Keyboard, Alert } from "react-native";

import Input from "../../components/Input";
//import { useAuth } from '../../hooks/auth';

import AuthServices from "../../services/auth.services";
import { useAuthContext } from "../../context/AuthContext";


function LoginScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { authData, updateAuthData} = useAuthContext(); 

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  //const areasDS = DataService.getAreas()
  //const subareasDS = DataService.getSubAreas()
  //Alert.alert (areasDS);
  //console.log (areasDS);

  const onSubmit = async ({ email, senha }) => {
    const data = {
      email, "password":senha, "device_name":"celular"
    };
    try {
      Keyboard.dismiss();
      setLoading(true);

      const response = await AuthServices.signIn(data)
        .then(response => {
          
          //verificar se foi aceito e redirecionar à página de confirmação
          
          const { token } = response.data;
          //const type = response.headers["content-type"];
          
          //console.log("Dados:\n",response)

          setLoading(false)
          //setAuthToken(token);
          AuthServices.storeToken(token)

          //console.log("Token:\n", authToken, "\nType: ", type)
          navigation.navigate("Home")
        })
        .catch(error => {
          if (error.response) {
            console.log("Erro retornado: ", error.response.status);
            console.log("Dados do erro:\n",error.response.data);
            console.log("error:\n",error)
            
            
            Alert.alert('Erro no Login',
              "Ocorreu um erro durante o login.\n\n"+
              `Código de erro: ${error.response.status}\n`+
              `Mensagem de erro: ${error.response.data.message}`);
              console.log(error.response.headers);
          }
        });

      // Alert.alert("Data", data.email);
      // // ShowAlert("Data", data.email);
      // console.log ("------------")
      // console.log ("Tudo certo 1")
      // const { signIn } = useAuth();

      // // const formRef = useRef<FormHandles>(null);
      // const handleSignIn = useCallback(async(data) => {
        
      //   await signIn({
      //     email: data.email,
      //     password: data.senha,
      //   });

      // },[signIn]);


      // console.log ("Tudo certo 3")
      //console.log(handleSignIn);
      //console.log(signIn);
      
      //  Alert.alert("Login", "Login feito");
      //navigation.navigate("Home")
    } catch (e) {
      setLoading(false);
      //ShowAlert("Erro", e.message);
    }
  };
  


  return (
    <ScrollView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require("../../assets/logo.png")} style={styles.logo} />
      </View>
      <Text style={styles.title}>Boas Vindas!</Text>
      <Text style={styles.description}>
        Com o Commuta, fazer permuta nunca foi tão fácil!
      </Text>

      <Input 
        placeholderName="Email"
        iconLeft={<TextInput.Icon icon="email" color={"#333"} />}
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
        placeholderName="Senha"
        iconLeft={<TextInput.Icon icon="lock" color={"#333"} />}
        iconRight={
          <TextInput.Icon
            icon={isPasswordVisible ? "eye-off" : "eye"}
            color={"#4B3EFF"}
            onPress={() => setIsPasswordVisible((prev) => !prev)}
          />
        }
        name="senha"
        control={control}
        secureTextEntry={!isPasswordVisible}
        rules={{
          required: "Verifique se todos os campos estão preenchidos",
        }}
      />
      {errors.senha && <Text style={styles.error}>Esse campo é obrigatório</Text>}
      <Text style={[styles.description, styles.link]}>Esqueci minha senha</Text>

      <TouchableOpacity
        style={[styles.button, styles.primaryButton]}
        onPress={handleSubmit(onSubmit)} 
      >
        <Text style={[styles.buttonText]}>Entrar</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>ou</Text>

      <TouchableOpacity
        style={[styles.button, styles.secondaryButton]}
        onPress={() => navigation.navigate("Cadastro")}
      >
        <Text style={[styles.buttonText, styles.secondaryButtonText]}>
          Cadastre-se
        </Text>
      </TouchableOpacity>
    </ScrollView>

  );
}

export default LoginScreen;
