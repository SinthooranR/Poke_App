import { baseUrl } from "./constants";

export const getAllPokemon = async () => {
  try {
    const response = await fetch(`${baseUrl}/pokemon?limit=1000`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    throw new Error(`Error getting Pokémon List`);
  }
};
