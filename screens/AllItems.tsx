import React, { FC, useEffect, useState } from "react";
import { IUseItemsListProps } from "../interfaces";
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { getAllUseItems } from "../helpers/getItems";
import Item from "../components/Item";
import ResetIcon from "../components/Icons/ResetIcon";

interface IUseItem {
  name: string;
  url: string;
}

const AllItems: FC<IUseItemsListProps> = ({ navigation }) => {
  const [items, setItems] = useState<IUseItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<IUseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"default" | "search">("default");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = () => {
    const filteredData = items.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredItems(filteredData);
    setViewMode("search");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const itemsData = await getAllUseItems();
        setItems(itemsData);
        setFilteredItems(itemsData);
      } catch (error) {
        console.error("Error getting Moves list");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const itemView: ListRenderItem<IUseItem> = ({ item }) => {
    return (
      <View style={styles.moveContainer}>
        <Item moveName={item.name} />
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
              placeholder="Search Items"
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

          {viewMode === "search" && filteredItems.length > 0 && (
            <FlatList
              data={filteredItems}
              keyExtractor={(item) => item.name}
              renderItem={itemView}
              contentContainerStyle={styles.flatListContainer}
            />
          )}
          {viewMode === "default" && items.length > 0 && (
            <FlatList
              data={items}
              keyExtractor={(item) => item.name}
              renderItem={itemView}
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
    height: "100%",
    width: "100%",
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
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
    width: "100%",
  },
  flatListContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingVertical: 16,
    paddingHorizontal: 15,
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

export default AllItems;
