import React, { FC, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { getTypeColor } from "../helpers/constants";
import { IPokemonDetailsProps, IPokemonInfo, ISpecies } from "../interfaces";
import PokemonStats from "../components/PokemonStats";
import { getPokemonById } from "../helpers/getPokemonById";
import { getPokemonEvolution } from "../helpers/getPokemonEvolutions";
import PokemonMoveList from "../components/PokemonMoveList";

const PokemonDetails: FC<IPokemonDetailsProps> = ({ route, navigation }) => {
  //returns an ID for pokemon
  const { param } = route.params;
  const [pokemon, setPokemon] = useState<IPokemonInfo>();
  const [evolutions, setEvolutions] = useState<ISpecies[]>([]);

  const navigateToDetails = (id: string) => {
    navigation.setParams({ param: id });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pokemonData = await getPokemonById(Number(param));
        setPokemon(pokemonData);

        const evolutionChain = await getPokemonEvolution(Number(param));
        setEvolutions(evolutionChain);

        const dynamicHeaderColor = getTypeColor(
          pokemonData.types[0]?.type.name
        );
        navigation.setOptions({
          headerStyle: {
            backgroundColor: dynamicHeaderColor,
          },
        });
      } catch (error) {
        console.error("Error fetching Pokémon:", error);
      }
    };

    fetchData();
  }, [param, navigation]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.pokemonTitle}>{pokemon?.name}</Text>
        <Image
          source={{
            uri: `https://img.pokemondb.net/artwork/large/${pokemon?.name}.jpg`,
          }}
          resizeMode="contain"
          style={styles.pokemonImage}
        />
        <Text style={styles.pokemonText}>Type:</Text>
        <View style={styles.typesContainer}>
          {pokemon?.types &&
            pokemon?.types.length > 0 &&
            pokemon?.types.map(({ type, slot }) => (
              <View
                key={slot}
                style={[
                  styles.pokemonType,
                  { backgroundColor: getTypeColor(type.name) },
                ]}
              >
                <Text style={styles.pokemonTypeText}>{type.name}</Text>
              </View>
            ))}
        </View>

        <Text style={styles.pokemonText}>Abilities:</Text>
        <View>
          {pokemon?.abilities &&
            pokemon?.abilities.length > 0 &&
            pokemon?.abilities.map(({ ability, slot }) => (
              <Text style={styles.speciesText} key={slot}>
                {ability.name.replace("-", " ")}
              </Text>
            ))}
        </View>

        <Text style={styles.pokemonText}>Related Pokemon:</Text>
        <View style={styles.evolutionsContainer}>
          {evolutions &&
            evolutions.length > 1 &&
            evolutions
              .filter(({ name }) => name !== pokemon?.name)
              .map(({ name, id }: ISpecies) => (
                <View style={styles.speciesContainer} key={name}>
                  <TouchableOpacity onPress={() => navigateToDetails(id)}>
                    <Image
                      source={{
                        uri: `https://img.pokemondb.net/artwork/large/${name}.jpg`,
                      }}
                      resizeMode="contain"
                      style={styles.evolutionImage}
                    />
                    <Text style={styles.speciesText}>{name}</Text>
                  </TouchableOpacity>
                </View>
              ))}
        </View>

        <PokemonStats
          stats={pokemon?.stats}
          type={pokemon?.types[0].type.name}
        />

        <PokemonMoveList moves={pokemon?.moves} navigation={navigation} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: "center",
  },
  pokemonImage: {
    width: 120,
    height: 120,
    marginBottom: 16,
  },
  pokemonTitle: {
    textTransform: "capitalize",
    fontSize: 24,
    marginVertical: 12,
  },
  pokemonText: {
    textTransform: "capitalize",
    fontSize: 18,
    marginVertical: 12,
  },
  typesContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
  },
  pokemonType: {
    padding: 4,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "transparent",
  },
  pokemonTypeText: {
    color: "#FFFFFF",
    textTransform: "capitalize",
  },
  evolutionsContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    marginTop: 2,
  },
  evolutionImage: {
    width: 100,
    height: 100,
    marginBottom: 16,
  },
  speciesContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  speciesText: {
    textTransform: "capitalize",
    textAlign: "center",
  },
});

export default PokemonDetails;
