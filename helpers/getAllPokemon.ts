import { baseUrl } from "./constants";

export const getAllPokemon = async () => {
  try {
    const response = await fetch(`${baseUrl}/pokemon?limit=1000`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    const filteredData = data.results.filter(
      (pokemon: any) => !pokemon.name.includes("gmax")
    );
    return filteredData;
  } catch (error) {
    throw new Error(`Error getting Pokémon List`);
  }
};
