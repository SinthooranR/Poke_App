import React, { FC, useEffect, useState } from "react";
import { View, ScrollView, Text } from "react-native";
import { getTypeColor } from "../helpers/constants";
import { IMoveDetailsProps, IPokemonInfo, ISpecies } from "../interfaces";

const MoveDetails: FC<IMoveDetailsProps> = ({ route, navigation }) => {
  //returns an ID for pokemon
  const { param } = route.params;
  const [pokemon, setPokemon] = useState<IPokemonInfo>();
  const [evolutions, setEvolutions] = useState<ISpecies[]>([]);

  //   const navigateToDetails = (id: string) => {
  //     navigation.setParams({ param: id });
  //   };

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const pokemonData = await getPokemonById(Number(param));
  //         setPokemon(pokemonData);

  //         const evolutionChain = await getPokemonEvolution(Number(param));
  //         setEvolutions(evolutionChain);

  //         const dynamicHeaderColor = getTypeColor(
  //           pokemonData.types[0]?.type.name
  //         );
  //         navigation.setOptions({
  //           headerStyle: {
  //             backgroundColor: dynamicHeaderColor,
  //           },
  //         });
  //       } catch (error) {
  //         console.error("Error fetching Pokémon:", error);
  //       }
  //     };

  //     fetchData();
  //   }, [param, navigation]);

  return (
    <ScrollView>
      <View>
        <Text>MOVE</Text>
      </View>
    </ScrollView>
  );
};

export default MoveDetails;
