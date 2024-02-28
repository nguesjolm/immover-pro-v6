import React from 'react';
import Animated, {FadeInUp} from 'react-native-reanimated';
import {View, StyleSheet, Pressable} from 'react-native';
import {TextVariant} from '../atoms/TextVariant';
import {THEME} from '../../styles/theme';
import {hp} from '../../assets/utils/helperResponsive';
import {useNavigation} from '@react-navigation/native';

export const PreferenceItem = ({preference}) => {
  //
  const navigation = useNavigation();

  const onPress = pref => {
    navigation.navigate('PreferenceDetail', {id: pref?.id});
  };

  return (
    <Animated.View entering={FadeInUp.delay(200).duration(1000).springify()}>
      <Pressable onPress={() => onPress(preference)} style={styles.container}>
        <View style={styles.content}>
          <View style={styles.details}>
            <View style={styles.title}>
              <TextVariant
                text={preference?.categoriesBiens || ''}
                variant="title5"
                color={THEME.colors.green}
                textAlign="center"
              />
              <View style={styles.separator} />
              <TextVariant variant="title5" text={preference?.operations} />
            </View>
            <View style={styles.location}>
              <TextVariant variant="label" text={preference?.pays + ' - '} />
              <TextVariant variant="label" text={preference?.ville} />
            </View>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME.colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: hp('2%'),
    paddingVertical: hp('1%'),
    marginBottom: hp('1%'),
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  location: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  separator: {
    width: hp('.3%'),
    height: hp('1.5%'),
    borderRadius: hp('20%'),
    backgroundColor: THEME.colors.black,
    marginHorizontal: hp('1%'),
  },
});
