import React, { useState,useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Modal,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";

import CardHeader from "../../components/CardHeader";
import { TextInput, List } from "react-native-paper";
import { EvilIcons } from "@expo/vector-icons";
import SearchResultCard from "../../components/SearchResultCard";
import styles from "./styles";

import { Ionicons } from '@expo/vector-icons'; 
import Input from "../../components/Input";
import AccordionItem from "../../components/AccordionItem";
import { useForm } from "react-hook-form";

import ContactServices from "../../services/contact.services";

function SearchScreen() {
  const [noMoreCard, setNoMoreCard] = useState(false);
  const [cardArray, setCardArray] = useState([]);
  const [swipeDirection, setSwipeDirection] = useState("--");
  const [isFocused, setIsFocused] = useState(false);
  const [isModalFilter, setIsModalFilter] = useState(false);
  const [expandedArea, setExpandedArea] = useState(false);
  const [expandedSubArea, setExpandedSubArea] = useState(false);
  const [expandedState, setExpandedState] = useState(false);
  const [selectedItemArea, setSelectedItemArea] = useState(null);
  const [selectedItemSubArea, setSelectedItemSubArea] = useState(null);
  const [selectedItemState, setSelectedItemState] = useState(null);

  const handleItemPress = (item, setSelectedItem,setExpanded) => {
    setSelectedItem(item);
    setExpanded(false);
  };
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const removeCard = (id) => {
    cardArray.splice(
      cardArray.findIndex((item) => item.id == id),
      1
    );
    setCardArray(cardArray);
    if (cardArray.length == 0) {
      setNoMoreCard(true);
    }
  };

  const lastSwipedDirection = (swipeDirection) => {
    console.log(swipeDirection)
    setSwipeDirection(swipeDirection);
  };

  async function fetchOportunities() {
    try {
      const response = await ContactServices.getOportunities()
        .then(response => {
          //var count = response.data.length;
          console.log ("Resposta oportunities: ",response.data)

          setCardArray(response.data);

          //setLoading(false)
        })
        .catch(error => {
          console.log(error);
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
  
  useEffect(() => { fetchOportunities(); }, [cardArray.length < 1]);


  return (
    <View style={styles.container}>
      <CardHeader styleHeader={{ marginHorizontal: 2 }}></CardHeader>
      <TouchableOpacity onPress={() => setIsModalFilter(true)}>
        <TextInput
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          theme={{
            colors: {
              outline: "#808080",
              primary: isFocused ? "#4B3EFF" : "#808080",
              underlineColor: "transparent",
            },
            roundness: 10,
          }}
          placeholderTextColor="#808080"
          style={[styles.input, { pointerEvents: "none" }]}
          mode="outlined"
          placeholder="Qual cargo procura?"
          right={<TextInput.Icon icon="magnify" color={"#4B3EFF"} />}
        />
      </TouchableOpacity>


      <Text style={styles.titulo}>Sugestões</Text>
      <View style={styles.cardContainer}>
        {cardArray.map((item, index) => (
          <SearchResultCard
            data={item}
            currentIndex={index}
            key={index}
            item={item}
            removeCard={() => removeCard(item.id)}
            onSwipe={lastSwipedDirection}
          />
        ))}
        {noMoreCard ? (
         <ActivityIndicator size="large" color="#4B3EFF" />
        ) : null}
      </View>
    </View>
  );
}


export default SearchScreen;
