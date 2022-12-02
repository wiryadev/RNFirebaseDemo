import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/Home";
import SignInScreen from "../screens/SignIn";

const Stack = createNativeStackNavigator()

export default Router = () => (
  <Stack.Navigator
    initialRouteName="SignInScreen"
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name="SignInScreen" component={SignInScreen} />
    <Stack.Screen name="HomeScreen" component={HomeScreen} />
  </Stack.Navigator>
)