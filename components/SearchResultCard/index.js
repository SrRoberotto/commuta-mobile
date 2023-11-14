import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  useWindowDimensions,
  Animated,
  PanResponder,
} from "react-native";
import { Text, Avatar, Card } from "react-native-paper";
import { List } from "react-native-paper";
import { EvilIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import styles from "./styles";

function SearchResultCard({ data, item, removeCard, onSwipe }) {
  //console.log(data)
  const window = useWindowDimensions();
  const [cardDismissed, setCardDismissed] = useState(false);
  const [ignoredCards, setIgnoredCards] = useState([]);
  const [likedCards, setLikedCards] = useState([]);

  const xPosition = React.useRef(new Animated.Value(0)).current;
  let cardOpacity = React.useRef(new Animated.Value(1)).current;
  let rotateCard = xPosition.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: ["-20deg", "0deg", "20deg"],
  });

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        xPosition.setValue(gestureState.dx);
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (
          gestureState.dx < window.width - 150 &&
          gestureState.dx > -window.width + 150
        ) {
          onSwipe("--");
          Animated.spring(xPosition, {
            toValue: 0,
            speed: 5,
            bounciness: 10,
            useNativeDriver: false,
          }).start();
        } else if (gestureState.dx > window.width - 150) {
          Animated.parallel([
            Animated.timing(xPosition, {
              toValue: window.width,
              duration: 200,
              useNativeDriver: false,
            }),
            Animated.timing(cardOpacity, {
              toValue: 0,
              duration: 200,
              useNativeDriver: false,
            }),
          ]).start(() => {
            onSwipe("Direita",data);
            removeCard();
          });
        } else if (gestureState.dx < -window.width + 150) {
          Animated.parallel([
            Animated.timing(xPosition, {
              toValue: -window.width,
              duration: 200,
              useNativeDriver: false,
            }),
            Animated.timing(cardOpacity, {
              toValue: 0,
              duration: 200,
              useNativeDriver: false,
            }),
          ]).start(() => {
            onSwipe("Esquerda",data);
            removeCard();
          });
        }
      },
    })
  ).current;

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        styles.card,
        { transform: [{ translateX: xPosition }, { rotate: rotateCard }] },
      ]}
    >
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Avatar.Image size={100} source={require("../../assets/avatar3.png")} />
        <Text style={styles.titulo}>{data.title_name} ({data.subarea_name})</Text>
      </View>

      <View style={styles.containerRow}>
        <MaterialIcons name="apartment" size={16} color="#333333" />
        <Text style={styles.label}>
          {data.organization_name}
        </Text>
      </View>
      <View style={styles.containerRow}>
        <MaterialIcons name="star" size={16} color="#333333" />
        <Text style={styles.label}>Deseja: user.city_name (user.state_uf)</Text>
      </View>
      <View style={styles.containerRow}>
        <MaterialIcons name="place" size={16} color="#333333" />
        <Text style={styles.label}>Oferece: {data.city_name} ({data.state_uf})</Text>
      </View>
      <View
        style={[styles.containerRow, { gap: 30, justifyContent: "center" }]}
      >
        <TouchableOpacity
          style={[styles.button, styles.outline]}
          onPress={() => {
            setCardDismissed(true);
            setIgnoredCards([...ignoredCards, item]);
            Animated.timing(xPosition, {
              toValue: -window.width,
              duration: 200,
              useNativeDriver: false,
            }).start(() => {
              onSwipe("Esquerda",data);
              removeCard();
            });
          }}
        >
         <MaterialIcons name="thumb-down" size={20} color="#333333" />
          <Text style={[styles.labelbutton, { color: "#333333" }]}>
            Ignorar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setCardDismissed(true);
            setLikedCards([...likedCards, item]);
            Animated.timing(xPosition, {
              toValue: window.width,
              duration: 200,
              useNativeDriver: false,
            }).start(() => {
              onSwipe("Direita",data);
              removeCard();
            });
          }}
        >
          <Text style={styles.labelbutton}>Gostei</Text>
          <AntDesign name="like1" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}



export default SearchResultCard;
