import React, {useContext} from 'react';
import OnboardingScreen from '../views/screens/OnboardingScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RegisterScreen} from '../views/screens/RegisterScreen';
import {LoginScreen} from '../views/screens/LoginScreen';
import {RegisterValidationAlertScreen} from '../views/screens/RegisterScreen/RegisterValidationAlertScreen';
import {SignInContext} from '../contexts/authContext';
import {ForgetPasswordScreen} from '../views/screens/ForgetPasswordScreen';
import {OtpCodeScreen} from '../views/screens/OtpCodeScreen';
import {NewPasswordScreen} from '../views/screens/NewPasswordScreen';
import {CommitmentScreen} from '../views/screens/CommitmentScreen';

const {Navigator, Screen} = createNativeStackNavigator();

export const OfflineStack = () => {
  //
  const {isWelcome} = useContext(SignInContext);
  const options = {headerShown: false};

  return (
    <Navigator>
      <>
        {isWelcome && (
          <Screen
            name="Welcome"
            component={OnboardingScreen}
            options={options}
          />
        )}
        <Screen name="Login" component={LoginScreen} options={options} />
        <Screen name="Register" component={RegisterScreen} options={options} />
        <Screen
          name="RegisterValidation"
          component={RegisterValidationAlertScreen}
          options={options}
        />
        <Screen
          name="ForgetPassword"
          component={ForgetPasswordScreen}
          options={options}
        />
        <Screen name="OtpCode" component={OtpCodeScreen} options={options} />
        <Screen
          name="NewPassword"
          component={NewPasswordScreen}
          options={options}
        />
        <Screen
          name="Commitment"
          component={CommitmentScreen}
          options={options}
        />
      </>
    </Navigator>
  );
};
