import {ImageBackground, StyleSheet, View} from 'react-native';
import {THEME} from '../../styles/theme';
import {ButtonGeneral} from '../atoms/ButtonGeneral';
import {TextVariant} from '../atoms/TextVariant';
import {hp, wp} from '../../assets/utils/helperResponsive';
import {useNavigation} from '@react-navigation/native';

export const BannerContent = ({totalTransaction}) => {
  //
  const navigation = useNavigation();

  return (
    <View style={styles.banner}>
      <ImageBackground
        source={require('../../assets/images/plan.png')}
        style={styles.bannerImage}
      />
      <View style={styles.bannerText}>
        <TextVariant
          variant={'h3'}
          text={'Transactions soldées'}
          textAlign={'center'}
        />
        <TextVariant
          variant={'largeText'}
          text={totalTransaction || 0}
          textAlign={'center'}
          color={THEME.colors.white}
        />
        <ButtonGeneral
          text={'Voir l’historique'}
          backgroundColor={THEME.colors.green}
          btnStyle={styles.historyBtn}
          variant={'smallText'}
          onPress={() =>
            navigation.navigate('Home', {screen: 'TransactionBalance'})
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    width: wp('100'),
    height: hp('32'),
    position: 'absolute',
    bottom: 0,
  },
  bannerText: {
    width: wp('100'),
    marginTop: hp('-9'),
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
    bottom: 0,
    zIndex: -1,
  },
  historyBtn: {
    width: '45%',
    alignSelf: 'center',
    height: hp('6%'),
    ...THEME.shadow,
  },
});
