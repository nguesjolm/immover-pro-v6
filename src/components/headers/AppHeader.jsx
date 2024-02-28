import ArrowLeftIcon from '../../assets/svgs/ArrowLeftIcon';
import MenuIcon from '../../assets/svgs/MenuIcon';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {city, country, planet} from '../../styles/main.style';
import {TextVariant} from '../atoms/TextVariant';
import {THEME} from '../../styles/theme';
import {useNavigation} from '@react-navigation/native';

export const AppHeader = ({
  title,
  titleColor,
  onLeftPress,
  onRigthPress,
  withRigthBtn,
  withLeftBtn,
  rigthText,
}) => {
  //

  const navigation = useNavigation();

  const Icon = () => {
    return withLeftBtn ? (
      <ArrowLeftIcon />
    ) : (
      <MenuIcon color={THEME.colors.black} />
    );
  };

  const handleMenu = () => {
    return withLeftBtn ? onLeftPress() : navigation?.openDrawer();
  };

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={handleMenu}>
        <Icon />
      </TouchableOpacity>

      <TextVariant
        variant={'title3'}
        text={title ?? 'IMMOVER PRO'}
        color={titleColor || THEME.colors.primary}
        fontStyle={'italic'}
      />
      {withRigthBtn ? (
        <TouchableOpacity onPress={onRigthPress} style={styles.rigthBtn}>
          <TextVariant
            variant={'title5'}
            text={rigthText || 'Modifier'}
            color={THEME.colors.primary}
          />
        </TouchableOpacity>
      ) : (
        <View />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    // paddingHorizontal: country,
    paddingTop: planet,
    paddingBottom: planet,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  rigthBtn: {
    paddingVertical: city,
  },
});
