import React from 'react';
import CustomDrawer from '../components/molecules/CustomDrawer';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {MyPreferences} from '../views/screens/PreferencesScreen';
import {BottomTabNavigator} from './BottomTabNavigator';
import {THEME} from '../styles/theme';
import {TechnicalSupportScreen} from '../views/screens/TechnicalSupportScreen';
import {TutorielScreen} from '../views/screens/TutorielScreen';

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
  //

  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: THEME.colors.white,
        drawerActiveTintColor: THEME.colors.black,
        drawerInactiveTintColor: THEME.colors.black,
        drawerInactiveBackgroundColor: THEME.colors.white,
      }}>
      <Drawer.Screen
        name="Tabs"
        component={BottomTabNavigator}
        options={{
          drawerLabel: 'Accueil',
        }}
      />
      <Drawer.Screen
        name="MyPreferences"
        component={MyPreferences}
        options={{
          drawerLabel: 'Zones de Biens',
        }}
      />
      <Drawer.Screen
        name="TechnicalSupport"
        component={TechnicalSupportScreen}
        options={{
          drawerLabel: 'Support technique',
        }}
      />
      <Drawer.Screen
        name="Tutoriel"
        component={TutorielScreen}
        options={{
          drawerLabel: 'CGU',
        }}
      />
    </Drawer.Navigator>
  );
};
