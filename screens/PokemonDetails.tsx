import React, { FC, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { getImageByPokemonName, getTypeColor } from "../helpers/constants";
import { IPokemonDetailsProps, IPokemonInfo, ISpecies } from "../interfaces";
import PokemonStats from "../components/PokemonStats";
import { getPokemonById } from "../helpers/getPokemonById";
import { getPokemonEvolution } from "../helpers/getPokemonEvolutions";
import PokemonMoveList from "../components/PokemonMoveList";
import PokemonImage from "../components/PokemonImage";
import { getPokemonVarieties } from "../helpers/getPokemonForms";
import { SvgXml } from "react-native-svg";

const PokemonDetails: FC<IPokemonDetailsProps> = ({ route, navigation }) => {
  //returns an ID for pokemon
  const { param } = route.params;
  const [pokemon, setPokemon] = useState<IPokemonInfo>();
  const [evolutions, setEvolutions] = useState<ISpecies[]>([]);
  const [otherForms, setOtherForms] = useState<ISpecies[]>([]);
  const scrollViewRef = useRef<ScrollView>(null);
  const [loading, setLoading] = useState(true);

  const navigateToDetails = (name: string) => {
    navigation.setParams({ param: name });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Set loading state to true while fetching data
        setLoading(true);

        const pokemonData: IPokemonInfo = await getPokemonById(param);
        setPokemon(pokemonData);

        const evolutionChain = await getPokemonEvolution(
          pokemonData.species.name
        );
        setEvolutions(evolutionChain);

        const pokemonForms = await getPokemonVarieties(
          pokemonData.species.name
        );
        setOtherForms(pokemonForms);

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
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Scroll to top on component mount
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  }, [param, navigation]);

  return (
    <ScrollView ref={scrollViewRef}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={120} color="#ED1C24" />
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={styles.pokemonTitle}>
            {pokemon?.name.replace("-", " ")}
          </Text>
          <Image
            source={{
              uri: getImageByPokemonName(pokemon?.name),
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
          {evolutions.length > 1 && (
            <>
              <Text style={styles.pokemonText}>Related Pokemon:</Text>
              <View style={styles.evolutionsContainer}>
                {evolutions &&
                  evolutions.length > 0 &&
                  evolutions
                    .filter(({ name }) => name !== pokemon?.name)
                    .map(({ name, id }: ISpecies) => (
                      <View style={styles.speciesContainer} key={name}>
                        <TouchableOpacity onPress={() => navigateToDetails(id)}>
                          <PokemonImage name={name} />
                          <Text style={styles.speciesText}>
                            {name.replace("-", " ")}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    ))}
              </View>
            </>
          )}

          {otherForms.length > 0 && (
            <>
              <Text style={styles.pokemonText}>Other Forms:</Text>
              <ScrollView
                contentContainerStyle={styles.scrollContainer}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                <View style={styles.evolutionsContainer}>
                  {otherForms &&
                    otherForms.length > 0 &&
                    otherForms
                      .filter(({ name }) => name !== pokemon?.name)
                      .map(({ name, id }: ISpecies) => (
                        <View style={styles.speciesContainer} key={name}>
                          <TouchableOpacity
                            onPress={() => navigateToDetails(id)}
                          >
                            <PokemonImage name={name} />
                            <Text style={styles.speciesText}>
                              {name.replace("-", " ")}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      ))}
                </View>
              </ScrollView>
            </>
          )}
          <PokemonStats
            stats={pokemon?.stats}
            type={pokemon?.types[0].type.name}
          />

          <PokemonMoveList moves={pokemon?.moves} navigation={navigation} />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingContainer: {
    display: "flex",
    marginTop: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContainer: {
    paddingVertical: 16,
    paddingHorizontal: 16,
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
