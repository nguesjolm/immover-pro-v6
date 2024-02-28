import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {hp} from '../utils/helperResponsive';

const MenuIcon = (props: any) => (
  <Svg
    width={hp('2.5%')}
    height={hp('2.5%')}
    viewBox="0 0 74 67"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M0.370117 4.37012H73.6702"
      stroke={props.color || 'white'}
      strokeWidth={7}
      strokeMiterlimit={10}
    />
    <Path
      d="M0.370117 33.8896H50.5902"
      stroke={props.color || 'white'}
      strokeWidth={7}
      strokeMiterlimit={10}
    />
    <Path
      d="M0.370117 63.4199H73.6702"
      stroke={props.color || 'white'}
      strokeWidth={7}
      strokeMiterlimit={10}
    />
  </Svg>
);
export default MenuIcon;
