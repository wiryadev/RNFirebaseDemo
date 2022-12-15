import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/Home";
import SignInScreen from "../screens/Auth/SignIn";
import SignUpScreen from "../screens/Auth/SignUp";
import CreateChatScreen from "../screens/Chat/CreateChat";
import RoomChatScreen from "../screens/Chat/RoomChat";

const Stack = createNativeStackNavigator()

export default Router = ({ initialRouteName }) => (
  <Stack.Navigator
    initialRouteName={initialRouteName}
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name="SignInScreen" component={SignInScreen} />
    <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
    <Stack.Screen name="HomeScreen" component={HomeScreen} />
    <Stack.Screen name="CreateChatScreen" component={CreateChatScreen} />
    <Stack.Screen name="RoomChatScreen" component={RoomChatScreen} />
  </Stack.Navigator>
)