import * as React from 'react';
import Svg, {Circle, Rect} from 'react-native-svg';
import {hp} from '../utils/helperResponsive';

const MoreIcon = props => (
  <Svg
    width={hp('4%')}
    height={hp('4%')}
    viewBox="0 0 60 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Circle cx={30} cy={30} r={30} fill="#E24022" />
    <Rect x={28} y={10} width={5} height={41} rx={2.5} fill="white" />
    <Rect
      x={10}
      y={33}
      width={5}
      height={41}
      rx={2.5}
      transform="rotate(-90 10 33)"
      fill="white"
    />
  </Svg>
);
export default MoreIcon;
