import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View, ScrollView, ActivityIndicator } from 'react-native';
import { planet } from '../../styles/main.style';
import { FileInput } from '../../components/atoms/FileInput';
import { TextVariant } from '../../components/atoms/TextVariant';
import { useDispatch, useSelector } from 'react-redux';
import { setCniAction } from '../../redux/register';
import { THEME } from '../../styles/theme';

export const ChooseProfileCard = () => {
  const dispatch = useDispatch();
  const identity = useSelector((s) => s.registerState.identite);
  const cni = useSelector((s) => s.registerState.cni);
  const [file, setFile] = React.useState(null);  // ✅ Changé : null au lieu de []
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (file) {
      dispatch(setCniAction([file]));  // Envoyer comme tableau pour Redux
    } else {
      dispatch(setCniAction([]));
    }
    
    setLoading(false);
    setProcessing(false);
  }, [file]);

  const handleFileSelection = async (selectedFiles) => {
    // Si pas de fichier ou suppression
    if (!selectedFiles || selectedFiles.length === 0) {
      setFile(null);
      setLoading(false);
      setProcessing(false);
      return;
    }
    
    setLoading(true);
    setProcessing(true);
    
    // ✅ Prendre uniquement le premier fichier
    const singleFile = selectedFiles[0];
    
    // Simulation du traitement
    await new Promise(resolve => setTimeout(resolve, 300));
    
    setFile(singleFile);
  };

  return (
    <View>
      <TextVariant
        text={'3- Déposez votre pièce d’identité'}
        variant={'title3'}
        marginBottom={planet}
      />

      <View style={styles.content}>
        <View>
          <TextVariant
            text={
              identity === 'Agence immobilière agrée'
                ? 'Photo de votre CNI'
                : "Photo de votre RCCM ou photo de votre CNI"
            }
            variant={'title4'}
          />
          
          {loading && (
            <View style={styles.loadingGlobalContainer}>
              <ActivityIndicator size="large" color={THEME.colors.primary} />
              <TextVariant 
                text="Traitement de l'image en cours..." 
                variant="title5"
                marginTop={10}
              />
            </View>
          )}

          <FileInput 
            withCam={true} 
            setFile={handleFileSelection} 
            files={file ? [file] : []}  // Convertir en tableau pour FileInput
            loading={loading}
          />
        </View>

        {/* Affichage de l'image sélectionnée */}
        {file && (
          <View style={styles.previewSection}>
            <TextVariant 
              text="1 image sélectionnée"
              variant="title5"
              marginBottom={10}
            />
            <View style={styles.previewContainer}>
              <View style={styles.previewItem}>
                <Image source={{ uri: file.uri }} style={styles.previewImage} />
                
                {loading && processing && (
                  <View style={styles.imageLoadingOverlay}>
                    <ActivityIndicator size="small" color={THEME.colors.white} />
                  </View>
                )}
                
                <View style={styles.imageBadge}>
                  <TextVariant text="1" color={THEME.colors.white} variant="small" />
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Affichage de l'image sauvegardée */}
        {!file && cni && cni.length > 0 && (
          <View style={styles.previewSection}>
            <TextVariant 
              text="Image sauvegardée"
              variant="title5"
              marginBottom={10}
            />
            <View style={styles.savedPreview}>
              <View style={styles.previewItem}>
                <Image source={{ uri: cni[0].uri }} style={styles.savedImage} />
                <View style={styles.imageBadge}>
                  <TextVariant text="1" color={THEME.colors.white} variant="small" />
                </View>
              </View>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  content: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  loadingGlobalContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    borderRadius: 10,
    padding: 20,
  },
  previewSection: {
    marginTop: planet,
  },
  previewContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  previewItem: {
    position: 'relative',
    marginRight: 10,
  },
  previewImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  savedPreview: {
    flexDirection: 'row',
    marginTop: 5,
  },
  savedImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 10,
    marginRight: 10,
  },
  imageLoadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  imageBadge: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: THEME.colors.primary,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});