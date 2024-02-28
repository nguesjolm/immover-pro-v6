import React from 'react';
import {Keyboard, TouchableWithoutFeedback} from 'react-native';

const KeybordCloser = ({children}) => {
  //
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );
};

export default KeybordCloser;
