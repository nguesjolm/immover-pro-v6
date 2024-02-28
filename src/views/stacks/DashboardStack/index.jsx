import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {HomeScreen} from './HomeScreen';
import {TransactionBalanceScreen} from './TransactionBalanceScreen';
import {NewAppointmentsScreen} from './NewAppointmentsScreen';
import {NotificationScreen} from './NotificationScreen';

const {Navigator, Screen} = createNativeStackNavigator();

export const DashboardStack = () => {
  //
  const headerOptions = {
    headerShown: false,
  };

  return (
    <Navigator>
      <Screen
        name={'Dashboard'}
        component={HomeScreen}
        options={headerOptions}
      />
      <Screen
        name={'TransactionBalance'}
        component={TransactionBalanceScreen}
        options={headerOptions}
      />
      <Screen
        name={'Notification'}
        component={NotificationScreen}
        options={headerOptions}
      />
    </Navigator>
  );
};
