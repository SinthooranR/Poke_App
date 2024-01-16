import React, { FC, useEffect, useState } from "react";
import { getMoveDataByName } from "../../helpers/getMoveData";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { IMoveData, IPokemonDetailsNavigationProp } from "../../interfaces";

const PokemonMove: FC<{
  moveName: string;
  navigation: IPokemonDetailsNavigationProp;
}> = ({ moveName, navigation }) => {
  const [moveData, setMoveData] = useState<IMoveData>();

  const navigateToDetails = (id: string) => {
    navigation.navigate("MoveDetails", { param: id });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const moveData = await getMoveDataByName(moveName);
        setMoveData(moveData);
      } catch (error) {
        console.error("Error fetching Pokémon:", error);
      }
    };

    fetchData();
  }, [moveName]);

  const damageClassImgUrl =
    moveData?.damage_class.name === "special"
      ? "https://img.pokemondb.net/images/icons/move-special.png"
      : moveData?.damage_class.name === "physical"
      ? "https://img.pokemondb.net/images/icons/move-physical.png"
      : "https://img.pokemondb.net/images/icons/move-status.png";

  return (
    <TouchableOpacity
      onPress={() => navigateToDetails(moveData?.name as string)}
    >
      <View style={styles.container}>
        <Text style={styles.moveName}>{moveData?.name.replace("-", " ")}</Text>

        <Image
          source={{
            uri: damageClassImgUrl,
          }}
          resizeMode="contain"
          style={styles.damageClassImage}
        />
        <View style={styles.detailsContainer}>
          <Text style={styles.typeName}>Type: {moveData?.type.name}</Text>
          <Text>Power: {moveData?.power || "N/A"}</Text>
          <Text>Accuracy: {moveData?.accuracy || "N/A"}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
    padding: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    marginBottom: 10,
  },
  moveName: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10,
    textTransform: "capitalize",
  },
  typeName: {
    textTransform: "capitalize",
  },
  damageClassImage: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
  },
});

export default PokemonMove;
