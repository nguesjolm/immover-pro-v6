import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {wp} from '../utils/helperResponsive';

const ArrowDownIcon = props => (
  <Svg
    width={props.size || wp('4')}
    height={props.size || wp('4')}
    viewBox="0 0 48 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M5.64 0L24 18.32L42.36 0L48 5.64L24 29.64L0 5.64L5.64 0Z"
      fill="black"
    />
  </Svg>
);
export default ArrowDownIcon;
