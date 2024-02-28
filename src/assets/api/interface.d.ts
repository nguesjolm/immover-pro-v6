import {AnimationObject} from 'lottie-react-native';


type Offeror = {
  name: string;
  email: string;
  password: string;
  tel: string;
  zone: string;
  profil: string;
  cni: string;
  identite: string;
};
export interface OnboardingData {
  id: number;
  animation: AnimationObject;
  text: string;
  textColor: string;
  backgroundColor: string;
}
