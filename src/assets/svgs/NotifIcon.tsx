import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {hp} from '../utils/helperResponsive';

const NotifIcon = (props: any) => (
  <Svg
    width={hp('3.5%')}
    height={hp('3.5%')}
    viewBox="0 0 64 72"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M63.3083 56.3348C63.2043 55.3889 62.9108 54.4737 62.4452 53.6438C61.9796 52.814 61.3514 52.0863 60.5983 51.5047C58.5383 49.8847 55.1183 46.5049 54.5983 41.9349C53.8183 35.2849 55.6784 11.4749 36.1984 8.69486H36.1383C36.0622 8.06254 36.1235 7.42111 36.3183 6.81473C36.5205 6.26747 36.6222 5.6882 36.6183 5.10477C36.619 4.35713 36.4553 3.61855 36.1388 2.9412C35.8223 2.26385 35.3607 1.66426 34.7868 1.18509C34.2129 0.705934 33.5407 0.358747 32.8178 0.168249C32.0948 -0.0222487 31.3387 -0.0513352 30.6032 0.0828C29.8677 0.216935 29.1709 0.511176 28.5617 0.944616C27.9525 1.37806 27.4461 1.93995 27.0783 2.59086C26.7105 3.24176 26.49 3.96575 26.433 4.71122C26.376 5.45668 26.4836 6.20556 26.7482 6.90482C26.9451 7.50392 27.0034 8.13981 26.9184 8.76468C7.66837 11.7047 9.50819 35.3546 8.73819 41.9746C8.19819 46.5746 4.73819 49.9747 2.73819 51.5447C1.98508 52.1264 1.35713 52.854 0.891511 53.6839C0.425888 54.5138 0.132177 55.4289 0.02823 56.3748C-0.45177 61.3748 5.3483 60.8448 5.3483 60.8448H57.9982C57.9982 60.8448 63.8283 61.3348 63.3083 56.3348Z"
      fill="white"
    />
    <Path
      d="M31.6577 71.2349C33.7171 71.2374 35.71 70.5061 37.2788 69.1719C38.8476 67.8377 39.8894 65.9882 40.2175 63.9551H23.0977C23.4296 65.9864 24.4726 67.8335 26.0405 69.167C27.6085 70.5005 29.5994 71.2334 31.6577 71.2349Z"
      fill="white"
    />
  </Svg>
);
export default NotifIcon;
