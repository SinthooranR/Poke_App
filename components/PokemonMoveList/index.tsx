import React, { FC } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { IMove, IPokemonDetailsNavigationProp } from "../../interfaces";
import PokemonMove from "../PokemonMove/Index";

interface PokemonMovesProps {
  moves?: IMove[];
  navigation: IPokemonDetailsNavigationProp;
}

const PokemonMoveList: FC<PokemonMovesProps> = ({ moves, navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Moves</Text>
      {moves &&
        moves.map((move, index) => (
          <PokemonMove
            key={index}
            moveName={move.move.name}
            navigation={navigation}
          />
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  moveContainer: {
    marginBottom: 12,
  },
  moveName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  attackImage: {
    width: 50,
    height: 50,
    marginBottom: 8,
  },
});

export default PokemonMoveList;
