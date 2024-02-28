import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//Screens
import {RequestHistoriesScreen} from './RequestHistoriesScreen';
import {RequestDetailsScreen} from './RequestDetailsScreen';

const {Navigator, Screen} = createNativeStackNavigator();

export const RequestStack = () => {
  //
  const headerOptions = {
    headerShown: false,
  };

  return (
    <Navigator>
      <Screen
        name={'RequestHistories'}
        component={RequestHistoriesScreen}
        options={headerOptions}
      />
    </Navigator>
  );
};
