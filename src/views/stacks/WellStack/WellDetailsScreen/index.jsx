import React, {useRef} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {THEME} from '../../../../styles/theme';
import {useNavigation} from '@react-navigation/native';
import {TextVariant} from '../../../../components/atoms/TextVariant';
import {hp, wp} from '../../../../assets/utils/helperResponsive';
import {city} from '../../../../styles/main.style';
import {ButtonGeneral} from '../../../../components/atoms/ButtonGeneral';
import ArrowLeftIcon from '../../../../assets/svgs/ArrowLeftIcon';
import {useDispatch} from 'react-redux';
import {BASE_URI_IMAGE} from '../../../../assets/api/app.config';
import {updateWellStatus} from '../../../../assets/api/fetchWells';
import {useQueryClient} from 'react-query';
import {
  setSuccessModalAction,
  setSuccessTextAction,
} from '../../../../redux/modals';
import {useWell} from '../../../../hooks/useWells';
import {LogoLoader} from '../../../../components/atoms/LogoLoader';
import {formatPrice} from '../../../../assets/utils/functions';

export const WellDetailsScreen = ({route}) => {
  //

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const [active, setActive] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(false);
  const {data, isLoading: loading} = useWell(route?.params?.well?.id);

  const renderItem = (label, value, separator = true) => (
    <View style={separator ? styles.itemSeparator : styles.item}>
      <TextVariant
        marginRight={wp('5')}
        variant={'title5'}
        text={label}
        color={THEME.colors.black}
      />
      <TextVariant variant={'label'} text={value} color={THEME.colors.black} />
    </View>
  );

  const handleScroll = nativeEvent => {
    if (nativeEvent) {
      const slide = Math.ceil(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
      );
      if (slide !== active) {
        setActive(slide);
      }
    }
  };

  const handleWellStatus = async status => {
    setIsLoading(true);
    const newStatus = status === 'dispo' ? 'indispo' : 'dispo';
    const res = await updateWellStatus(data?.biens?.id, newStatus);

    if (res.status === 200) {
      queryClient.invalidateQueries('wells');
      navigation.goBack();
      setIsLoading(false);
      dispatch(setSuccessModalAction(true));
      dispatch(
        setSuccessTextAction(
          ` Le bien est maintenant ${
            newStatus === 'dispo' ? 'disponible' : 'indisponible'
          }`,
        ),
      );
    } else {
      setIsLoading(false);
    }
  };

  const handleUpdateWell = () => {
    navigation.navigate('Well', {
      screen: 'AddWell',
      params: {well: data?.biens},
    });
  };

  if (loading) {
    return <LogoLoader />;
  }

  return (
    <>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backBtn}>
            <ArrowLeftIcon />
          </TouchableOpacity>
          <ScrollView
            onScroll={({nativeEvent}) => handleScroll(nativeEvent)}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            horizontal
            style={styles.flatlist}>
            {data?.biens?.images?.map((item, index) => (
              <Image
                key={index}
                source={{
                  uri: `${BASE_URI_IMAGE}${item?.source}`,
                }}
                style={styles.image}
              />
            ))}
          </ScrollView>
          <View style={styles.count}>
            <TextVariant
              variant={'label'}
              text={`${active}/${data?.biens?.images?.length}`}
              color={THEME.colors.white}
            />
          </View>
        </View>

        <View style={styles.title}>
          <TextVariant
            variant={'title4'}
            text={`Ref: ${data?.biens?.biens_code}` || '0000C'}
            textAlign={'center'}
            color={THEME.colors.green}
          />
        </View>

        <View style={styles.content}>
          {renderItem('Opération :', `${data?.biens?.operations}`)}
          {renderItem('Bien :', `${data?.biens?.categories}`)}
          {renderItem('Ville :', `${data?.biens?.ville}`)}
          {renderItem('Commune :', `${data?.biens?.communeQuartier}`)}
          {renderItem(
            'Superficie :',
            `${data?.biens?.details?.superficie || 'N/A'}`,
          )}
          {renderItem(
            'Précision :',
            `${data?.biens?.details?.zonePrecises || 'N/A'}`,
          )}

          <>
            {data?.biens?.operations === 'Vente' &&
            data?.biens?.categories === 'Terrain' ? (
              <></>
            ) : (
              <>
                {renderItem(
                  'Nombre de pièces :',
                  data?.biens?.details?.pieces
                    ? `${data?.biens?.details?.pieces || 0} pièces`
                    : 'N/A',
                )}
              </>
            )}
          </>

          {data?.biens?.details?.loyer > 0 ? (
            <>
              {renderItem(
                'Loyer :',
                `${formatPrice(data?.biens?.details?.loyer)} Fcfa`,
              )}
            </>
          ) : (
            <>
              {renderItem(
                'Montant :',
                `${formatPrice(data?.biens?.details?.montantAchat)} Fcfa`,
              )}
            </>
          )}

          <View style={styles.description}>
            <TextVariant
              marginRight={wp('5')}
              variant={'title5'}
              text={'Documents :'}
              color={THEME.colors.black}
            />
            <TextVariant
              variant={'label'}
              text={data?.biens?.details?.document}
              color={THEME.colors.black}
            />
          </View>
          <View style={styles.description}>
            <TextVariant
              marginRight={wp('5')}
              variant={'title5'}
              text={'Description :'}
              color={THEME.colors.black}
            />
            <TextVariant
              variant={'label'}
              text={data?.biens?.details?.description}
              color={THEME.colors.black}
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <ButtonGeneral
          width={'99%'}
          btnStyle={styles.button}
          backgroundColor={
            data?.biens?.details?.statut === 'dispo'
              ? THEME.colors.red
              : THEME.colors.green
          }
          text={
            data?.biens?.details?.statut === 'dispo'
              ? 'Rendre indisponible'
              : 'Rendre disponible'
          }
          variant={'title5'}
          onPress={() => handleWellStatus(data?.biens?.details?.statut)}
          loading={isLoading}
          disabled={isLoading}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.white,
    marginBottom: hp('10'),
  },
  header: {
    width: '100%',
    height: hp('30'),
    position: 'relative',
  },
  flatlist: {
    width: '100%',
    height: hp('30'),
  },
  count: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: THEME.colors.black + '80',
    width: wp('12'),
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: wp('2'),
    marginRight: wp('2'),
  },
  image: {
    width: wp('100'),
    height: hp('30'),
    resizeMode: 'cover',
    backgroundColor: THEME.colors.primary,
  },
  title: {
    marginTop: wp('3'),
  },
  content: {
    borderRadius: wp('3'),
    marginHorizontal: wp('3'),
    marginTop: wp('3'),
    padding: wp('3'),
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: city,
  },
  itemSeparator: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingVertical: city,
    borderBottomColor: THEME.colors.gray,
  },
  description: {
    paddingVertical: city,
    width: '100%',
    height: hp('20'),
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.gray,
  },
  footer: {
    marginHorizontal: wp('3'),
    marginBottom: wp('3'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    position: 'absolute',
    alignSelf: 'center',
    bottom: 0,
  },
  button: {
    marginTop: wp('2'),
    height: hp('5'),
    borderRadius: wp('1.55'),
  },
  backBtn: {
    position: 'absolute',
    top: wp('3'),
    left: wp('3'),
    zIndex: 100,
    backgroundColor: THEME.colors.white,
    width: wp('10'),
    height: wp('10'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp('10'),
  },
});
