import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import Animated, {
  useAnimatedRef,
  useSharedValue,
  useAnimatedStyle,
  runOnUI,
  measure,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import Chevron from './ChevronButton';
import {TextVariant} from './TextVariant';
import {wp} from '../../assets/utils/helperResponsive';
import {THEME} from '../../styles/theme';
import {city} from '../../styles/main.style';

export const Accordion = ({title, children}) => {
  //

  const listRef = useAnimatedRef();
  const heightValue = useSharedValue(0);
  const open = useSharedValue(false);
  const progress = useDerivedValue(() =>
    open.value ? withTiming(1) : withTiming(0),
  );

  const heightAnimationStyle = useAnimatedStyle(() => ({
    height: heightValue.value,
  }));

  const handlePress = () => {
    if (heightValue.value === 0) {
      runOnUI(() => {
        'worklet';
        heightValue.value = withTiming(measure(listRef).height);
      })();
    } else {
      heightValue.value = withTiming(0);
    }
    open.value = !open.value;
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={handlePress} style={styles.titleContainer}>
        <TextVariant
          marginRight={wp('5')}
          variant={'title5'}
          text={title}
          color={THEME.colors.black}
        />
        <Chevron progress={progress} />
      </Pressable>
      <Animated.View style={heightAnimationStyle}>
        <Animated.View style={styles.contentContainer} ref={listRef}>
          {children}
        </Animated.View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingVertical: city,
    borderBottomColor: THEME.colors.gray,
  },
  contentContainer: {
    position: 'absolute',
    width: '100%',
    top: 0,
  },
  content: {
    padding: 20,
    backgroundColor: '#D6E1F0',
  },
});
