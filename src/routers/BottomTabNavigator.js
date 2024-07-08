import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { THEME } from '../styles/theme';
import AccountIcon from '../assets/svgs/AccountIcon';
import WellsIcon from '../assets/svgs/WellsIcon';
import HomeIcon from '../assets/svgs/HomeIcon';
import RequestIcon from '../assets/svgs/RequestIcon';
import { country, shadowTop } from '../styles/main.style';
import { hp } from '../assets/utils/helperResponsive';
import { TextVariant } from '../components/atoms/TextVariant';

// Screens
import { DashboardStack } from '../views/stacks/DashboardStack';
import { RequestStack } from '../views/stacks/RequestStack';
import { AccountStack } from '../views/stacks/AccountStack';
import { WellStack } from '../views/stacks/WellStack';
import { View } from 'react-native';

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: THEME.colors.green,
        tabBarInactiveTintColor: THEME.colors.black,
        tabBarShowLabel: true,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: THEME.colors.white,
          borderTopColor: THEME.colors.darkLight,
          borderTopWidth: 1,
          height: hp(9),
          position: 'absolute',
          paddingTop: hp(1),
          ...shadowTop,
        },
        tabBarLabelPosition: 'below-icon',
      }}
    >
      <Tab.Screen
        name='Dashboard'
        component={DashboardStack}
        options={{
          tabBarIcon: ({ color }) => <HomeIcon color={color} />,
          tabBarLabel: 'Accueil',
          tabBarLabelStyle: {
            fontSize: hp(1.5),
            fontWeight: 'bold',
          },
        }}
      />
      <Tab.Screen
        name='Request'
        component={RequestStack}
        options={{
          tabBarIcon: ({ color }) => <RequestIcon color={color} />,
          tabBarLabel: 'Mes demandes',
          tabBarLabelStyle: {
            fontSize: hp(1.5),
            fontWeight: 'bold',
          },
        }}
      />
      <Tab.Screen
        name='Wells'
        component={WellStack}
        options={{
          tabBarIcon: ({ color }) => <WellsIcon color={color} />,
          tabBarLabel: 'Mes biens',
          tabBarLabelStyle: {
            fontSize: hp(1.5),
            fontWeight: 'bold',
          },
        }}
      />
      <Tab.Screen
        name='Account'
        component={AccountStack}
        options={{
          tabBarIcon: ({ color }) => <AccountIcon color={color} />,
          tabBarLabel: 'Mon compte',
          tabBarLabelStyle: {
            fontSize: hp(1.5),
            fontWeight: 'bold',
          },
        }}
      />
    </Tab.Navigator>
  );
};
