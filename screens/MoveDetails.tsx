import { StatusBar } from "expo-status-bar";
import { FC, useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ListRenderItem,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getImageByPokemonName, getTypeColor } from "../helpers/constants";
import { IMoveData, IMoveDetailsProps } from "../interfaces";
import { getMoveDataByName } from "../helpers/getMoveData";
import PokemonImage from "../components/PokemonImage";

interface IPokemon {
  name: string;
  url: string;
}

const MoveDetails: FC<IMoveDetailsProps> = ({ route, navigation }) => {
  //returns an ID for pokemon
  const { param } = route.params;
  const [move, setMove] = useState<IMoveData>();

  const navigateToDetails = (name: string) => {
    navigation.navigate("PokemonDetails", { param: name });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const moveData = await getMoveDataByName(param);
        setMove(moveData);

        const dynamicHeaderColor = getTypeColor(moveData.type.name);
        navigation.setOptions({
          headerStyle: {
            backgroundColor: dynamicHeaderColor,
          },
        });
      } catch (error) {
        console.error("Error fetching Move Data:", error);
      }
    };

    fetchData();
  }, [param, navigation]);

  const pokemonView: ListRenderItem<IPokemon> = ({ item }) => {
    // const id = item.url.split("/").slice(-2, -1)[0];
    return (
      <TouchableOpacity onPress={() => navigateToDetails(item.name)}>
        <View style={styles.pokemonContainer}>
          <PokemonImage name={item?.name} />
          <Text style={styles.pokemonText}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{move?.name}</Text>

      {move && move?.learned_by_pokemon.length > 0 && (
        <FlatList
          data={move?.learned_by_pokemon.filter(
            (item: any) => !item.name.includes("gmax")
          )}
          keyExtractor={(item) => item.name}
          renderItem={pokemonView}
          numColumns={3}
          contentContainerStyle={styles.flatListContainer}
          bounces={false}
        />
      )}
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 18,
  },
  title: {
    textTransform: "capitalize",
    fontSize: 24,
    marginVertical: 12,
  },
  pokemonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
    marginHorizontal: 5,
  },
  flatListContainer: {
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  pokemonImage: {
    width: 100,
    height: 100,
  },
  pokemonText: {
    textTransform: "capitalize",
  },
});

export default MoveDetails;
