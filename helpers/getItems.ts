import { baseUrl } from "./constants";

export const getAllUseItems = async () => {
  try {
    const response = await fetch(`${baseUrl}/item?limit=1000`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    throw new Error(`Error getting Item List`);
  }
};

export const getItemByName = async (name: string) => {
  try {
    const response = await fetch(`${baseUrl}/item/${name}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error getting Item Data`);
  }
};
