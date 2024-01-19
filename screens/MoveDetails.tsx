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
import MoveModal from "../components/MoveModal";
import InfoIcon from "../components/Icons/InfoIcon";

interface IPokemon {
  name: string;
  url: string;
}

const MoveDetails: FC<IMoveDetailsProps> = ({ route, navigation }) => {
  const { param } = route.params;
  const [move, setMove] = useState<IMoveData>();
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const navigateToDetails = (name: string) => {
    navigation.navigate("PokemonDetails", { param: name });
  };

  const showModal = (move: any) => {
    setIsModalVisible(true);
  };

  const hideModal = () => {
    setIsModalVisible(false);
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
          <View style={styles.topSection}>
            <Text style={styles.title}>{move?.name.replace("-", " ")}</Text>
            <TouchableOpacity onPress={showModal}>
              <View style={styles.infoIcon}>
                <InfoIcon />
              </View>
            </TouchableOpacity>
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

          <MoveModal
            isVisible={isModalVisible}
            onClose={hideModal}
            flavorText={move?.flavor_text_entries
              .filter((text) => text.language.name === "en")[0]
              .flavor_text.replace("\n", " ")}
            effectDescription={move?.effect_entries[0]?.short_effect?.replace(
              "$effect_chance",
              move.effect_chance?.toString() || ""
            )}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingBottom: 18,
  },
  loadingContainer: {
    display: "flex",
    marginTop: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  topSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingHorizontal: 16,
  },
  title: {
    textTransform: "capitalize",
    fontSize: 24,
    marginVertical: 12,
    color: "#000000",
  },
  infoIcon: {
    marginLeft: 16,
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
