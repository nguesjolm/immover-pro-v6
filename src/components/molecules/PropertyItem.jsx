import React, { useMemo, useState, useCallback, useRef } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  Alert,
  Linking,
} from 'react-native';
import { TextVariant } from '../atoms/TextVariant';
import { wp } from '../../assets/utils/helperResponsive';
import { THEME } from '../../styles/theme';
import { city } from '../../styles/main.style';
import { BASE_URI_IMAGE } from '../../assets/api/app.config';
import { formatPrice, formatedDate } from '../../assets/utils/functions';
import { Video } from 'expo-av';

export const PropertyItem = React.memo(({ well, onPress, testID }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [videoStatus, setVideoStatus] = useState({});
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef(null);

  // Mémorisation des détails du bien
  const wellDetail = useMemo(() => well[0] || well?.bien, [well]);

  // Mémorisation de l'image source
  const imageSource = useMemo(() => {
    if (wellDetail?.images?.length > 0) {
      return { uri: `${BASE_URI_IMAGE}${wellDetail.images[wellDetail.images.length - 1]?.source}` };
    }
    return require('../../assets/images/home.png');
  }, [wellDetail?.images]);

  // Vérification de la présence d'une vidéo
  const hasVideo = useMemo(() => wellDetail?.videos?.length > 0, [wellDetail?.videos]);
  
  const videoUrl = useMemo(() => 
    hasVideo ? `${BASE_URI_IMAGE}${wellDetail.videos[0]?.source}` : null,
    [hasVideo, wellDetail?.videos]
  );

  // Vérifier si le bien est disponible
  const isDisponible = useMemo(() => 
    wellDetail?.details?.statut === 'dispo',
    [wellDetail?.details?.statut]
  );

  // Gestionnaire pour ajouter une vidéo (uniquement si non disponible ET pas de vidéo)
  const handleAddVideo = useCallback(() => {
    const bienId = wellDetail?.id;
    if (!bienId) {
      Alert.alert('Erreur', 'Impossible de récupérer l\'identifiant du bien');
      return;
    }

    const url = `https://admin.immover.io/bien_video/${bienId}`;
    
    // Ouvrir dans le navigateur par défaut (en dehors de l'application)
    Linking.openURL(url).catch((err) => {
      console.error('Erreur lors de l\'ouverture du lien:', err);
      Alert.alert(
        'Erreur',
        'Impossible d\'ouvrir le lien. Veuillez réessayer.'
      );
    });
  }, [wellDetail?.id]);

  // Gestionnaires d'événements mémorisés
  const handlePress = useCallback(() => {
    if (onPress) {
      onPress();
    }
  }, [onPress]);

  const handleVideoPress = useCallback(() => {
    setModalVisible(true);
    setIsVideoLoading(true);
    setVideoError(false);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalVisible(false);
    setIsVideoLoading(true);
    setVideoError(false);
    // Arrêter la vidéo lors de la fermeture
    if (videoRef.current) {
      videoRef.current.pauseAsync();
    }
  }, []);

  // Gestionnaire de statut de lecture vidéo
  const handlePlaybackStatusUpdate = useCallback((status) => {
    setVideoStatus(status);
    
    // Vidéo chargée
    if (status.isLoaded && !status.isBuffering) {
      setIsVideoLoading(false);
    }
    
    // Fin de la vidéo
    if (status.didJustFinish) {
      handleCloseModal();
    }
  }, [handleCloseModal]);

  // Gestionnaire d'erreur vidéo
  const handleVideoError = useCallback(() => {
    setVideoError(true);
    setIsVideoLoading(false);
    Alert.alert(
      'Erreur de lecture',
      'Impossible de lire cette vidéo. Veuillez réessayer plus tard.',
      [{ text: 'OK', onPress: handleCloseModal }]
    );
  }, [handleCloseModal]);

  // Calcul des informations d'affichage
  const displayInfo = useMemo(() => {
    const surface = wellDetail?.details?.superficie 
      ? `${wellDetail.details.superficie} m²` 
      : wellDetail?.details?.pieces 
      ? `${wellDetail.details.pieces} pièces` 
      : '';
    
    const price = wellDetail?.details?.loyer > 0
      ? `${formatPrice(wellDetail.details.loyer)}F`
      : wellDetail?.details?.montantAchat > 0
      ? `${formatPrice(wellDetail.details.montantAchat)}F`
      : '';
    
    return `${surface}${surface && price ? ' | ' : ''}${price}`;
  }, [wellDetail?.details?.superficie, wellDetail?.details?.pieces, 
      wellDetail?.details?.loyer, wellDetail?.details?.montantAchat]);

  // Statut du bien (disponible/vendu)
  const statusColor = useMemo(() => 
    isDisponible ? THEME.colors.green : THEME.colors.red,
    [isDisponible]
  );

  // Afficher le bouton d'ajout de vidéo si:
  // 1. Le bien n'est PAS disponible
  // 2. ET le bien n'a PAS de vidéo
  const showAddVideoButton = useMemo(() => 
    !isDisponible && !hasVideo,
    [isDisponible, hasVideo]
  );

  return (
    <>
      <TouchableOpacity
        style={styles.container}
        activeOpacity={0.7}
        onPress={handlePress}
        accessibilityLabel={`Propriété ${wellDetail?.biens_code || '0000C'}`}
        accessibilityRole="button"
        testID={testID}
      >
        {/* Conteneur image avec boutons */}
        <View style={styles.imageContainer}>
          <Image 
            source={imageSource} 
            style={styles.image}
            accessibilityLabel="Image de la propriété"
          />
          
          {/* Bouton vidéo existant (si vidéo disponible) */}
          {hasVideo && (
            <TouchableOpacity
              style={styles.videoButton}
              onPress={handleVideoPress}
              activeOpacity={0.8}
              accessibilityLabel="Lire la vidéo de présentation"
              accessibilityRole="button"
            >
              <View style={styles.playIcon}>
                <TextVariant 
                  text="▶" 
                  color={THEME.colors.white} 
                  style={styles.playText} 
                />
              </View>
            </TouchableOpacity>
          )}

          {/* Nouveau bouton pour ajouter une vidéo (si bien non disponible ET sans vidéo) */}
          {showAddVideoButton && (
            <TouchableOpacity
              style={styles.addVideoButton}
              onPress={handleAddVideo}
              activeOpacity={0.8}
              accessibilityLabel="Ajouter une vidéo pour ce bien"
              accessibilityRole="button"
            >
              <View style={styles.addIcon}>
                <TextVariant 
                  text="+" 
                  color={THEME.colors.white} 
                  style={styles.addText} 
                />
              </View>
              <View style={styles.addVideoTextContainer}>
                <TextVariant 
                  text="Ajouter vidéo" 
                  color={THEME.colors.white} 
                  style={styles.addVideoText}
                  variant="caption"
                />
              </View>
            </TouchableOpacity>
          )}

          {/* Badge statut (optionnel - pour indiquer que le bien n'est pas disponible) */}
          {/* {!isDisponible && (
            <View style={styles.statusBadge}>
              <TextVariant 
                text="Non disponible" 
                color={THEME.colors.white} 
                style={styles.statusBadgeText}
                variant="caption"
              />
            </View>
          )} */}
        </View>

        <View style={styles.content}>
          <View style={styles.title}>
            <TextVariant
              variant="title5"
              text={wellDetail?.biens_code || '0000C'}
              color={THEME.colors.green}
            />
            <View style={styles.separator} />
            <TextVariant 
              variant="title5" 
              text={wellDetail?.operations} 
              numberOfLines={1}
            />
          </View>

          <View style={styles.locality}>
            <TextVariant 
              variant="label2" 
              text={wellDetail?.communeQuartier}
              numberOfLines={1}
              style={styles.localityText}
            />
            <View style={[styles.active, { backgroundColor: statusColor }]} />
          </View>
          
          <View style={styles.price}>
            <TextVariant
              variant="label2"
              text={displayInfo}
              numberOfLines={1}
            />
            <TextVariant
              variant="label2"
              text={formatedDate(wellDetail?.details?.created_at)}
              style={styles.dateText}
            />
          </View>
        </View>
      </TouchableOpacity>

      {/* Modal vidéo (inchangé) */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
        statusBarTranslucent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleCloseModal}
              accessibilityLabel="Fermer la vidéo"
              accessibilityRole="button"
            >
              <TextVariant text="✕" color={THEME.colors.white} style={styles.closeText} />
            </TouchableOpacity>

            {videoError ? (
              <View style={styles.errorContainer}>
                <TextVariant 
                  text="❌" 
                  style={styles.errorIcon}
                />
                <TextVariant 
                  text="Erreur de chargement de la vidéo"
                  color={THEME.colors.white}
                  variant="body2"
                />
                <TouchableOpacity 
                  style={styles.retryButton}
                  onPress={() => {
                    setVideoError(false);
                    setIsVideoLoading(true);
                  }}
                >
                  <TextVariant 
                    text="Réessayer"
                    color={THEME.colors.primary}
                    variant="button"
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <>
                {isVideoLoading && (
                  <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color={THEME.colors.primary} />
                    <TextVariant 
                      text="Chargement de la vidéo..."
                      color={THEME.colors.white}
                      style={styles.loadingText}
                    />
                  </View>
                )}
                
                {videoUrl && (
                  <Video
                    ref={videoRef}
                    source={{ uri: videoUrl }}
                    style={styles.video}
                    useNativeControls
                    resizeMode="contain"
                    isLooping={false}
                    shouldPlay={modalVisible}
                    onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
                    onError={handleVideoError}
                    onLoadStart={() => {
                      setIsVideoLoading(true);
                      setVideoError(false);
                    }}
                    onReadyForDisplay={() => setIsVideoLoading(false)}
                  />
                )}
              </>
            )}
          </View>
        </View>
      </Modal>
    </>
  );
}, (prevProps, nextProps) => {
  return prevProps.well === nextProps.well && prevProps.onPress === nextProps.onPress;
});

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
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
  },
  image: {
    width: '100%',
    height: wp('45'),
    resizeMode: 'cover',
    backgroundColor: THEME.colors.grayLight,
    borderRadius: city,
    marginBottom: wp('2'),
  },
  // Bouton vidéo existant
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
  // Nouveau bouton pour ajouter une vidéo
  addVideoButton: {
    position: 'absolute',
    top: wp('2'),
    right: wp('2'),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderRadius: wp('5'),
    paddingVertical: wp('1.5'),
    paddingHorizontal: wp('3'),
    zIndex: 10,
    borderWidth: 1,
    borderColor: THEME.colors.primary,
  },
  addIcon: {
    width: wp('6'),
    height: wp('6'),
    borderRadius: wp('3'),
    backgroundColor: THEME.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp('1.5'),
  },
  addText: {
    fontSize: wp('5'),
    fontWeight: 'bold',
  },
  addVideoTextContainer: {
    justifyContent: 'center',
  },
  addVideoText: {
    fontSize: wp('3'),
    fontWeight: '500',
  },
  // Badge statut
  statusBadge: {
    position: 'absolute',
    bottom: wp('2'),
    left: wp('2'),
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingVertical: wp('1'),
    paddingHorizontal: wp('2'),
    borderRadius: wp('2'),
    zIndex: 10,
  },
  statusBadgeText: {
    fontSize: wp('2.5'),
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
    marginVertical: wp('1'),
  },
  localityText: {
    flex: 1,
    marginRight: wp('2'),
  },
  price: {
    width: '100%',
    height: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    fontSize: wp('3'),
  },
  active: {
    width: wp('2'),
    height: wp('2'),
    borderRadius: wp('20%'),
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.95)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  video: {
    width: '100%',
    height: '70%',
    backgroundColor: '#000',
  },
  closeButton: {
    position: 'absolute',
    top: wp('10'),
    right: wp('5'),
    zIndex: 20,
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
  loaderContainer: {
    position: 'absolute',
    zIndex: 15,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  loadingText: {
    marginTop: wp('2'),
  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    padding: wp('5'),
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderRadius: wp('3'),
  },
  errorIcon: {
    fontSize: wp('10'),
    marginBottom: wp('3'),
  },
  retryButton: {
    marginTop: wp('4'),
    paddingVertical: wp('2'),
    paddingHorizontal: wp('4'),
    backgroundColor: THEME.colors.white,
    borderRadius: wp('2'),
  },
});