import { StatusBar } from "expo-status-bar";
import { FC, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getTypeColor } from "../helpers/constants";
import { IMoveData, IMoveDetailsProps } from "../interfaces";
import PokemonImage from "../components/PokemonImage";
import { getMoveDataByName } from "../helpers/getMoves";

interface IPokemon {
  name: string;
  url: string;
}

const MoveDetails: FC<IMoveDetailsProps> = ({ route, navigation }) => {
  //returns an ID for pokemon
  const { param } = route.params;
  const [move, setMove] = useState<IMoveData>();
  const [loading, setLoading] = useState(true);

  const navigateToDetails = (name: string) => {
    navigation.navigate("PokemonDetails", { param: name });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

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
      } finally {
        setLoading(false);
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
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={120} color="#ED1C24" />
        </View>
      ) : (
        <>
          <Text style={styles.title}>{move?.name}</Text>

          <View style={styles.descContainer}>
            <Text style={styles.subHeader}>Description</Text>
            <Text style={styles.descriptionText}>
              {move?.flavor_text_entries
                .filter((text) => text.language.name === "en")[0]
                .flavor_text.replace("\n", " ")}
            </Text>

            <Text style={styles.subHeader}>Effect</Text>
            <Text style={styles.descriptionText}>
              {move?.effect_entries[0].short_effect.replace(
                "$effect_chance",
                move.effect_chance.toString()
              )}
            </Text>
          </View>

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
        </>
      )}
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
  loadingContainer: {
    display: "flex",
    marginTop: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textTransform: "capitalize",
    fontSize: 24,
    marginVertical: 12,
  },
  descContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: 24,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  descriptionText: {
    width: "100%",
    minWidth: 200,
  },
  pokemonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
    marginHorizontal: 5,
  },
  flatListContainer: {
    justifyContent: "center",
    alignItems: "center",
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
