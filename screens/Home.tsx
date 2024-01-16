import { StatusBar } from "expo-status-bar";
import { FC, useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getAllPokemon } from "../helpers/getAllPokemon";
import { IHomeScreenProps } from "../interfaces";

interface IPokemon {
  name: string;
  url: string;
}

const Home: FC<IHomeScreenProps> = ({ navigation }) => {
  const [pokemons, setPokemons] = useState<IPokemon[]>([]);

  const navigateToDetails = (id: string) => {
    navigation.navigate("PokemonDetails", { param: id });
  };

  const pokemonView: ListRenderItem<IPokemon> = ({ item }) => {
    const id = item.url.split("/").slice(-2, -1)[0];
    return (
      <TouchableOpacity onPress={() => navigateToDetails(id)}>
        <View style={styles.pokemonContainer}>
          <Image
            source={{
              uri: `https://img.pokemondb.net/artwork/large/${item.name}.jpg`,
            }}
            resizeMode="contain"
            style={styles.pokemonImage}
          />
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
    flex: 1,
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
