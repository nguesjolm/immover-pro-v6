import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

export const hp = (val: number) => {
  return heightPercentageToDP(val);
};

export const wp = (val: number) => {
  return widthPercentageToDP(val);
};
