import auth from '@react-native-firebase/auth';
import {
  DefaultTheme as NavigationDefaultTheme, NavigationContainer
} from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {
  adaptNavigationTheme,
  MD3LightTheme,
  Provider as PaperProvider
} from 'react-native-paper';
import Router from './src/router';

const { LightTheme } = adaptNavigationTheme({
  light: NavigationDefaultTheme,
})

const CombinedDefaultTheme = {
  ...MD3LightTheme,
  ...LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...LightTheme.colors,
  },
}

const App = () => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  let initialRouteName = 'HomeScreen'

  if (!user) {
    initialRouteName = 'LoginScreen'
  }

  return (
    <PaperProvider theme={CombinedDefaultTheme}>
      <NavigationContainer theme={CombinedDefaultTheme}>
        <Router initialRouteName={initialRouteName} />
      </NavigationContainer>
    </PaperProvider>
  );
};


export default App;
