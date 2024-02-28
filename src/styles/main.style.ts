import {hp} from '../assets/utils/helperResponsive';
import {Dimensions} from 'react-native';

export const SCREEN_SIZE = Dimensions.get('window');

export const street = hp('0.65%');
export const city = hp('1.30%');
export const country = hp('1.95%');
export const continent = hp('2.60%');
export const planet = hp('3.26%');
export const univers = hp('3.91%');

export const shadow = {
  shadowColor: '#000000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,

  elevation: 5,
};

export const shadowTop = {
  shadowRadius: 4,
  shadowOffset: {
    width: 0,
    height: -5,
  },
  shadowColor: '#000000',
  elevation: 5,
};

export const OPACITY = {
  _1pct: '03',
  _2pct: '05',
  _3pct: '08',
  _5pct: '0D',
  _10pct: '1A',
  _15pct: '26',
  _20pct: '33',
  _30pct: '4D',
  _50pct: '80',
  _60pct: '99',
  _70pct: '99',
  _80pct: 'CC',
  _90pct: 'E6',
};
