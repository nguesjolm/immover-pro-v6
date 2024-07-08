import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// SCREENS
import { DrawerNavigator } from './DrawerNavigator';
import { AddPreference } from '../views/screens/PreferencesScreen/AddPreference';
import { PreferenceDetailScreen } from '../views/screens/PreferencesScreen/PreferenceDetailScreen';
import { AddWellScreen } from '../views/stacks/WellStack/AddWellScreen';
import { WellDetailsScreen } from '../views/stacks/WellStack/WellDetailsScreen';
import { NewAppointmentsScreen } from '../views/stacks/DashboardStack/NewAppointmentsScreen';
import { RequestDetailsScreen } from '../views/stacks/RequestStack/RequestDetailsScreen';
import { WellProposerScreen } from '../views/stacks/WellStack/WellProposerScreen';
import { WellOnProposedScreen } from '../views/stacks/WellStack/WellOnProposedScreen';

const { Navigator, Screen } = createNativeStackNavigator();

export const OnlineStack = () => {
  //
  const options = {
    headerShown: false,
  };

  return (
    <Navigator>
      <Screen name={'Home'} component={DrawerNavigator} options={options} />
      <Screen
        name='AddPreference'
        component={AddPreference}
        options={options}
      />
      <Screen
        name='PreferenceDetail'
        component={PreferenceDetailScreen}
        options={options}
      />
      <Screen name={'AddWell'} component={AddWellScreen} options={options} />
      <Screen
        name={'WellDetails'}
        component={WellDetailsScreen}
        options={options}
      />
      <Screen
        name={'NewAppointment'}
        component={NewAppointmentsScreen}
        options={options}
      />
      <Screen
        name={'RequestDetails'}
        component={RequestDetailsScreen}
        options={options}
      />
      <Screen
        name={'WellProposer'}
        component={WellProposerScreen}
        options={options}
      />
      <Screen
        name={'WellOnProposed'}
        component={WellOnProposedScreen}
        options={options}
      />
    </Navigator>
  );
};
