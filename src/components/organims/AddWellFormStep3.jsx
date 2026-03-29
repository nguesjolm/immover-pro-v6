import React, { useState } from "react";
import { Image, StyleSheet, View, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { THEME } from "../../styles/theme";
import { country, planet } from "../../styles/main.style";
import { TextVariant } from "../atoms/TextVariant";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { hp, wp } from "../../assets/utils/helperResponsive";
import { ButtonCustom } from "../atoms/ButtonCustom";
import * as ImagePicker from "expo-image-picker";
import { Video } from "expo-av";
import { useDispatch, useSelector } from "react-redux";
import { setWellAddDataAction } from "../../redux/wells";
import { compressVideo, cleanupCompressedVideo } from "../../assets/utils/videoCompressor";

export const AddWellFormStep3 = () => {
  //
  const dispatch = useDispatch();
  const [permission, requestPermission] = ImagePicker.useCameraPermissions();
  const [videoPermission, requestVideoPermission] = ImagePicker.useCameraPermissions();
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);
  const [loadingImages, setLoadingImages] = useState(false);
  const [loadingVideo, setLoadingVideo] = useState(false);
  const wellAdd = useSelector((s) => s.wellState.wellAddData);

  // Charger les images existantes depuis Redux au montage
  React.useEffect(() => {
    if (wellAdd?.images && wellAdd.images.length > 0) {
      setImages(wellAdd.images);
    }
    if (wellAdd?.video) {
      setVideo(wellAdd.video);
    }
  }, []);

  const handleAddImage = async () => {
    try {
      setLoadingImages(true);
      let imagesList = [...images];
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.7,
        aspect: [4, 3],
        base64: true,
        allowsMultipleSelection: true,
        multiple: true,
      });

      if (!result.canceled) {
        const newImages = await Promise.all(
          result.assets.map(async (image) => ({
            filename: image.uri.split("/").pop(),
            path: image.uri,
            data: image.base64,
            mine: 'image/jpg',
            loading: true,
          }))
        );
        
        imagesList.push(...newImages);
        setImages(imagesList);
        dispatch(setWellAddDataAction({ ...wellAdd, images: imagesList }));
        
        setTimeout(() => {
          const updatedImages = imagesList.map(img => ({ ...img, loading: false }));
          setImages(updatedImages);
          dispatch(setWellAddDataAction({ ...wellAdd, images: updatedImages }));
        }, 500);
      }
    } catch (error) {
      console.error("Error picking an image: ", error);
      Alert.alert("Erreur", "Une erreur est survenue lors de la sélection des images");
    } finally {
      setLoadingImages(false);
    }
  };

  const handleRemoveImage = (indexToRemove) => {
    Alert.alert(
      "Supprimer l'image",
      "Voulez-vous vraiment supprimer cette image ?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          onPress: () => {
            const newImages = images.filter((_, index) => index !== indexToRemove);
            setImages(newImages);
            dispatch(setWellAddDataAction({ ...wellAdd, images: newImages }));
          },
          style: "destructive",
        },
      ]
    );
  };

  const handleAddVideo = async () => {
    try {
      setLoadingVideo(true);
      
      // Vérifier la permission
      if (videoPermission?.status !== ImagePicker.PermissionStatus.GRANTED) {
        const { granted } = await requestVideoPermission();
        if (!granted) {
          Alert.alert("Permission requise", "Veuillez autoriser l'accès à la galerie pour ajouter une vidéo");
          return;
        }
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        quality: 0.8,
        allowsEditing: false,
        allowsMultipleSelection: false,
      });

      if (!result.canceled) {
        const videoAsset = result.assets[0];
        const videoUri = videoAsset.uri;
        const isMP4 = videoUri.toLowerCase().includes('.mp4') || videoAsset.mimeType === 'video/mp4';
        
        // ✅ Vérifier le format MP4
        if (!isMP4) {
          Alert.alert(
            "Format non supporté",
            "Veuillez sélectionner une vidéo au format MP4 uniquement.\n\nLes formats MOV, HEVC, etc. ne sont pas supportés."
          );
          return;
        }
        
        // ✅ Vérifier la taille avec compressVideo
        const compressed = await compressVideo(videoUri, { maxSizeMB: 50 });
        
        if (!compressed) {
          Alert.alert(
            "Vidéo trop volumineuse",
            "La vidéo ne doit pas dépasser 50MB. Veuillez choisir une vidéo plus petite."
          );
          return;
        }
        
        // ✅ Vérifier la durée (max 60 secondes)
        if (videoAsset.duration && videoAsset.duration > 60000) {
          Alert.alert("Erreur", "La vidéo ne doit pas dépasser 60 secondes");
          return;
        }

        const videoData = {
          uri: compressed.uri,
          name: compressed.name,
          type: compressed.type,
          size: compressed.compressedSize,
          duration: videoAsset.duration,
          loading: true,
        };
        
        setVideo(videoData);
        dispatch(setWellAddDataAction({ ...wellAdd, video: videoData }));
        
        setTimeout(() => {
          const updatedVideo = { ...videoData, loading: false };
          setVideo(updatedVideo);
          dispatch(setWellAddDataAction({ ...wellAdd, video: updatedVideo }));
        }, 500);
      }
    } catch (error) {
      console.error("Error picking a video: ", error);
      Alert.alert("Erreur", "Une erreur est survenue lors de la sélection de la vidéo");
    } finally {
      setLoadingVideo(false);
    }
  };

  const handleRemoveVideo = () => {
    Alert.alert(
      "Supprimer la vidéo",
      "Voulez-vous vraiment supprimer cette vidéo ?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          onPress: async () => {
            // ✅ Nettoyer le fichier compressé si nécessaire
            if (video?.uri && video.uri.includes('compressed_')) {
              await cleanupCompressedVideo(video.uri);
            }
            setVideo(null);
            dispatch(setWellAddDataAction({ ...wellAdd, video: null }));
          },
          style: "destructive",
        },
      ]
    );
  };

  // Vérification des permissions pour les images
  if (permission?.status !== ImagePicker.PermissionStatus.GRANTED) {
    return (
      <View style={styles.container}>
        <TextVariant text={"Permission requise"} variant={"title5"} />
        <ButtonCustom
          label={"Autoriser l'accès à la galerie"}
          labelVariant={"title5"}
          labelColor={THEME.colors.primary}
          onPress={requestPermission}
          btnStyle={styles.btnStyle}
          labelTransform={"uppercase"}
        />
      </View>
    );
  }

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Section Images */}
      <View style={styles.section}>
        <View style={styles.header}>
          <TextVariant
            text={"Images des biens"}
            variant={"title5"}
            marginBottom={planet}
          />
          <ButtonCustom
            label={loadingImages ? "Chargement..." : "Sélectionner"}
            labelVariant={"title5"}
            height={hp("6%")}
            labelColor={THEME.colors.primary}
            onPress={handleAddImage}
            disabled={loadingImages}
            btnStyle={loadingImages && styles.disabledButton}
          />
        </View>

        <View style={styles.imageContainer}>
          {images?.map((image, index) => (
            <View key={index} style={styles.imageWrapper}>
              {image.loading ? (
                <View style={[styles.image, styles.loadingContainer]}>
                  <ActivityIndicator size="small" color={THEME.colors.primary} />
                </View>
              ) : (
                <>
                  <TouchableOpacity
                    onLongPress={() => handleRemoveImage(index)}
                    activeOpacity={0.7}
                  >
                    <Image
                      source={{ uri: image?.path }}
                      style={styles.image}
                    />
                    <TouchableOpacity
                      style={styles.removeButton}
                      onPress={() => handleRemoveImage(index)}
                    >
                      <TextVariant text="✕" color={THEME.colors.white} style={styles.removeText} />
                    </TouchableOpacity>
                  </TouchableOpacity>
                </>
              )}
            </View>
          ))}
          
          {images.length === 0 && !loadingImages && (
            <View style={styles.emptyContainer}>
              <TextVariant
                text="Aucune image sélectionnée"
                variant="smallText"
                color={THEME.colors.gray}
                textAlign="center"
              />
            </View>
          )}
          
          {loadingImages && images.length === 0 && (
            <View style={styles.emptyContainer}>
              <ActivityIndicator size="large" color={THEME.colors.primary} />
              <TextVariant
                text="Chargement des images..."
                variant="smallText"
                color={THEME.colors.gray}
                textAlign="center"
                marginTop={hp(1)}
              />
            </View>
          )}
        </View>
        
        <TextVariant
          text={`${images.filter(img => !img.loading).length}/${images.length} images chargées`}
          variant="smallText"
          color={THEME.colors.gray}
          marginTop={hp(0.5)}
        />
      </View>

      {/* Section Vidéo */}
      <View style={styles.section}>
        <View style={styles.header}>
          <TextVariant
            text={'Vidéo du bien (optionnel)'}
            variant={'title5'}
            marginBottom={planet}
          />
          {!video && (
            <ButtonCustom
              label={loadingVideo ? "Chargement..." : "Ajouter"}
              labelVariant={'title5'}
              height={hp('6%')}
              labelColor={THEME.colors.primary}
              onPress={handleAddVideo}
              disabled={loadingVideo}
              btnStyle={loadingVideo && styles.disabledButton}
            />
          )}
        </View>

        <View style={styles.videoContainer}>
          {video ? (
            <View style={styles.videoPreviewContainer}>
              {video.loading ? (
                <View style={[styles.videoPreview, styles.loadingContainer]}>
                  <ActivityIndicator size="large" color={THEME.colors.white} />
                  <TextVariant
                    text="Chargement de la vidéo..."
                    variant="smallText"
                    color={THEME.colors.white}
                    textAlign="center"
                    marginTop={hp(1)}
                  />
                </View>
              ) : (
                <>
                  <Video
                    source={{ uri: video.uri }}
                    style={styles.videoPreview}
                    useNativeControls
                    resizeMode="contain"
                    isLooping={false}
                    shouldPlay={false}
                  />
                  <TouchableOpacity
                    style={styles.removeVideoButton}
                    onPress={handleRemoveVideo}
                  >
                    <TextVariant text="✕" color={THEME.colors.white} style={styles.removeText} />
                  </TouchableOpacity>
                  <View style={styles.videoInfo}>
                    <TextVariant
                      text={video.name}
                      variant="smallText"
                      color={THEME.colors.gray}
                      numberOfLines={1}
                      style={styles.videoName}
                    />
                    <TextVariant
                      text={`${(video.size / (1024 * 1024)).toFixed(1)} MB`}
                      variant="smallText"
                      color={THEME.colors.gray}
                    />
                  </View>
                </>
              )}
            </View>
          ) : (
            <TouchableOpacity 
              style={styles.addVideoButton} 
              onPress={handleAddVideo}
              disabled={loadingVideo}
            >
              {loadingVideo ? (
                <>
                  <ActivityIndicator size="large" color={THEME.colors.primary} />
                  <TextVariant
                    text="Chargement de la vidéo..."
                    variant="bodyText"
                    color={THEME.colors.primary}
                    textAlign="center"
                    marginTop={hp(1)}
                  />
                </>
              ) : (
                <>
                  <TextVariant
                    text="+ Ajouter une vidéo"
                    variant="bodyText"
                    color={THEME.colors.primary}
                    textAlign="center"
                  />
                  <TextVariant
                    text="MP4 uniquement - Max 50MB, 60 secondes"
                    variant="smallText"
                    color={THEME.colors.gray}
                    textAlign="center"
                    marginTop={hp(0.5)}
                  />
                </>
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME.colors.white,
    width: "100%",
    paddingVertical: planet,
  },
  section: {
    marginBottom: hp(2),
    paddingHorizontal: country,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: hp(1),
  },
  imageContainer: {
    width: "100%",
    height: "auto",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: wp(2),
  },
  imageWrapper: {
    position: "relative",
  },
  image: {
    width: wp("28%"),
    height: wp("28%"),
    borderWidth: 1,
    borderColor: THEME.colors.gray,
    borderRadius: 10,
    backgroundColor: THEME.colors.darkLight,
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: THEME.colors.darkLight,
  },
  removeButton: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: THEME.colors.red || "red",
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  removeText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  emptyContainer: {
    width: "100%",
    height: wp("30%"),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: THEME.colors.darkLight,
    borderRadius: 10,
  },
  videoContainer: {
    width: "100%",
    marginTop: hp(1),
  },
  addVideoButton: {
    width: "100%",
    height: hp("20%"),
    borderWidth: 2,
    borderColor: THEME.colors.primary,
    borderStyle: "dashed",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: THEME.colors.darkLight + "20",
  },
  videoPreviewContainer: {
    width: "100%",
    position: "relative",
  },
  videoPreview: {
    width: "100%",
    height: hp("25%"),
    borderRadius: 10,
    backgroundColor: THEME.colors.black,
  },
  removeVideoButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 20,
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  videoInfo: {
    marginTop: hp(1),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  videoName: {
    flex: 1,
    marginRight: wp(2),
  },
  btnStyle: {
    marginVertical: planet,
  },
  disabledButton: {
    opacity: 0.6,
  },
});