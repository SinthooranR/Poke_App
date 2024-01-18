import React, { FC, useEffect, useState } from "react";
import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import { getAllPokemon } from "../helpers/getAllPokemon";
import { IHomeScreenProps } from "../interfaces";
import PokemonImage from "../components/PokemonImage";

interface IPokemon {
  name: string;
  url: string;
}

const Home: FC<IHomeScreenProps> = ({ navigation }) => {
  const [pokemons, setPokemons] = useState<IPokemon[]>([]); // Your initial data
  const [filteredPokemons, setFilteredPokemons] = useState<IPokemon[]>([]); // State for filtered data
  const [viewMode, setViewMode] = useState<"default" | "search">("default");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = () => {
    const filteredData = pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPokemons(filteredData);
    setViewMode("search");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pokemonData = await getAllPokemon();
        setPokemons(pokemonData);
        setFilteredPokemons(pokemonData);
      } catch (error) {
        console.error("Error getting Pokémon list");
      }
    };
    fetchData();
  }, []);

  const navigateToDetails = (name: string) => {
    navigation.navigate("PokemonDetails", { param: name });
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
    <View style={styles.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 10,
        }}
      >
        <TextInput
          style={styles.input}
          placeholder="Search..."
          placeholderTextColor="#666"
          onChangeText={(text) => setSearchQuery(text)}
          onSubmitEditing={handleSearch}
        />
      </View>
      {viewMode === "search" && filteredPokemons.length > 0 && (
        <FlatList
          data={filteredPokemons}
          keyExtractor={(item) => item.name}
          renderItem={pokemonView}
          numColumns={3}
          contentContainerStyle={styles.flatListContainer}
        />
      )}
      {viewMode === "default" && pokemons.length > 0 && (
        <FlatList
          data={pokemons}
          keyExtractor={(item) => item.name}
          renderItem={pokemonView}
          numColumns={3}
          contentContainerStyle={styles.flatListContainer}
        />
      )}
    </View>
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
  optionsText: {
    color: "blue",
    textDecorationLine: "underline",
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
  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    marginTop: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    color: "#333",
    width: "75%",
  },
});

export default Home;
