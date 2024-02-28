import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';

export const KeyboardAvoiding = ({children}) => {
  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
      <ScrollView>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          {children}
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
