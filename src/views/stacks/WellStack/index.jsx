import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//Screens
import {WellListsScreen} from './WellListsScreen';

const {Navigator, Screen} = createNativeStackNavigator();

export const WellStack = () => {
  //
  const headerOptions = {
    headerShown: false,
  };

  return (
    <Navigator>
      <Screen
        name={'WellLists'}
        component={WellListsScreen}
        options={headerOptions}
      />
    </Navigator>
  );
};
