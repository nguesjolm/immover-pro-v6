import { StyleSheet, View } from 'react-native';
import React, { Fragment } from 'react';
import { THEME } from '../../styles/theme';
import { hp, wp } from '../../assets/utils/helperResponsive';
import { TextVariant } from '../atoms/TextVariant';

export const StepIndicatorItem = ({ currentStep }) => (
  <View style={styles.stepContainer}>
    {[1, 2, 3].map((step) => (
      <Fragment key={step}>
        {step !== 1 && (
          <View
            style={[
              styles.indicatorLine,
              {
                backgroundColor:
                  step <= currentStep
                    ? THEME.colors.primary
                    : THEME.colors.gray,
              },
            ]}
          />
        )}

        <View
          style={[
            styles.circle,
            {
              backgroundColor:
                step <= currentStep ? THEME.colors.primary : THEME.colors.gray,
            },
          ]}
        >
          <TextVariant
            variant={'title5'}
            color={THEME.colors.white}
            text={step}
            textAlign={'center'}
          />
        </View>
      </Fragment>
    ))}
  </View>
);

const styles = StyleSheet.create({
  stepContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicatorLine: {
    width: '36%',
    height: hp('0.23'),
  },
  circle: {
    width: wp('6%'),
    height: wp('6%'),
    borderRadius: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  step: {
    width: wp('5'),
    height: wp('5'),
    borderRadius: 20,
    backgroundColor: THEME.colors.white,
    borderWidth: 1,
    borderColor: THEME.colors.black,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
});
