import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { wp } from '../utils/helperResponsive';

const WellsIcon = (props: any) => (
  <Svg
    width={wp(8)}
    height={wp(20)}
    viewBox='0 0 62 62'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <Path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M8.94983 60.5996L7.33984 51.8496L18.6099 46.9697V61.1699H9.0498L8.94983 60.5996ZM7.02979 50.1396L5.22986 40.3701L18.6099 34.5703V45.1104L7.02979 50.1396ZM4.90979 38.6602L3.18982 29.2402L18.6099 22.54V32.7197L4.90979 38.6602ZM2.90979 27.5303L0.90979 16.6797L0.819824 16.2002L1.23987 15.9502L17.6199 6.5L18.6199 5.91992V20.7002L2.90979 27.5303ZM45.2998 21.2197L61.9999 25.1602L61.3298 29.46L43.5798 38.2598L45.2998 21.2197ZM61.0198 31.4697L59.8998 38.7197L42.6798 47L43.3699 40.21L61.0198 31.4697ZM59.6099 40.7197L58.4398 48.2305L41.7898 55.7305L42.4899 48.9297L59.6099 40.7197ZM58.1299 50.21L56.4498 61.21H41.2399L41.5999 57.71L58.1299 50.21ZM20.2499 0.0703125V23.2598L44.1099 20.7998L45.1099 10.5195L20.2499 0.0703125ZM20.2499 24.9199V30.9199L43.3398 28.79L43.9598 22.46L20.2499 24.9199ZM20.2499 32.5996V38.8496L42.5198 37.1699L43.1698 30.4902L20.2499 32.5996ZM20.2499 40.54V61.2402H39.9498L42.1698 38.8799L20.2499 40.54Z'
      fill={props.color || 'black'}
    />
  </Svg>
);
export default WellsIcon;
