import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Keyboard, ScrollView } from "react-native";
import { List, ProgressBar } from "react-native-paper";
import { useForm } from "react-hook-form";
import { useFormContext } from "../../../context/FormContext";
import Input from "../../../components/Input";
import AccordionItem from "../../../components/AccordionItem";

import DataServices from "../../../services/data.services";
import styles from "./styles";

//const STATIC_VARS = require('../../../utils/static');


function Etapa2({ navigation }) {
  let contador = 0;
  const [expandedArea, setExpandedArea] = useState(false);
  const [expandedSubArea, setExpandedSubArea] = useState(false);
  const [expandedState, setExpandedState] = useState(false);
  const [expandedCargo, setExpandedCargo] = useState(false);
  const [expandedCity, setExpandedCity] = useState(false);
  const [expandedOrganization, setExpandedOrganization] = useState(false);

  const [selectedItemArea, setSelectedItemArea] = useState(null);
  const [selectedItemSubArea, setSelectedItemSubArea] = useState(null);
  const [selectedItemState, setSelectedItemState] = useState(null);
  const [selectedItemCargo, setSelectedItemCargo] = useState(null);
  const [selectedItemCity, setSelectedItemCity] = useState(null);
  const [selectedItemOrganization, setSelectedItemOrganization] = useState(null);

  const [stateValue, setStateValue] = useState(null);
  const [areaValue, setAreaValue] = useState(null);
  const [cargoValue, setCargoValue] = useState(null);
  const [subAreaValue, setSubAreaValue] = useState(null);
  const [subAreasList, setSubAreasList] = useState([]);
  const [organizationValue, setOrganizationValue] = useState(null);

  const [loading, setLoading] = useState(false);
  const [cargoDropDown, setCargoDropDown] = useState([]);
  const [areaDropDown, setAreaDropDown] = useState([]);
  const [subAreaDropDown, setSubAreaDropDown] = useState([]);
  const [organizationDropDown, setOrganizationDropDown] = useState([]);
  const [estadosDropDown, setEstadosDropDown] = useState([]);
  const { formData, updateFormData } = useFormContext();

  //const arrayEstados = STATIC_VARS.ESTADOS; //Carrega a lista de estados


  const handleArea = (item) => {
    setSelectedItemArea(item.area_name);
    setAreaValue(item.area_id);
    setExpandedArea(false);
  };

  const handleSubArea = (item) => {
    setSelectedItemSubArea(item.subarea_name);
    setSubAreaValue(item.subarea_id);
    setExpandedSubArea(false);
  };

  const handleState = (item) => {
    setSelectedItemState(item.uf);
    setStateValue(item.state_id);
    setExpandedState(false);
  };

  const handleCargo = (item) => {
    setSelectedItemCargo(item.title_name);
    setCargoValue(item.title_id);
    setExpandedCargo(false);
  };

  const handleOrganization = (item) => {
    setSelectedItemOrganization(item.organization_name);
    setOrganizationValue(item.organization_id);
    setExpandedOrganization(false);
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ cargo, orgao, cidade }) => {
    if (selectedItemArea !== null && selectedItemSubArea !== null && selectedItemState !== null) {
      const data = {
        cargo,
        area_name: selectedItemArea,
        area_id: areaValue,
        subArea_name: selectedItemSubArea,
        subarea_id: subAreaValue,
        state_name: selectedItemState,
        state_id: stateValue,
        orgao,
        cidade
      };

      try {
        Keyboard.dismiss();
        setLoading(true);

        updateFormData(data);
        console.log("Form Data atualizado: \n",formData)
        navigation.navigate("Etapa3");

      } catch (e) {
        setLoading(false);
        // ShowAlert("Erro", e.message);
      }
    }

  };

  async function fetchAreas() {
    try {
      setLoading(true)

      const response = await DataServices.getAreas()
        .then(response => {
          var count = response.data.length;
          let arrayAreas = [];

          for (var i = 0; i < count; i++) {
            arrayAreas.push(
              response.data[i]
            );
          }
          //console.log ("Array Areas: ", arrayAreas)

          setAreaDropDown(arrayAreas);
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

  async function fetchCargos() {
    try {
      setLoading(true)

      const response = await DataServices.getCargos()
        .then(response => {
          var count = response.data.length;
          let arrayCargos = [];

          for (var i = 0; i < count; i++) {
            arrayCargos.push(
              response.data[i]
            );
          }
          console.log ("Array Cargos: ", arrayCargos)

          setCargoDropDown(arrayCargos);
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

  async function fetchSubAreas() {
    try {
      setLoading(true)

      const response = await DataServices.getSubAreas()
        .then(response => {
          var count = response.data.length;
          let arraySubAreas = [];

          for (var i = 0; i < count; i++) {
            arraySubAreas.push(
              response.data[i]
            );
          }
          //console.log ("Array Areas: ", arrayAreas)

          setSubAreasList(arraySubAreas);
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

  async function fetchOrganizations() {
    try {
      setLoading(true)

      const response = await DataServices.getOrganizations()
        .then(response => {
          var count = response.data.length;
          let arrayOrganizations = [];

          for (var i = 0; i < count; i++) {
            arrayOrganizations.push(
              response.data[i]
            );
          }
          console.log ("Array Organizations: ", arrayOrganizations)

          setOrganizationDropDown(arrayOrganizations);
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


  async function fetchStates() {
    try {
      setLoading(true)

      const response = await DataServices.getStates()
        .then(response => {
          var count = response.data.length;
          let arrayEstados = [];

          for (var i = 0; i < count; i++) {
            arrayEstados.push(
              response.data[i]
            );
          }
          setEstadosDropDown(arrayEstados);
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


  useEffect(() => { fetchAreas(); }, []);
  useEffect(() => { fetchStates(); }, []);
  useEffect(() => { fetchCargos(); }, []);
  useEffect(() => { fetchOrganizations(); }, []);
  useEffect(() => { fetchSubAreas(); setSubAreaDropDown(subAreasList); }, [subAreasList.length < 1]);
  useEffect(() => { setSubAreaDropDown(subAreasList.filter((v, i) => v.area_id == areaValue)); }, [areaValue]);

  //useEffect(() => {console.log("Area: ",selectedItemArea," - SubArea: ",selectedItemSubArea);},[selectedItemArea,selectedItemSubArea]);
  return (
  <View style={styles.container}>
    <View>
      <View style={styles.navbar}>
        <Text style={styles.titulo}>Cadastro</Text>
      </View>
      <ProgressBar progress={0.5} color={"#4B3EFF"} />
      <View style={{ paddingTop: 16, gap: 16 }}>
        <Text style={[styles.titulo, { textAlign: "left" }]}>
          Situação atual
        </Text>
        <Text style={styles.label}>
          Prazer conhecer você. Agora nos conte sobre o seu trabalho atual.
        </Text>
      </View>

      {/* <Input
        placeholderName="Cargo"
        name="cargo"
        control={control}
        rules={{
          required: "Verifique se todos os campos estão preenchidos",
        }}
      />
      {errors.cargo && <Text style={styles.error}>Esse campo é obrigatório</Text>} */}

      <AccordionItem
        control={control}
        expanded={expandedCargo}
        onPress={() => setExpandedCargo(!expandedCargo)}
        title={selectedItemCargo || "Cargo"}
        setSelectedItem={setSelectedItemCargo}
        id="4"
      >
        <ScrollView>
          {cargoDropDown.length > 0 ?
            cargoDropDown.map((item) => {
              //console.log(item)
              return (
                <List.Item title={item.title_name} onPress={() => handleCargo(item)} />
              )
            }) : (
              <List.Item title="Carregando cargos..." />
            )}
        </ScrollView>
      </AccordionItem>

      <AccordionItem
        control={control}
        expanded={expandedArea}
        onPress={() => setExpandedArea(!expandedArea)}
        title={selectedItemArea || "Área"}
        setSelectedItem={setSelectedItemArea}
        id="1"
      >
        <ScrollView>
          {areaDropDown.length > 0 ?
            areaDropDown.map((item) => {
              //console.log(item)
              return (
                <List.Item title={item.area_name} onPress={() => handleArea(item)} />
              )
            }) : (
              <List.Item title="Carregando áreas..." />
            )}
        </ScrollView>
      </AccordionItem>

      <AccordionItem
        expanded={expandedSubArea}
        onPress={() => setExpandedSubArea(!expandedSubArea)}
        title={selectedItemSubArea || "Sub-área (Opcional)"}
        id="2"
        setSelectedItem={setSelectedItemSubArea}
        control={control}// Passa a função setSelectedItem para o AccordionItem
      >
        <ScrollView>
          {subAreaDropDown.length > 0 ?
            subAreaDropDown.map((item) => {
              //console.log(item)
              return (
                <List.Item title={item.subarea_name} onPress={() => handleSubArea(item)} />
              )
            }) : (
              <List.Item title="Carregando Subáreas..." />
            )}
        </ScrollView>
      </AccordionItem>

      <View style={{ flexDirection: "row", justifyContent: 'space-between', alignItems: "center" }}>

        <View style={{ alignItems: "center", height: 55, zIndex: 10 }}>
          <AccordionItem
            control={control}
            expanded={expandedState}
            onPress={() => {
              setExpandedState(!expandedState)
            }}
            setSelectedItem={setSelectedItemState}
            id="3"
            title={selectedItemState || "UF"}
            style={styles.accordion}
          >
            <View style={styles.viewEstados}>
              {estadosDropDown.map((estado) => {
                return (
                  <List.Item title={estado.state_name} onPress={() => handleState(estado)} />
                )
              }
              )}
            </View>
          </AccordionItem>
        </View>


        <View style={styles.viewCidade}>
          <Input
            placeholderName={"Cidade"}
            name={"cidade"}
            control={control}
            rules={{
              required: "Verifique se todos os campos estão preenchidos",
            }}
          />
          {errors.cidade && <Text style={styles.error}>Esse campo é obrigatório</Text>}
        </View>
      </View>

      <AccordionItem
        control={control}
        expanded={expandedOrganization}
        onPress={() => setExpandedOrganization(!expandedOrganization)}
        title={selectedItemOrganization || "Órgão Público"}
        setSelectedItem={setSelectedItemOrganization}
        id="5"
      >
        <ScrollView>
          {organizationDropDown.length > 0 ?
            organizationDropDown.map((item) => {
              //console.log(item)
              return (
                <List.Item title={item.organization_name} onPress={() => handleOrganization(item)} />
              )
            }) : (
              <List.Item title="Carregando órgãos..." />
            )}
        </ScrollView>
      </AccordionItem>
    </View>
    {errors.orgao && <Text style={styles.error}>Esse campo é obrigatório</Text>}
    <View style={{ justifyContent: "space-between", alignItems: "center", flexDirection: "row", paddingHorizontal: 10 }}>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "white" }]}
        onPress={() => navigation.navigate("Cadastro")}
      >
        <Text style={[styles.labelButton, { color: "#4B3EFF" }]}>Anterior</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Etapa3")} 
      >
        <Text style={styles.labelButton} onPress={handleSubmit(onSubmit)} >Próximo</Text>
      </TouchableOpacity>
    </View>
  </View>
  ); //<View style={{ flex: 1, justifyContent: "flex-end", paddingBottom: 15 }}>
}

export default Etapa2;
