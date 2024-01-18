import React, { FC, useEffect, useState } from "react";
import { IMoveListProps } from "../interfaces";
import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getAllMoves } from "../helpers/getAllMoves";
import PokemonMove from "../components/PokemonMove/Index";
import { StatusBar } from "expo-status-bar";

interface IMove {
  name: string;
  url: string;
}

const AllMoves: FC<IMoveListProps> = ({ navigation }) => {
  const [moves, setMoves] = useState<IMove[]>([]);

  const navigateToDetails = (name: string) => {
    navigation.navigate("PokemonDetails", { param: name });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const movesData = await getAllMoves();
        setMoves(movesData);
      } catch (error) {
        console.error("Error getting Moves list");
      }
    };
    fetchData();
  }, []);

  const moveView: ListRenderItem<IMove> = ({ item }) => {
    return (
      <View style={styles.moveContainer}>
        <PokemonMove moveName={item.name} navigation={navigation} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Moves</Text>

      {moves.length > 0 && (
        <FlatList
          data={moves}
          keyExtractor={(item) => item.name}
          renderItem={moveView}
          contentContainerStyle={styles.flatListContainer}
        />
      )}
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    textTransform: "capitalize",
    fontSize: 24,
    marginVertical: 12,
  },
  moveContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
    marginHorizontal: 5,
  },
  flatListContainer: {
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
});

export default AllMoves;
