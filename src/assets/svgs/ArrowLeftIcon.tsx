import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {hp} from '../utils/helperResponsive';

const ArrowLeftIcon = (props: any) => (
  <Svg
    width={hp('3%')}
    height={hp('3%')}
    viewBox="0 0 92 93"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M87.8899 46.4297C87.8879 54.6866 85.4377 62.7576 80.8489 69.6221C76.2602 76.4865 69.739 81.8367 62.11 84.9951C54.481 88.1535 46.0868 88.9783 37.9888 87.3662C29.8907 85.7541 22.4525 81.7777 16.6147 75.9385C10.7768 70.0992 6.80152 62.66 5.19139 54.5615C3.58127 46.4631 4.40864 38.0687 7.5689 30.4404C10.7291 22.8122 16.0804 16.2922 22.9459 11.7051C29.8114 7.11797 37.883 4.66992 46.1399 4.66992C51.6234 4.66992 57.0533 5.74987 62.1193 7.84863C67.1852 9.94739 71.7882 13.0235 75.6651 16.9014C79.5421 20.7793 82.6172 25.3837 84.7148 30.4502C86.8123 35.5167 87.8912 40.9462 87.8899 46.4297Z"
      stroke={props.color || 'black'}
      strokeWidth={8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M45.8601 68.5596L25.1001 47.7998L46.2301 26.6602"
      stroke={props.color || 'black'}
      strokeWidth={8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M25.1001 47.7998H67.8001"
      stroke={props.color || 'black'}
      strokeWidth={8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default ArrowLeftIcon;
