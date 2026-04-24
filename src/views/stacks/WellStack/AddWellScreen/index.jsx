import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { AppHeader } from "../../../../components/headers/AppHeader";
import { THEME } from "../../../../styles/theme";
import { useNavigation } from "@react-navigation/native";
import { wp } from "../../../../assets/utils/helperResponsive";
import { country } from "../../../../styles/main.style";
import { ButtonGeneral } from "../../../../components/atoms/ButtonGeneral";
import { StepIndicatorItem } from "../../../../components/molecules/StepIndicatorItem";
import { AddWellFormStep1 } from "../../../../components/organims/AddWellFormStep1";
import { AddWellFormStep2 } from "../../../../components/organims/AddWellFormStep2";
import { AddWellFormStep3 } from "../../../../components/organims/AddWellFormStep3";
import { useDispatch, useSelector } from "react-redux";
import {
  setErrorModalAction,
  setErrorTextAction,
  setSuccessModalAction,
  setSuccessTextAction,
} from "../../../../redux/modals";
import { addWell } from "../../../../assets/api/fetchWells";
import { resetWellAddDataAction } from "../../../../redux/wells";
import { useQueryClient } from "@tanstack/react-query";
import { sendOfferProposed } from "../../../../assets/api/fetchRequests";
import { compressVideo, cleanupCompressedVideo } from "../../../../assets/utils/videoCompressor";

