import { baseUrl } from "./constants";

export const getMoveDataByName = async (name: string) => {
  try {
    const response = await fetch(`${baseUrl}/move/${name}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error getting Move Data`);
  }
};
