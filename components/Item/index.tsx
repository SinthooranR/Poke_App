import React, { FC, useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { IUseItemData } from "../../interfaces";
import { getItemByName } from "../../helpers/getItems";

const Item: FC<{
  moveName: string;
}> = ({ moveName }) => {
  const [item, setItem] = useState<IUseItemData>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const itemData = await getItemByName(moveName);
        setItem(itemData);
      } catch (error) {
        console.error("Error fetching Item:", error);
      }
    };

    fetchData();
  }, [moveName]);

  return (
    <View style={styles.container}>
      <View style={styles.itemInfo}>
        <Image
          source={{
            uri: item?.sprites.default,
          }}
          resizeMode="contain"
          style={styles.itemImage}
        />
        <View style={styles.detailsContainer}>
          <Text style={styles.moveName}>{item?.name.replace("-", " ")}</Text>
          <Text style={styles.typeName}>
            {item?.effect_entries && item.effect_entries.length > 0
              ? item.effect_entries[0].short_effect
              : "Effect data is unavailable"}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    marginBottom: 10,
  },
  moveName: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10,
    textTransform: "capitalize",
  },
  typeName: {
    textTransform: "capitalize",
  },
  itemImage: {
    width: 70,
    height: 70,
    marginRight: 10,
  },
  itemInfo: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: "100%", // Set a maximum width for the container
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
});

export default Item;
