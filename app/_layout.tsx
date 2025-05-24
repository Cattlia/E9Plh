import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { useEffect, useState, useCallback } from 'react';
import { View } from 'react-native';
import { Stack } from 'expo-router';

import { useColorScheme } from '@/components/useColorScheme';
import { SQLiteProvider } from 'expo-sqlite';
import { migrateDbIfNeeded } from '@/dbmigrations';


SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  const [fontsLoaded, setFontsLoaded] = useState<boolean>(false);

  
  useEffect(() => {
    const loadResourcesAsync = async () => {
      try {
        await Font.loadAsync({
          SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
          ...FontAwesome.font,
        });
      } catch (error) {
        console.warn('Font loading failed:', error);
      } finally {
        setFontsLoaded(true);
      }
    };

    loadResourcesAsync();
  }, []);

  
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      try {
        await SplashScreen.hideAsync();
      } catch (e) {
        console.log('Splash hide error:', e);
      }
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; 
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <SQLiteProvider databaseName="spending.db" onInit={migrateDbIfNeeded}>
        <RootLayoutNav />
      </SQLiteProvider>
    </View>
  );
}


function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
    </ThemeProvider>
  );
}

export {
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};
