import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./screens/stackParams";
import { RouteProp } from "@react-navigation/native";

//Home Page
export type IHomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Home"
>;

export interface IHomeScreenProps {
  navigation: IHomeScreenNavigationProp;
}

//Pokemon Details Page
export type IPokemonDetailsNavigationProp = StackNavigationProp<
  RootStackParamList,
  "PokemonDetails"
>;
type IPokemonDetailsRouteProp = RouteProp<RootStackParamList, "PokemonDetails">;

export interface IPokemonDetailsProps {
  route: IPokemonDetailsRouteProp;
  navigation: IPokemonDetailsNavigationProp;
}

//Moves Page
export type IMoveListNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Moves"
>;

export interface IMoveListProps {
  navigation: IMoveListNavigationProp;
}

//Move Details Page
export type IMoveDetailsNavigationProp = StackNavigationProp<
  RootStackParamList,
  "MoveDetails"
>;
export type IMoveDetailsRouteProp = RouteProp<
  RootStackParamList,
  "MoveDetails"
>;

export interface IMoveDetailsProps {
  route: IMoveDetailsRouteProp;
  navigation: IMoveDetailsNavigationProp;
}

//Items Page
export type IUseItemsNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Items"
>;

export interface IUseItemsListProps {
  navigation: IUseItemsNavigationProp;
}

//OTHERS

export interface IPokemonInfo {
  name: string;
  types: [
    {
      slot: number;
      type: {
        name: "string";
      };
    }
  ];
  abilities: [
    {
      ability: {
        name: string;
      };
      isHidden: boolean;
      slot: number;
    }
  ];
  moves: IMove[];
  stats: IPokemonStats[];
  species: {
    name: string;
  };
}

export interface ISpecies {
  name: string;
  id: string;
}

export interface IPokemonStats {
  base_stat: number;
  stat: {
    name: string;
  };
}

export interface IMove {
  move: {
    name: string;
  };
}

export interface IMoveData {
  name: string;
  power: number;
  pp: number;
  accuracy: number;
  type: {
    name: string;
  };
  damage_class: {
    name: string;
  };
  effect_entries: [
    {
      effect: string;
      short_effect: string;
    }
  ];
  flavor_text_entries: [
    {
      flavor_text: string;
      language: {
        name: string;
      };
    }
  ];
  effect_chance: number;
  learned_by_pokemon: [
    {
      name: string;
      url: string;
    }
  ];
}

export interface IUseItemData {
  name: string;
  category: {
    name: string;
  };
  effect_entries: [
    {
      effect: string;
      short_effect: string;
    }
  ];
  sprites: {
    default: string;
  };
}
