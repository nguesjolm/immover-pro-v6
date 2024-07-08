import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { wp } from '../utils/helperResponsive';

const AccountIcon = (props: any) => (
  <Svg
    width={wp(8)}
    height={wp(20)}
    viewBox='0 0 78 81'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <Path
      d='M39.13 53.1401C49.1871 53.1401 57.34 41.8485 57.34 27.9199C57.34 13.9913 49.1871 2.7002 39.13 2.7002C29.0729 2.7002 20.92 13.9913 20.92 27.9199C20.92 41.8485 29.0729 53.1401 39.13 53.1401Z'
      fill={props.color || 'black'}
    />
    <Path
      d='M38.84 51.52C23.6 51.52 9.97992 55.1702 0.919922 60.9102C5.22503 67.0048 10.9256 71.9811 17.5458 75.4238C24.166 78.8665 31.5137 80.6757 38.9755 80.7002C46.4373 80.7247 53.7966 78.9636 60.4392 75.5645C67.0818 72.1653 72.8149 67.2265 77.1599 61.1602C68.0999 55.2802 54.3 51.52 38.84 51.52Z'
      fill={props.color || 'black'}
    />
    <Path
      d='M45.2 33.8999H33.0601C31.0387 33.8999 29.4 35.5387 29.4 37.5601V59.96C29.4 61.9813 31.0387 63.6201 33.0601 63.6201H45.2C47.2213 63.6201 48.86 61.9813 48.86 59.96V37.5601C48.86 35.5387 47.2213 33.8999 45.2 33.8999Z'
      fill={props.color || 'black'}
    />
    <Path
      d='M23.7899 29.3499C24.3399 33.3499 23.4399 36.8999 21.7899 37.1799C20.1399 37.4599 18.3599 34.4099 17.7899 30.3699C17.2199 26.3299 18.1399 22.8198 19.7899 22.5398C21.4399 22.2598 23.2499 25.3099 23.7899 29.3499Z'
      fill={props.color || 'black'}
    />
    <Path
      d='M54.4599 29.3499C53.9099 33.3499 54.8099 36.8999 56.4599 37.1799C58.1099 37.4599 59.8899 34.4099 60.4599 30.3699C61.0299 26.3299 60.1099 22.8198 58.4599 22.5398C56.8099 22.2598 54.9999 25.3099 54.4599 29.3499Z'
      fill={props.color || 'black'}
    />
    <Path
      d='M21.56 26.92C20.94 22.92 20.3267 18.8835 19.72 14.8101C19.372 13.3629 19.4064 11.8499 19.82 10.42C20.35 9.04 21.92 7.94 23.31 8.42C22.75 5.61 25.86 3.54018 28.57 2.60018C33.0948 0.944889 37.9391 0.34939 42.73 0.859944C47.5441 1.40235 52.0108 3.63052 55.3399 7.14998C56.3796 8.26173 57.1857 9.57104 57.71 11.0001C58.64 13.7701 58.05 16.79 57.45 19.65C56.97 21.92 56.4501 24.2003 56.0201 26.4703C55.9569 27.0008 55.7531 27.5048 55.43 27.9303C55.1032 28.1971 54.7253 28.3941 54.3194 28.5094C53.9135 28.6246 53.4884 28.6555 53.0701 28.6002L25.99 28.6602C24.29 28.6602 22.08 28.2501 21.85 26.5601'
      fill={props.color || 'black'}
    />
  </Svg>
);
export default AccountIcon;
