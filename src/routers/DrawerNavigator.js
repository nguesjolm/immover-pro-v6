import 'react-native-gesture-handler';
import React from 'react';
import { View } from 'react-native';
import CustomDrawer from '../components/molecules/CustomDrawer';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MyPreferences } from '../views/screens/PreferencesScreen';
import { BottomTabNavigator } from './BottomTabNavigator';
import { THEME } from '../styles/theme';
import { TechnicalSupportScreen } from '../views/screens/TechnicalSupportScreen';
import { TutorielScreen } from '../views/screens/TutorielScreen';
import { hp, wp } from '../assets/utils/helperResponsive';

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      backBehavior="history"
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
        swipeEnabled: false,
        gestureEnabled: false,
        overlayColor: 'transparent',
        // ✅ CORRECTIONS POUR ÉLIMINER L'ORANGE
        drawerActiveBackgroundColor: 'transparent',  // Supprime le fond orange
        drawerActiveTintColor: THEME.colors.white,  // Texte blanc pour l'élément actif
        drawerInactiveTintColor: THEME.colors.white, // Texte blanc pour les inactifs
        drawerInactiveBackgroundColor: 'transparent',
        drawerStyle: {
          width: wp(70),
          backgroundColor: 'transparent', // Le fond est géré par CustomDrawer
        },
        drawerLabelStyle: {
          fontSize: hp(2),
          paddingVertical: hp(1),
          fontWeight: '500',
        },
        animationEnabled: false,
      }}
    >
      <Drawer.Screen
        name='Tabs'
        component={BottomTabNavigator}
        options={{
          drawerLabel: 'Accueil',
        }}
      />
      <Drawer.Screen
        name='MyPreferences'
        component={MyPreferences}
        options={{
          drawerLabel: 'Zones de Biens',
        }}
      />
      <Drawer.Screen
        name='TechnicalSupport'
        component={TechnicalSupportScreen}
        options={{
          drawerLabel: 'Support technique',
        }}
      />
      <Drawer.Screen
        name='Tutoriel'
        component={TutorielScreen}
        options={{
          drawerLabel: 'CGU',
        }}
      />
    </Drawer.Navigator>
  );
};