import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// SCREENS
import UserDetailsScreen from './UserDetailsScreen';
import UpdateUserScreen from './UpdateUserScreen';

const {Navigator, Screen} = createNativeStackNavigator();

export const AccountStack = () => {
  //
  const headerOptions = {
    headerShown: false,
  };

  return (
    <Navigator>
      <Screen
        name={'UserDetails'}
        component={UserDetailsScreen}
        options={headerOptions}
      />
      <Screen
        name={'UpdateUser'}
        component={UpdateUserScreen}
        options={headerOptions}
      />
    </Navigator>
  );
};
