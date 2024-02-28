import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {THEME} from '../styles/theme';
import AccountIcon from '../assets/svgs/AccountIcon';
import WellsIcon from '../assets/svgs/WellsIcon';
import HomeIcon from '../assets/svgs/HomeIcon';
import RequestIcon from '../assets/svgs/RequestIcon';
import {country, shadowTop} from '../styles/main.style';
import {hp} from '../assets/utils/helperResponsive';
import {TextVariant} from '../components/atoms/TextVariant';

// Screens
import {DashboardStack} from '../views/stacks/DashboardStack';
import {RequestStack} from '../views/stacks/RequestStack';
import {AccountStack} from '../views/stacks/AccountStack';
import {WellStack} from '../views/stacks/WellStack';

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
  //

  const options = ({route}) => {
    const routeName = route.name;
    const lablesList = {
      Home: 'Accueil',
      Requests: 'Demandes',
      Well: 'Mes biens',
      Account: 'Mon compte',
    };

    return {
      headerShown: false,
      tabBarLabel: ({focused}) => {
        return (
          <TextVariant
            text={lablesList[routeName]}
            variant="menuTitle"
            color={focused ? THEME.colors.green : THEME.colors.black}
            fontWeight="700"
          />
        );
      },
    };
  };

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          const routeName = route.name;
          const Icons = {
            Home: HomeIcon,
            Requests: RequestIcon,
            Well: WellsIcon,
            Account: AccountIcon,
          };
          const Icon = Icons[routeName];
          return (
            <Icon
              active={focused}
              color={focused ? THEME.colors.green : THEME.colors.black}
            />
          );
        },

        tabBarStyle: {
          backgroundColor: THEME.colors.white,
          paddingTop: country,
          paddingBottom: hp('1.04%'),
          height: hp('8%'),
          ...shadowTop,
        },
      })}>
      <Tab.Screen name={'Home'} component={DashboardStack} options={options} />
      <Tab.Screen
        name={'Requests'}
        component={RequestStack}
        options={options}
      />
      <Tab.Screen name={'Well'} component={WellStack} options={options} />
      <Tab.Screen name={'Account'} component={AccountStack} options={options} />
    </Tab.Navigator>
  );
};
