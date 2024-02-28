import {StyleSheet, View} from 'react-native';
import OclockIcon from '../../assets/svgs/OclockIcon';
import {TextVariant} from '../atoms/TextVariant';
import {city, planet, univers} from '../../styles/main.style';
import {THEME} from '../../styles/theme';
import {ButtonGeneral} from '../atoms/ButtonGeneral';
import {useNavigation} from '@react-navigation/native';

export const RegisterValidationAlert = () => {
  //
  const navigation = useNavigation();

  const handleRedirect = () => {
    navigation.navigate('OnlineStack', {screen: 'Dashboard'});
  };

  return (
    <>
      <OclockIcon />
      <TextVariant
        variant={'h4'}
        fontWeight={'bold'}
        text={
          'C’est presque terminé ! Votre compte est en cours de verification.'
        }
        marginTop={city}
      />

      <TextVariant
        variant={'label3'}
        text={
          'Nous vous préviendrons dès qu’elle sera acceptée ou nous vous contacterons si nous avons besoin davantage d’informations.'
        }
        marginTop={planet}
        lineHeight={planet}
      />
      <View style={styles.footer}>
        <ButtonGeneral
          text={'Terminer'}
          variant={'title3'}
          btnStyle={styles.nextBtn('100%')}
          onPress={handleRedirect}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  nextBtn: width => ({
    marginBottom: univers,
    width: width,
    backgroundColor: THEME.colors.black,
  }),
  footer: {
    width: '100%',
    position: 'absolute',
    alignSelf: 'center',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
