import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const OpenEyeIcon = ({props, size, color}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={size || 24}
    height={size || 24}
    fill="none"
    viewBox="0 0 24 24"
    {...props}>
    <Path
      fill={color || '#000'}
      fillRule="evenodd"
      d="M1.5 12c0-2.25 3.75-7.5 10.5-7.5S22.5 9.75 22.5 12s-3.75 7.5-10.5 7.5S1.5 14.25 1.5 12zM12 16.75a4.75 4.75 0 1 0 0-9.5 4.75 4.75 0 0 0 0 9.5zM14.7 12a2.7 2.7 0 1 1-5.4 0 2.7 2.7 0 0 1 5.4 0z"
      clipRule="evenodd"
    />
  </Svg>
);
export default OpenEyeIcon;
