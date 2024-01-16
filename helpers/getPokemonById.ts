import { baseUrl } from "./constants";

export const getPokemonById = async (id: number) => {
  try {
    const response = await fetch(`${baseUrl}/pokemon/${id}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error getting Pokémon Details`);
  }
};
