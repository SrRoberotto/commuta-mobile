import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity , Keyboard} from "react-native";
import { List, ProgressBar, TextInput } from "react-native-paper";
import Input from "../../../components/Input";
import { AntDesign } from "@expo/vector-icons";
import styles from "./styles";
import { useForm } from "react-hook-form";
import AccordionItem from "../../../components/AccordionItem";
import { useFormContext } from "../../../context/FormContext";
import DataService from "../../../services/data.services";

const Etapa3 = ({ navigation }) => {
  const [estadoSelecionado, setEstadoSelecionado] = useState("");
  const [colecaoEstados, setColecaoEstados] = useState([]);
  const [cidadeSelecionada, setCidadeSelecionada] = useState("");
  const [colecaoCidades, setColecaoCidades] = useState([]);
  const [expandedOrgao, setExpandedOrgao] = useState(false);
  const [selectedItemOrgao, setSelectedItemOrgao] = useState(null);
  const [organizationValue, setOrganizationValue] = useState(null);
  const { formData, updateFormData } = useFormContext(); 
  const [loading, setLoading] = useState(false);
  const [error, setErro] = useState(false)

  const [organizationsDropDown, setOrganizationsDropDown] = useState([]);

  const handleOrganizations = (item) => {
    setSelectedItemOrgao(item.organization_name)
    setOrganizationValue(item.organization_id)
    setExpandedOrgao(false);
  };

  const handleChangeEstado = (text) => {
    setEstadoSelecionado(text);
  };

  const handleChangeCidade = (text) => {
    setCidadeSelecionada(text);
  };

  const handleRemoverItem = (item, colecao, setColecao) => {
    const novaColecao = colecao.filter((elemento) => elemento !== item);
    setColecao(novaColecao);
  };

  const handleChangeColecaoEstado = () => {
    if (estadoSelecionado.length>0){
      setColecaoEstados([...colecaoEstados, estadoSelecionado]);
      setEstadoSelecionado("");
    }
  };

  const handleChangeColecaoCidade = () => {
    if (cidadeSelecionada.length>0){
      setColecaoCidades([...colecaoCidades, cidadeSelecionada]);
      setCidadeSelecionada("");
    }
  };
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
 
  const onSubmit = () => {

    if (colecaoEstados.length > 0 && colecaoCidades.length > 0 && selectedItemOrgao!== null){
      const data = {
        colecaoEstados,
        colecaoCidades,
        orgao:selectedItemOrgao,
      };
      try{
        setErro(false)
        setLoading(true);
        updateFormData(data);
        navigation.navigate("Etapa4");
      }
      catch{
        console.log("erro")
      }
      
    }else {
      setErro(true)
    }
   
  };


  async function fetchOrganizations  () {
    try {
      setLoading(true)

      const response = await DataService.getOrganizations()
        .then(response => {
          var count = response.data.length;
          let arrayOrganizations = [];

          for (var i = 0; i < count; i++) {
            arrayOrganizations.push(
              response.data[i]
            );
          }
          //console.log ("Array Areas: ", arrayAreas)

          setOrganizationsDropDown(arrayOrganizations);
          setLoading(false)
        })
        .catch(error => {
          console.log(error);
        });
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchOrganizations(); }, []);

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <Text style={styles.titulo}>Cadastro</Text>
      </View>
      <ProgressBar progress={0.75} color={"#4B3EFF"} />
      <View style={{ paddingTop: 16, gap: 16 }}>
        <Text style={[styles.titulo, { textAlign: "left" }]}>Interesse</Text>
        <Text style={styles.label}>
          Agora nos informe qual seu destino de interesse
        </Text>
      </View>
      {error && <Text style={styles.error}>Verifique se todos os campo estão preenchidos</Text>}
      <Input
        name="Estado"
        control={control}
        placeholderName={"Estado"}
        valueText={estadoSelecionado}
        onChangeText={handleChangeEstado}
        iconRight={
          <TextInput.Icon
            onPress={() => handleChangeColecaoEstado()}
            icon="plus"
            color={"#4B3EFF"}
          />
        }
      ></Input>
      
      <View
        style={{
          flexDirection: "row",
          marginBottom: 10,
          gap: 8,
          flexWrap: "wrap",
        }}
      >
        {colecaoEstados.length > 0 &&
          colecaoEstados?.map((item, index) => {
            return (
              <View style={[styles.chip]} key={index}>
                <Text style={styles.smalLabel}>{item}</Text>
                <TouchableOpacity
                  onPress={() =>
                    handleRemoverItem(item, colecaoEstados, setColecaoEstados)
                  }
                >
                  <AntDesign name="close" size={15} color="#4B3EFF" />
                </TouchableOpacity>
              </View>
            );
          })}
      </View>
      <Input
          name="Cidade"
          control={control}
        
        valueText={cidadeSelecionada}
        onChangeText={handleChangeCidade}
        placeholderName={"Cidade"}
        iconRight={
          <TextInput.Icon
            icon="plus"
            color={"#4B3EFF"}
            onPress={() => handleChangeColecaoCidade()}
          />
        }
      ></Input>
      <View style={{ flexDirection: "row", marginBottom: 10, gap: 8 }}>
        {colecaoCidades.length > 0  &&
          colecaoCidades?.map((item, index) => {
            return (
              <View style={styles.chip} key={index}>
                <Text style={styles.smalLabel}>{item}</Text>
                <TouchableOpacity
                  onPress={() =>
                    handleRemoverItem(item, colecaoCidades, setColecaoCidades)
                  }
                >
                  <AntDesign name="close" size={15} color="#4B3EFF" />
                </TouchableOpacity>
              </View>
            );
          })}
      </View>

      <AccordionItem
        control={control}
        expanded={expandedOrgao}
        onPress={() => setExpandedOrgao(!expandedOrgao)}
        title={selectedItemOrgao ||"Órgão institucional"}
        setSelectedItem={setSelectedItemOrgao} 
        id="1"
      >


        <View>
          {organizationsDropDown.length > 0 ?
            organizationsDropDown.map((item) => {
              //console.log(item)
              return (
                <List.Item title={item.organization_name} onPress={() => handleOrganizations(item)} />
              )
            }) : (
              <List.Item title="Carregando orgãos..." />
            )}
        </View>
      </AccordionItem>

     
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          paddingBottom: 15,
        }}
      >
        <View
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            paddingHorizontal: 10,
          }}
        >
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "white" }]}
            onPress={() => navigation.navigate("Etapa2")}
          >
            <Text style={[styles.labelButton, { color: "#4B3EFF" }]}>
              Anterior
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button]}
            onPress={()=>onSubmit()} 
          >
            <Text style={[styles.labelButton]}>Proximo</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Etapa3;
