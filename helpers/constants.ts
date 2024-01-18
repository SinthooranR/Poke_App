interface Colors {
  [key: string]: string;
}

export const baseUrl = "https://pokeapi.co/api/v2";

export const colors: Colors = {
  TYPE_NORMAL: "#A8A77A",
  TYPE_FIRE: "#EE8130",
  TYPE_WATER: "#6390F0",
  TYPE_ELECTRIC: "#F7D02C",
  TYPE_GRASS: "#7AC74C",
  TYPE_ICE: "#96D9D6",
  TYPE_FIGHTING: "#C22E28",
  TYPE_POISON: "#A33EA1",
  TYPE_GROUND: "#E2BF65",
  TYPE_FLYING: "#A98FF3",
  TYPE_PSYCHIC: "#F95587",
  TYPE_BUG: "#A6B91A",
  TYPE_ROCK: "#B6A136",
  TYPE_GHOST: "#735797",
  TYPE_DRAGON: "#6F35FC",
  TYPE_DARK: "#705746",
  TYPE_STEEL: "#B7B7CE",
  TYPE_FAIRY: "#D685AD",
};

export const getTypeColor = (type: string): string => {
  const uppercaseType = `TYPE_${type.toUpperCase()}`;
  return colors[uppercaseType] || "";
};

export const getImageByPokemonName = (name?: string) => {
  if (name?.includes("galar")) {
    return `https://img.pokemondb.net/artwork/large/${name.replace(
      "galar",
      "galarian"
    )}.jpg`;
  }
  if (name?.includes("alola")) {
    return `https://img.pokemondb.net/artwork/large/${name.replace(
      "alola",
      "alolan"
    )}.jpg`;
  }
  if (name?.includes("hisui")) {
    return `https://img.pokemondb.net/artwork/large/${name.replace(
      "hisui",
      "hisuian"
    )}.jpg`;
  }
  return `https://img.pokemondb.net/artwork/large/${name}.jpg`;
};
