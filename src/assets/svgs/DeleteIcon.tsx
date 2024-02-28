import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const DeleteIcon = (props: any) => (
  <Svg
    viewBox="0 0 56 72"
    width={props.size || 24}
    height={props.size || 24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M4 64C4 68.4 7.6 72 12 72H44C48.4 72 52 68.4 52 64V16H4V64ZM12 24H44V64H12V24ZM42 4L38 0H18L14 4H0V12H56V4H42Z"
      fill={props.color || '#000'}
    />
  </Svg>
);
export default DeleteIcon;
