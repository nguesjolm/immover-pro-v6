import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity, Modal} from 'react-native';
import {TextVariant} from '../atoms/TextVariant';
import {wp} from '../../assets/utils/helperResponsive';
import {THEME} from '../../styles/theme';
import {city} from '../../styles/main.style';
import {BASE_URI_IMAGE} from '../../assets/api/app.config';
import {formatPrice, formatedDate} from '../../assets/utils/functions';
import {Video} from 'expo-av';
import {videoIcon} from '../../assets/svgs/VideoIcon';

export const PropertyItem = ({well, onPress}) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [videoStatus, setVideoStatus] = React.useState({});

  const wellDetail = well[0] || well?.bien;

  // Récupérer l'image
  const imageSource = wellDetail?.images?.length > 0
    ? { uri: `${BASE_URI_IMAGE}${wellDetail.images[wellDetail.images.length - 1]?.source}` }
    : require('../../assets/images/home.png');
  
  // Vérifier si une vidéo existe
  const hasVideo = wellDetail?.videos?.length > 0;
  const videoUrl = hasVideo ? `${BASE_URI_IMAGE}${wellDetail.videos[0]?.source}` : null;
  console.log("Video URL:", videoUrl);
  return (
    <>
      <TouchableOpacity
        style={styles.container}
        activeOpacity={0.7}
        onPress={onPress}>
        
        {/* Image avec bouton vidéo dans l'angle */}
        <View style={styles.imageContainer}>
          <Image source={imageSource} style={styles.image} />
          {hasVideo && (
            <TouchableOpacity
              style={styles.videoButton}
              onPress={() => setModalVisible(true)}
              activeOpacity={0.8}>
              <View style={styles.playIcon}>
                <TextVariant text="▶" color={THEME.colors.white} style={styles.playText} />
              </View>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.content}>
          <View style={styles.title}>
            <TextVariant
              variant="title5"
              text={wellDetail?.biens_code || '0000C'}
              color={THEME.colors.green}
            />
            <View style={styles.separator} />
            <TextVariant variant="title5" text={wellDetail?.operations} />
          </View>

          <View style={styles.locality}>
            <TextVariant variant="label2" text={wellDetail?.communeQuartier} />
            <View
              style={
                wellDetail?.details?.statut === 'dispo'
                  ? {...styles.active, backgroundColor: THEME.colors.green}
                  : {...styles.active, backgroundColor: THEME.colors.red}
              }
            />
          </View>
          
          <View style={styles.price}>
            <TextVariant
              variant="label2"
              text={`${wellDetail?.details?.superficie ? wellDetail.details.superficie + ' m²' : wellDetail?.details?.pieces ? wellDetail.details.pieces + ' pièces' : ''} | ${formatPrice(
                (wellDetail?.details?.loyer > 0
                  ? wellDetail.details.loyer + 'F'
                  : wellDetail?.details?.montantAchat > 0
                  ? wellDetail.details.montantAchat + 'F'
                  : '')
              )}`}
            />
            <TextVariant
              variant="label2"
              text={formatedDate(wellDetail?.details?.created_at)}
            />
          </View>
        </View>
      </TouchableOpacity>

      {/* Modal vidéo */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}>
              <TextVariant text="✕" color={THEME.colors.white} style={styles.closeText} />
            </TouchableOpacity>
            {videoUrl && (
              <Video
                source={{ uri: videoUrl }}
                style={styles.video}
                useNativeControls
                resizeMode="contain"
                isLooping={false}
                shouldPlay={true}
                onPlaybackStatusUpdate={status => setVideoStatus(status)}
              />
            )}
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '99%',
    height: 'auto',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: wp('0.7'),
    ...THEME.shadow,
    borderRadius: wp('3%'),
    backgroundColor: THEME.colors.white,
    padding: city,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
  },
  image: {
    width: '100%',
    height: wp('45'),
    resizeMode: 'cover',
    backgroundColor: THEME.colors.white,
    borderRadius: city,
    marginBottom: wp('2'),
  },
  videoButton: {
    position: 'absolute',
    top: wp('2'),
    right: wp('2'),
    width: wp('10'),
    height: wp('10'),
    borderRadius: wp('5'),
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  playIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  playText: {
    fontSize: wp('5'),
    marginLeft: wp('0.5'),
  },
  content: {
    width: '100%',
    height: 'auto',
  },
  title: {
    width: '100%',
    height: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
  },
  separator: {
    width: wp('.5'),
    height: wp('3'),
    backgroundColor: THEME.colors.primary,
    marginHorizontal: wp('1'),
  },
  locality: {
    width: '100%',
    height: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    width: '100%',
    height: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  active: {
    width: wp('2'),
    height: wp('2'),
    borderRadius: wp('20%'),
    backgroundColor: THEME.colors.green,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: '70%',
  },
  closeButton: {
    position: 'absolute',
    top: wp('10'),
    right: wp('5'),
    zIndex: 10,
    width: wp('10'),
    height: wp('10'),
    borderRadius: wp('5'),
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    fontSize: wp('6'),
  },
});