import React, { FC, useEffect, useState } from "react";
import { Image, StyleSheet } from "react-native";
import { getImageByPokemonName } from "../../helpers/constants";

const PokemonImage: FC<{ name?: string }> = ({ name }) => {
  return (
    <Image
      source={{
        uri: getImageByPokemonName(name),
      }}
      resizeMode="contain"
      style={styles.pokemonImage}
    />
  );
};

const styles = StyleSheet.create({
  pokemonImage: {
    width: 100,
    height: 100,
  },
});

export default PokemonImage;
