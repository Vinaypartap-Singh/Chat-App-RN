import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import ChatRoom from "./screens/MessageDetails";
import ProfileScreen from "./screens/ProfileScreen";
import UpdateProfile from "./screens/UpdateProfile";

export default function Navigation() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Messages"
          component={ChatRoom}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="UserProfile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
