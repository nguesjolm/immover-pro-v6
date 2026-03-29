import { StyleSheet, TouchableOpacity, View, ScrollView, Image } from 'react-native';
import { TextVariant } from './TextVariant';
import { hp } from '../../assets/utils/helperResponsive';
import { THEME } from '../../styles/theme';
import { city, country, street } from '../../styles/main.style';
import * as ImagePicker from 'expo-image-picker';
import { ButtonCustom } from './ButtonCustom';

export const FileInput = ({ withCam, style, setFile, files = [] }) => {
  //
  const [permission, requestPermission] = ImagePicker.useCameraPermissions();

  const selectImageFromGallery = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.7,
        aspect: [4, 3],
        base64: true,
        allowsMultipleSelection: true, // ✅ Permet la sélection multiple
        selectionLimit: 10, // Limite à 10 images (optionnel)
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        // Transformer chaque asset en objet image
        const images = result.assets.map(asset => ({
          uri: asset.uri,
          name: asset.uri.split('/').pop() || 'image.jpg',
          type: 'image/jpeg',
          base64: asset.base64,
          width: asset.width,
          height: asset.height,
          fileName: asset.fileName,
          mimeType: asset.mimeType,
        }));
        
        setFile(images); // ✅ Envoyer un tableau d'images
      }
    } catch (error) {
      console.error('Error picking an image: ', error);
    }
  };

  // camera (toujours une seule image)
  const selectImageFromCamera = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.7,
        aspect: [4, 3],
        base64: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        const image = {
          uri: asset.uri,
          name: asset.uri.split('/').pop() || 'camera_image.jpg',
          type: 'image/jpeg',
          base64: asset.base64,
          width: asset.width,
          height: asset.height,
        };
        setFile([image]); // ✅ Envoyer un tableau avec une seule image
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  // Fonction pour supprimer une image
  const removeImage = (indexToRemove) => {
    const newFiles = files.filter((_, index) => index !== indexToRemove);
    setFile(newFiles);
  };

  if (permission?.status !== ImagePicker.PermissionStatus.GRANTED && withCam) {
    return (
      <View style={styles.emptyContainer}>
        <TextVariant
          text={'Permission requise'}
          variant={'title5'}
          marginBottom={country}
        />
        <ButtonCustom
          label={"Autoriser l'accès à la caméra"}
          labelVariant={'title5'}
          labelColor={THEME.colors.primary}
          onPress={requestPermission}
          btnStyle={styles.btnStyle}
          labelTransform={'uppercase'}
        />
      </View>
    );
  }

  return (
    <View>
      <View style={[styles.container, style]}>
        <TouchableOpacity
          onPress={selectImageFromGallery}
          style={styles.btnSection}
        >
          <TextVariant 
            text={files.length > 0 ? 'Ajouter d\'autres fichiers' : 'Choisir un fichier'} 
            marginLeft={street} 
          />
          {files.length > 0 && (
            <TextVariant 
              text={`(${files.length} sélectionné${files.length > 1 ? 's' : ''})`}
              color={THEME.colors.primary}
              marginLeft={street}
            />
          )}
        </TouchableOpacity>
      </View>
      
      {withCam && (
        <TouchableOpacity
          onPress={selectImageFromCamera}
          style={styles.btnCamera}
        >
          <TextVariant
            text={'Prendre une photo'}
            color={THEME.colors.white}
            marginLeft={street}
          />
        </TouchableOpacity>
      )}

      {/* Aperçu des images sélectionnées */}
      {files.length > 0 && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.previewContainer}>
          {files.map((file, index) => (
            <View key={index} style={styles.previewItem}>
              <Image source={{ uri: file.uri }} style={styles.previewImage} />
              <TouchableOpacity 
                style={styles.removeButton}
                onPress={() => removeImage(index)}
              >
                <TextVariant text="×" color={THEME.colors.white} variant="title3" />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp('1%'),
    borderWidth: hp('0.15%'),
    borderColor: THEME.colors.darkLight,
    paddingHorizontal: street,
    borderRadius: city,
    height: hp('7%'),
  },
  emptyContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: hp('15%'),
  },
  btnCamera: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: THEME.colors.black,
    borderRadius: city,
    height: hp('7%'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp('1%'),
  },
  previewContainer: {
    flexDirection: 'row',
    marginTop: hp('2%'),
    maxHeight: hp('12%'),
  },
  previewItem: {
    position: 'relative',
    marginRight: street,
  },
  previewImage: {
    width: hp('10%'),
    height: hp('10%'),
    borderRadius: city,
  },
  removeButton: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: THEME.colors.error || 'red',
    width: hp('3%'),
    height: hp('3%'),
    borderRadius: hp('1.5%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
});