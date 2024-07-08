import React from 'react';
import * as Font from 'expo-font';
import { View, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { store } from './src/redux/store';
import { AppRouter } from './src/routers';

//REACT QUERY
import { QueryClientProvider, QueryClient } from 'react-query';
import { THEME } from './src/styles/theme';
import { SignInContextProvider } from './src/contexts/authContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NotificationManager } from './src/components/organims/NotificationManager';
import { useNetworkUtills } from './src/hooks/useNetworkUtills';
import { TextVariant } from './src/components/atoms/TextVariant';
import { country } from './src/styles/main.style';
import AnimatedLottieView from 'lottie-react-native';
import { wp } from './src/assets/utils/helperResponsive';

const queryClient = new QueryClient();

const App = () => {
  const [fontLoaded, setFontLoaded] = React.useState(false);
  React.useEffect(() => {
    setFontLoaded(true);

    const loadFont = async () => {
      await Font.loadAsync({
        'Montserrat-Regular': require('./src/assets/fonts/Montserrat-Regular.ttf'),
        'Montserrat-Bold': require('./src/assets/fonts/Montserrat-Bold.ttf'),
        'Montserrat-BoldItalic': require('./src/assets/fonts/Montserrat-BoldItalic.ttf'),
      });
    };
    loadFont();
  }, []);

  const { isConnected } = useNetworkUtills();

  if (!isConnected) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: THEME.colors.white,
          paddingHorizontal: country,
        }}
      >
        <AnimatedLottieView
          source={require('./src/assets/json/not_found.json')}
          autoPlay
          style={{ height: wp('60%'), width: wp('50%') }}
        />
        <TextVariant
          variant={'title4'}
          text={'Oups de connexion !'}
          textAlign={'center'}
          color={THEME.colors.black}
        />
        <TextVariant
          variant={'label'}
          text={'Votre demande a rencontré un problème de \nconnexion internet'}
          textAlign={'center'}
          color={THEME.colors.black}
        />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SignInContextProvider>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <SafeAreaProvider>
              <SafeAreaView style={{ flex: 1 }}>
                <StatusBar
                  backgroundColor={THEME.colors.primary}
                  barStyle={'dark-content'}
                />
                <AppRouter />
                <NotificationManager />
              </SafeAreaView>
            </SafeAreaProvider>
          </Provider>
        </QueryClientProvider>
      </SignInContextProvider>
    </GestureHandlerRootView>
  );
};

export default App;
