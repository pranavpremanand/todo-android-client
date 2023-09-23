import React, {useEffect} from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {PaperProvider} from 'react-native-paper';
import {commonStyles} from './styles/commonStyles';
import {NavigationContainer} from '@react-navigation/native';
import FlashMessage from 'react-native-flash-message';
import {Provider} from 'react-redux';
import store from './redux/store';
import {Router} from './routes/Router';
import 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {QueryClientProvider, QueryClient} from 'react-query';

// Optional configuration
export const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

const queryClient = new QueryClient();
function App() {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <PaperProvider>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={commonStyles.blueBg}
          />
          <FlashMessage position={'top'} />
          <NavigationContainer>
            <Router />
          </NavigationContainer>
        </PaperProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
