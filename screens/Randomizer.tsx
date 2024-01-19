import React, { FC, useEffect, useState } from "react";
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
import { IRandomizerScreenProps } from "../interfaces";
import PokemonImage from "../components/PokemonImage";
import { SvgXml } from "react-native-svg";
import Pokeball from "../components/Icons/Pokeball";

interface IPokemon {
  name: string;
  url: string;
}

const Randomizer: FC<IRandomizerScreenProps> = ({ navigation }) => {
  const [pokemons, setPokemons] = useState<IPokemon[]>([]);
  const [randomPokemon, setRandomPokemon] = useState<IPokemon[]>([]);
  const [showResults, setShowResults] = useState(false);

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
    setShowResults(false);
  }, []);

  const navigateToDetails = (name: string) => {
    navigation.navigate("PokemonDetails", { param: name });
  };

  const getRandomPokemons = () => {
    const shuffledPokemons = [...pokemons].sort(() => Math.random() - 0.5);
    const randomPokemons = shuffledPokemons.slice(0, 9);
    setRandomPokemon(randomPokemons);
    setShowResults(true);
  };

  const pokemonView: ListRenderItem<IPokemon> = ({ item }) => {
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
    <>
      {!showResults ? (
        <View style={styles.openContainer}>
          <TouchableOpacity onPress={getRandomPokemons}>
            <Pokeball />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={styles.title}>Results</Text>

          <FlatList
            data={randomPokemon}
            keyExtractor={(item) => item.name}
            renderItem={pokemonView}
            numColumns={3}
            contentContainerStyle={styles.flatListContainer}
          />

          <TouchableOpacity
            style={styles.tryAgainButton}
            onPress={() => setShowResults(false)}
          >
            <Text style={styles.tryAgainButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
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
  pokemonText: {
    textTransform: "capitalize",
  },
  pokeballImage: {
    height: 150,
    width: 150,
  },
  openContainer: {
    backgroundColor: "#fff",
    justifyContent: "center",
    width: "100%",
  },
  tryAgainButton: {
    backgroundColor: "#ED1C24",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 20,
    alignSelf: "center",
  },
  tryAgainButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Randomizer;
