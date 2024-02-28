import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

export const hp = val => {
  return heightPercentageToDP(val);
};

export const wp = val => {
  return widthPercentageToDP(val);
};
