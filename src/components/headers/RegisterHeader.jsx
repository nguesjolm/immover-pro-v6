import {StyleSheet, View} from 'react-native';
import {hp} from '../../assets/utils/helperResponsive';
import {THEME} from '../../styles/theme';
import {univers} from '../../styles/main.style';
import {Fragment} from 'react';
import {TextVariant} from '../atoms/TextVariant';

export const RegisterHeader = ({title}) => {
  //
  return (
    <Fragment>
      <View style={styles.curveRight} />
      <View style={styles.header}>
        <TextVariant
          variant="h3"
          text={title || 'CREER MON COMPTE'}
          textAlign="center"
          marginTop={hp('4%')}
          color={THEME.colors.white}
          fontStyle={'italic'}
          fontWeight={'bold'}
        />
      </View>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  header: {
    height: hp('13%'),
    width: '100%',
    backgroundColor: THEME.colors.primary,
    borderBottomRightRadius: univers * 1.3,
    alignSelf: 'center',
    alignItems: 'center',
  },
  curveRight: {
    backgroundColor: THEME.colors.primary,
    width: hp('40%'),
    height: hp('90%'),
    position: 'absolute',
    alignSelf: 'flex-start',
    zIndex: 0,
  },
});
