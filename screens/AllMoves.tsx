import React, { FC, useEffect, useState } from "react";
import { IMoveListProps } from "../interfaces";
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { getAllMoves } from "../helpers/getMoves";
import PokemonMove from "../components/PokemonMove/Index";
import ResetIcon from "../components/Icons/ResetIcon";

interface IMove {
  name: string;
  url: string;
}

const AllMoves: FC<IMoveListProps> = ({ navigation }) => {
  const [moves, setMoves] = useState<IMove[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredMoves, setFilteredMoves] = useState<IMove[]>([]);
  const [viewMode, setViewMode] = useState<"default" | "search">("default");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = () => {
    const filteredData = moves.filter((move) =>
      move.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredMoves(filteredData);
    setViewMode("search");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const movesData = await getAllMoves();
        setMoves(movesData);
        setFilteredMoves(movesData);
      } catch (error) {
        console.error("Error getting Moves list");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const moveView: ListRenderItem<IMove> = ({ item }) => {
    return (
      <View style={styles.moveContainer}>
        <PokemonMove moveName={item.name} navigation={navigation} />
      </View>
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
              placeholder="Search Moves"
              placeholderTextColor="#666"
              onChangeText={(text) => setSearchQuery(text)}
              onSubmitEditing={handleSearch}
              value={searchQuery}
            />
            {viewMode === "search" && (
              <TouchableOpacity
                onPress={() => {
                  setViewMode("default");
                  setSearchQuery("");
                }}
              >
                <ResetIcon />
              </TouchableOpacity>
            )}
          </View>

          {viewMode === "search" && filteredMoves.length > 0 && (
            <FlatList
              data={filteredMoves}
              keyExtractor={(item) => item.name}
              renderItem={moveView}
              contentContainerStyle={styles.flatListContainer}
            />
          )}
          {viewMode === "default" && moves.length > 0 && (
            <FlatList
              data={moves}
              keyExtractor={(item) => item.name}
              renderItem={moveView}
              contentContainerStyle={styles.flatListContainer}
            />
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
  title: {
    textTransform: "capitalize",
    fontSize: 24,
    marginVertical: 12,
  },
  moveContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
    marginHorizontal: 5,
  },
  flatListContainer: {
    paddingVertical: 16,
    paddingHorizontal: 8,
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

export default AllMoves;
