import { baseUrl } from "./constants";

const getEvolutionDetails = (chain: any, details: any) => {
  const speciesName = chain.species.name;
  const speciesId = chain.species.url.split("/").slice(-2, -1)[0];
  details.push({ name: speciesName, id: speciesId });

  if (chain.evolves_to.length > 0) {
    getEvolutionDetails(chain.evolves_to[0], details);
  }
};

export const getPokemonEvolution = async (pokemonId: number) => {
  try {
    // Get Pokemon species information
    const speciesResponse = await fetch(
      `${baseUrl}/pokemon-species/${pokemonId}/`
    );
    const speciesData = await speciesResponse.json();
    const evolutionChainUrl = speciesData.evolution_chain.url;

    // Get evolution chain information
    const evolutionChainResponse = await fetch(evolutionChainUrl);
    const evolutionChainData = await evolutionChainResponse.json();

    // Extract evolution details
    const evolutionDetails: any = [];
    getEvolutionDetails(evolutionChainData.chain, evolutionDetails);

    return evolutionDetails;
  } catch (error) {
    console.error("Error getting Pokemon evolution");
    throw error;
  }
};
