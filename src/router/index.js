import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/Home";
import LoginScreen from "../screens/Login";

const Stack = createNativeStackNavigator()

export default Router = () => (
  <Stack.Navigator
    initialRouteName="LoginScreen"
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name="LoginScreen" component={LoginScreen} />
    <Stack.Screen name="HomeScreen" component={HomeScreen} />
  </Stack.Navigator>
)