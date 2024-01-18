import { baseUrl } from "./constants";

export const getAllMoves = async () => {
  try {
    const response = await fetch(`${baseUrl}/move?limit=1000`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return data.results;
  } catch (error) {
    throw new Error(`Error gettin Move List`);
  }
};
