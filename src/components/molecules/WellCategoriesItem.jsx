import React from 'react';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';
import {TextVariant} from '../atoms/TextVariant';
import {wp} from '../../assets/utils/helperResponsive';
import {THEME} from '../../styles/theme';
import {city} from '../../styles/main.style';
import {useDispatch, useSelector} from 'react-redux';
import {setCategoriesSelectedAction} from '../../redux/wells';
import {BASE_URI_IMAGE} from '../../assets/api/app.config';

export const WellCategoriesItem = ({categorie}) => {
  //
  const dispatch = useDispatch();
  const categories = useSelector(s => s.wellState.categoriesSelected);

  const handleSelect = () => {
    if (categories?.includes(categorie?.id)) {
      dispatch(
        setCategoriesSelectedAction(
          categories?.filter(item => item !== categorie?.id),
        ),
      );
    } else {
      dispatch(setCategoriesSelectedAction([...categories, categorie?.id]));
    }
  };

  return (
    <TouchableOpacity
      style={
        categories?.includes(categorie?.id)
          ? {
              ...styles.container,
              borderWidth: 2,
              borderColor: THEME.colors.primary,
            }
          : styles.container
      }
      activeOpacity={0.8}
      onPress={handleSelect}>
      <Image
        source={{uri: `${BASE_URI_IMAGE}/${categorie?.image_catg}`}}
        style={styles.image}
      />
      <TextVariant variant="title5" text={categorie?.nom_categorie} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp('29'),
    height: wp('29'),
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: wp('0.7'),
    ...THEME.shadow,
    borderRadius: wp('3%'),
    backgroundColor: THEME.colors.white,
    marginVertical: wp('1'),
  },
  image: {
    width: wp('15'),
    height: wp('12'),
    resizeMode: 'cover',
    // backgroundColor: THEME.colors.primary,
    borderRadius: city,
    marginBottom: wp('2'),
  },
});
