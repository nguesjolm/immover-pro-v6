import React from 'react';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import ArrowDownIcon from '../../assets/svgs/ArrowDownIcon';

const Chevron = ({progress}) => {
  //

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{rotate: `${progress?.value * -180}deg`}],
  }));

  return (
    <Animated.View style={iconStyle}>
      <ArrowDownIcon />
    </Animated.View>
  );
};

export default Chevron;
