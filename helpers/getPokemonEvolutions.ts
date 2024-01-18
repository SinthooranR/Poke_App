import { baseUrl } from "./constants";

const getEvolutionDetails = (chain: any, details: any) => {
  const speciesName = chain.species.name;
  const speciesId = chain.species.url.split("/").slice(-2, -1)[0];
  details.push({ name: speciesName, id: speciesId });

  if (chain.evolves_to && chain.evolves_to.length > 0) {
    getEvolutionDetails(chain.evolves_to[0], details);
  }
};

export const getPokemonEvolution = async (pokemonName: string) => {
  try {
    // Get Pokemon species information
    const speciesResponse = await fetch(
      `${baseUrl}/pokemon-species/${pokemonName}/`
    );
    const speciesData = await speciesResponse.json();

    // Check if evolution_chain exists and is not null
    if (!speciesData.evolution_chain) {
      return []; // No evolution details available
    }

    const evolutionChainUrl = speciesData.evolution_chain.url || "";

    // Get evolution chain information
    const evolutionChainResponse = await fetch(evolutionChainUrl);
    const evolutionChainData = await evolutionChainResponse.json();

    // Check if chain property exists in the response
    if (!evolutionChainData.chain) {
      return []; // No evolution details available
    }

    // Extract evolution details
    const evolutionDetails: any = [];
    getEvolutionDetails(evolutionChainData.chain, evolutionDetails);

    return evolutionDetails;
  } catch (error) {
    console.error("Error getting Pokemon evolution");
    throw error;
  }
};
