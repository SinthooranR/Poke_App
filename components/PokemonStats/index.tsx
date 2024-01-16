import React, { FC } from "react";
import { View, Text, StyleSheet } from "react-native";
import { IPokemonStats } from "../../interfaces";
import { getTypeColor } from "../../helpers/constants";

interface PokemonStats {
  stats?: IPokemonStats[];
  type?: string;
}

const PokemonStats: FC<PokemonStats> = ({ stats, type }) => {
  const getMaxValue = () => {
    if (stats) {
      return Math.max(...stats.map((stat) => stat.base_stat));
    } else {
      return 0;
    }
  };

  const maxValue = getMaxValue();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Base Stats</Text>
      {stats &&
        stats.map(({ stat, base_stat }) => (
          <View key={stat.name} style={styles.statContainer}>
            <Text style={styles.statName}>{stat.name.replace("-", " ")}</Text>
            <View style={styles.barContainer}>
              <View
                style={[
                  styles.bar,
                  {
                    width: `${(base_stat / maxValue) * 100}%`,
                    backgroundColor: type && getTypeColor(type),
                  },
                ]}
              />
            </View>
            {base_stat !== undefined && (
              <Text style={styles.statValue}>{`${base_stat.toString()}`}</Text>
            )}
          </View>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    paddingHorizontal: 16, // Add horizontal padding
    width: "100%",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  statContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  statName: {
    flex: 1,
    fontSize: 12,
    textTransform: "capitalize",
  },
  barContainer: {
    flex: 2,
    height: 20,
    borderRadius: 5,
    marginLeft: 8,
    overflow: "hidden",
  },
  bar: {
    height: "100%",
    borderRadius: 5,
    backgroundColor: "#4CAF50",
  },
  statValue: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
    color: "#000000",
  },
});
export default PokemonStats;
