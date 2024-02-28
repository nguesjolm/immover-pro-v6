import React from 'react';
import {ActivityIndicator} from 'react-native';

export const ActivityLoader = ({size = 'small', color = '#FFF'}) => {
  return <ActivityIndicator size={size} color={color} />;
};
