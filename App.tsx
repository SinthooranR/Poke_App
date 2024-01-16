import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./screens/Home";
import PokemonDetails from "./screens/PokemonDetails";
import { RootStackParamList } from "./screens/stackParams";
import { SvgXml } from "react-native-svg";
import { TouchableOpacity } from "react-native";
import { FC } from "react";
import { IHomeScreenNavigationProp, IHomeScreenProps } from "./interfaces";
import MoveDetails from "./screens/MoveDetails";

export default function App() {
  const Stack = createStackNavigator<RootStackParamList>();

  const PokeballIcon: FC<IHomeScreenProps> = ({ navigation }) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <SvgXml
          xml={`
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="#000000"
          d="M12 2a10 10 0 0 1 10 10a10 10 0 0 1-10 10A10 10 0 0 1 2 12A10 10 0 0 1 12 2m0 2c-4.08 0-7.45 3.05-7.94 7h4.07c.44-1.73 2.01-3 3.87-3c1.86 0 3.43 1.27 3.87 3h4.07c-.49-3.95-3.86-7-7.94-7m0 16c4.08 0 7.45-3.05 7.94-7h-4.07c-.44 1.73-2.01 3-3.87 3c-1.86 0-3.43-1.27-3.87-3H4.06c.49 3.95 3.86 7 7.94 7m0-10a2 2 0 0 0-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2"
        />
      </svg>`}
          style={{ marginLeft: 20 }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={({ navigation }) => ({
          headerLeft: () => (
            <PokeballIcon
              navigation={navigation as IHomeScreenNavigationProp}
            />
          ),
        })}
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerStyle: { backgroundColor: "#ED1C24" } }}
        />

        <Stack.Screen name="PokemonDetails" component={PokemonDetails} />
        <Stack.Screen name="MoveDetails" component={MoveDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
