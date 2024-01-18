import { baseUrl } from "./constants";

export const getPokemonVarieties = async (pokemonSpeciesName: string) => {
  try {
    // Fetch Pokemon species information
    const speciesResponse = await fetch(
      `${baseUrl}/pokemon-species/${pokemonSpeciesName}/`
    );
    const speciesData = await speciesResponse.json();

    // Check if varieties property exists
    if (!speciesData.varieties || speciesData.varieties.length === 0) {
      return []; // No varieties available
    }

    // Extract information from each variety
    const varietiesDetails: any[] = speciesData.varieties
      .filter((variety: any) => variety.pokemon.name !== pokemonSpeciesName)
      .filter((variety: any) => !variety.pokemon.name.includes("gmax"))
      .map((variety: any) => {
        const varietyName = variety.pokemon.name;
        const varietyId = variety.pokemon.url.split("/").slice(-2, -1)[0];
        return { name: varietyName, id: varietyId };
      });

    return varietiesDetails;
  } catch (error) {
    console.error("Error getting Pokemon varieties");
    throw error;
  }
};