export const AddWellScreen = ({ route }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const status = route?.params?.status;
  const wellAdd = useSelector((s) => s.wellState.wellAddData);
  const requestSelect = useSelector((s) => s.requestState.requestSelected);
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const LOCATION = "Location";
  const TERRAIN = "TERRAIN";

  // Validation étape 1 (inchangée)
  const validateStep1 = () => {
    const { operations, categories_Biens, pays, villes, commune_quartiers } = wellAdd;

    if (operations?.type_operation?.toUpperCase() === LOCATION?.toUpperCase() &&
        categories_Biens?.nom_categorie?.toUpperCase() === TERRAIN) {
      dispatch(setErrorModalAction(true));
      dispatch(
        setErrorTextAction(
          "Un terrain ne peut pas être en location, veuillez choisir un autre type d'opération"
        )
      );
      return false;
    }

    if (operations?.type_operation &&
        categories_Biens?.nom_categorie &&
        pays?.nom &&
        villes?.nom &&
        commune_quartiers?.nom) {
      return true;
    }

    dispatch(setErrorModalAction(true));
    dispatch(setErrorTextAction("Veuillez remplir tous les champs obligatoires"));
    return false;
  };

  // Validation étape 2 (inchangée)
  const validateStep2 = () => {
    const { operations, categories_Biens, pieces, loyer, montant_vente, description, superficie } = wellAdd;
    const isLocation = operations?.type_operation?.toUpperCase() === LOCATION.toUpperCase();
    const isTerrain = categories_Biens?.nom_categorie?.toUpperCase() === TERRAIN;

    if (isLocation) {
      if (pieces && loyer && description) {
        return true;
      }
      dispatch(setErrorModalAction(true));
      dispatch(setErrorTextAction("Veuillez remplir tous les champs obligatoires (pièces, loyer, description)"));
      return false;
    }

    if (!isLocation && !isTerrain) {
      if (pieces && montant_vente && description && superficie) {
        return true;
      }
      dispatch(setErrorModalAction(true));
      dispatch(setErrorTextAction("Veuillez remplir tous les champs obligatoires"));
      return false;
    }

    if (!isLocation && isTerrain) {
      if (montant_vente && description && superficie) {
        return true;
      }
      dispatch(setErrorModalAction(true));
      dispatch(setErrorTextAction("Veuillez remplir tous les champs obligatoires"));
      return false;
    }

    dispatch(setErrorModalAction(true));
    dispatch(setErrorTextAction("Veuillez remplir tous les champs obligatoires"));
    return false;
  };

  // ✅ Préparation du FormData avec vidéo déjà compressée
  const prepareFormData = async () => {
    const formData = new FormData();
    
    // Ajouter les champs de base
    formData.append('operations', wellAdd.operations?.id);
    formData.append('categories_Biens', wellAdd.categories_Biens?.id);
    formData.append('pays', 1);
    formData.append('villes', wellAdd.villes?.id);
    formData.append('commune_quartiers', wellAdd.commune_quartiers?.id);
    formData.append('zone_precise', wellAdd.zone_precise || "");
    formData.append('longitude', null);
    formData.append('largitude', null);
    formData.append('description', wellAdd.description || "");
    formData.append('pieces', wellAdd.pieces || 0);
    formData.append('loyer', wellAdd.loyer || 0);
    formData.append('montant_vente', wellAdd.montant_vente || 0);
    formData.append('document', wellAdd.document || "");
    formData.append('superficie', wellAdd.superficie || 0);

    // ✅ Ajouter les images (déjà en base64)
    if (wellAdd.images && wellAdd.images.length > 0) {
      wellAdd.images.forEach((image, index) => {
        if (image?.path) {
          formData.append(`images_${index + 1}`, {
            uri: image.path,
            name: image.filename || `image_${index + 1}.jpg`,
            type: image.mime || 'image/jpeg',
          });
        }
      });
    }

    // ✅ Ajouter la vidéo (déjà compressée dans AddWellFormStep3)
    if (wellAdd.video?.uri) {
      console.log("📹 Ajout de la vidéo compressée au FormData");
      console.log(`   Taille: ${(wellAdd.video.compressedSize / (1024 * 1024)).toFixed(1)} MB`);
      console.log(`   Compressée: ${wellAdd.video.isCompressed ? 'Oui' : 'Non'}`);
      
      formData.append('video', {
        uri: wellAdd.video.uri,
        name: wellAdd.video.name || 'video.mp4',
        type: wellAdd.video.type || 'video/mp4',
      });
    }

    return formData;
  };

  // ✅ Soumission des données
  const submitData = async () => {
    // Vérifier qu'il y a au moins une image
    if (!wellAdd.images || wellAdd.images.length <= 0) {
      dispatch(setErrorModalAction(true));
      dispatch(setErrorTextAction("Veuillez ajouter au moins une image"));
      return false;
    }

    // ✅ Avertir si la vidéo est volumineuse
    if (wellAdd.video && wellAdd.video.compressedSize) {
      const videoSizeMB = wellAdd.video.compressedSize / (1024 * 1024);
      if (videoSizeMB > 8) {
        Alert.alert(
          "Vidéo volumineuse",
          `La vidéo fait ${videoSizeMB.toFixed(1)} MB. L'envoi peut prendre plus de temps. Continuer ?`,
          [
            { text: "Annuler", style: "cancel" },
            { text: "Continuer", onPress: () => performSubmission() }
          ]
        );
        return;
      }
    }

    await performSubmission();
  };

  // ✅ Fonction de soumission réelle
  const performSubmission = async () => {
    setLoading(true);
    setUploadProgress(0);
    dispatch(setErrorModalAction(false));
    dispatch(setErrorTextAction(""));

    try {
      const formData = await prepareFormData();
      
      console.log("📤 Début de l'envoi au serveur...");
      
      let response;
      if (status === "offered") {
        formData.append("process", "new");
        formData.append("demande_id", requestSelect?.demande_id);
        formData.append("bien_existing", false);
        
        response = await sendOfferProposed(formData, wellAdd.operations?.id);
        
        if (response?.statuscode === 200) {
          handleSuccess(response?.message || "Offre envoyée avec succès");
          return true;
        } else {
          throw new Error(response?.message || "Erreur lors de l'envoi de l'offre");
        }
      } else {
        response = await addWell(formData);
        
        if (response?.data?.statuscode === 200) {
          handleSuccess(response?.data?.message || "Bien ajouté avec succès");
          return true;
        } else {
          throw new Error(response?.data?.message || "Erreur lors de l'ajout du bien");
        }
      }
    } catch (error) {
      console.error("❌ Erreur lors de la soumission:", error);
      dispatch(setErrorModalAction(true));
      dispatch(setErrorTextAction(error.message || "Une erreur est survenue"));
      return false;
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  // ✅ Gestion du succès
  const handleSuccess = (message) => {
    dispatch(setSuccessModalAction(true));
    dispatch(setSuccessTextAction(message));
    queryClient.invalidateQueries("wells");
    
    // Nettoyer les fichiers temporaires
    if (wellAdd.video?.uri) {
      cleanupCompressedVideo(wellAdd.video.uri);
    }
    
    setTimeout(() => {
      dispatch(resetWellAddDataAction());
      navigation.goBack();
    }, 1500);
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNext = async () => {
    if (currentStep === 1) {
      const isValid = validateStep1();
      if (isValid) {
        setCurrentStep(currentStep + 1);
      }
      return;
    }

    if (currentStep === 2) {
      const isValid = validateStep2();
      if (isValid) {
        setCurrentStep(currentStep + 1);
      }
      return;
    }

    if (currentStep === 3) {
      await submitData();
    }
  };

  const addWellForm = useMemo(() => {
    switch (currentStep) {
      case 1:
        return <AddWellFormStep1 />;
      case 2:
        return <AddWellFormStep2 />;
      case 3:
        return <AddWellFormStep3 />;
      default:
        return null;
    }
  }, [currentStep]);

  return (
    <View style={styles.container}>
      <AppHeader
        title={status === "offered" ? "PROPOSER UN BIEN" : "AJOUTER UN BIEN"}
        titleColor={THEME.colors.black}
        onLeftPress={() => navigation.goBack()}
        withLeftBtn={true}
      />

      <StepIndicatorItem currentStep={currentStep} />

      <View style={styles.formContainer}>{addWellForm}</View>

      <View style={styles.buttonsContainer}>
        {currentStep > 1 && (
          <ButtonGeneral
            btnStyle={styles.buttonText}
            text={"RETOUR"}
            onPress={handlePrevious}
            disabled={currentStep === 1 || loading || isCompressing}
            backgroundColor={THEME.colors.gray}
          />
        )}
        <ButtonGeneral
          btnStyle={currentStep === 1 ? { width: "100%" } : { width: "50%" }}
          text={
            loading 
              ? `Envoi en cours... ${uploadProgress > 0 ? uploadProgress + '%' : ''}`
              : currentStep < 3 
                ? "SUIVANT" 
                : "SOUMETTRE"
          }
          onPress={handleNext}
          loading={loading || isCompressing}
          disabled={loading || isCompressing}
          backgroundColor={
            currentStep < 3 ? THEME.colors.primary : THEME.colors.green
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME.colors.white,
    flex: 1,
    paddingHorizontal: country,
  },
  formContainer: {
    flex: 1,
    marginBottom: wp("20%"),
  },
  buttonsContainer: {
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    height: wp("20%"),
    width: "100%",
    backgroundColor: THEME.colors.white,
    alignSelf: "center",
    paddingHorizontal: country,
  },
  buttonText: {
    width: wp("45%"),
    alignSelf: "center",
  },
});