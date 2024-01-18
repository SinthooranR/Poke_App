import { StatusBar } from "expo-status-bar";
import { FC, useEffect, useState } from "react";
import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getAllPokemon } from "../helpers/getAllPokemon";
import { IHomeScreenProps } from "../interfaces";
import PokemonImage from "../components/PokemonImage";

interface IPokemon {
  name: string;
  url: string;
}

const Home: FC<IHomeScreenProps> = ({ navigation }) => {
  const [pokemons, setPokemons] = useState<IPokemon[]>([]);

  const navigateToDetails = (name: string) => {
    navigation.navigate("PokemonDetails", { param: name });
  };

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pokemonData = await getAllPokemon();
        setPokemons(pokemonData);
      } catch (error) {
        console.error("Error getting Pokémon list");
      }
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>National Pokedex</Text>

      {pokemons.length > 0 && (
        <FlatList
          data={pokemons}
          keyExtractor={(item) => item.name}
          renderItem={pokemonView}
          numColumns={3}
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

export default Home;
