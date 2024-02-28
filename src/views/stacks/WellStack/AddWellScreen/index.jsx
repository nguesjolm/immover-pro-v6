import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
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
import { useQueryClient } from "react-query";
import { sendOfferProposed } from "../../../../assets/api/fetchRequests";

const SALE = "Vente";
const LOCATION = "Location";
const PREFINANCEMENT = "PREFINANCEMENT";
const LAND = "Terrain";

export const AddWellScreen = ({ route }) => {
  //
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const status = route?.params?.status;
  const wellAdd = useSelector((s) => s.wellState.wellAddData);
  const requestSelect = useSelector((s) => s.requestState.requestSelected);
  const [currentStep, setCurrentStep] = React.useState(1);
  const [loading, setLoading] = React.useState(false);

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNext = async () => {
    const { operations, categories_Biens, pays, villes, commune_quartiers } =
      wellAdd;

    if (currentStep === 1) {
      if (
        operations?.type_operation?.toUpperCase() === LOCATION?.toUpperCase() &&
        categories_Biens?.nom_categorie?.toUpperCase() === "TERRAIN"
      ) {
        dispatch(setErrorModalAction(true));
        dispatch(
          setErrorTextAction(
            "Un terrain ne peut pas être en location, veuillez choisir un autre type d'operation"
          )
        );
      } else if (
        operations?.type_operation &&
        categories_Biens?.nom_categorie &&
        pays?.nom &&
        villes?.nom &&
        commune_quartiers?.nom
      ) {
        setCurrentStep(currentStep + 1);
      } else {
        dispatch(setErrorModalAction(true));
        dispatch(
          setErrorTextAction("Veuillez remplir tous les champs obligatoires")
        );
      }
    }

    if (currentStep === 2) {
      // IS LOCATION
      if (operations?.type_operation?.toUpperCase() === "LOCATION") {
        if (wellAdd?.pieces && wellAdd?.loyer && wellAdd?.description) {
          setCurrentStep(currentStep + 1);
        } else {
          dispatch(setErrorModalAction(true));
          dispatch(
            setErrorTextAction("Veuillez remplir tous les champs obligatoires")
          );
        }
      }

      // IS SALE WITHOUT LAND
      if (
        operations?.type_operation?.toUpperCase() !== "LOCATION" &&
        categories_Biens?.nom_categorie?.toUpperCase() !== "TERRAIN"
      ) {
        if (
          wellAdd?.pieces &&
          wellAdd?.montant_vente &&
          wellAdd?.description &&
          wellAdd?.superficie
        ) {
          setCurrentStep(currentStep + 1);
        } else {
          console.log("here");
          dispatch(setErrorModalAction(true));
          dispatch(
            setErrorTextAction("Veuillez remplir tous les champs obligatoires")
          );
        }
      }
    }

    // IS SALE WITH LAND
    if (
      currentStep === 2 &&
      operations?.type_operation?.toUpperCase() !== "LOCATION" &&
      categories_Biens?.nom_categorie?.toUpperCase() === "TERRAIN"
    ) {
      if (
        wellAdd?.montant_vente &&
        wellAdd?.description &&
        wellAdd?.superficie
      ) {
        setCurrentStep(currentStep + 1);
      } else {
        console.log("here ici");
        dispatch(setErrorModalAction(true));
        dispatch(
          setErrorTextAction("Veuillez remplir tous les champs obligatoires")
        );
      }
    }

    // SEND DATA TO API
    if (currentStep === 3) {
      if (wellAdd?.images.length <= 0) {
        dispatch(setErrorModalAction(true));
        dispatch(setErrorTextAction("Veuillez ajouter au moins une image"));
      } else {
        // setLoading(true);
        // dispatch(setErrorModalAction(false));
        // dispatch(setErrorTextAction(""));

        const payload = {
          operations: operations?.id,
          categories_Biens: categories_Biens?.id,
          pays: 1,
          villes: villes?.id,
          commune_quartiers: commune_quartiers?.id,
          zone_precise: wellAdd?.zone_precise || "",
          longitude: null,
          largitude: null,
          description: wellAdd?.description || "",
          pieces: wellAdd?.pieces || 0,
          loyer: wellAdd?.loyer || 0,
          montant_vente: wellAdd?.montant_vente,
          document: wellAdd?.document || "",
          superficie: wellAdd?.superficie || 0,
          images_1: wellAdd?.images[0] || null,
          images_2: wellAdd?.images[1] || null,
          images_3: wellAdd?.images[2] || null,
          images_4: wellAdd?.images[3] || null,
          images_5: wellAdd?.images[4] || null,
          images_6: wellAdd?.images[5] || null,
          images_7: wellAdd?.images[6] || null,
          images_8: wellAdd?.images[7] || null,
          images_9: wellAdd?.images[8] || null,
          video: null,
        };

        // console.log("====================================");
        // console.log("payload", payload);
        // console.log("====================================");

        // formData
        const formData = new FormData();
        formData.append("operations", payload?.operations);
        formData.append("categories_Biens", payload?.categories_Biens);
        formData.append("pays", payload?.pays);
        formData.append("villes", payload?.villes);
        formData.append("commune_quartiers", payload?.commune_quartiers);
        formData.append("zone_precise", payload?.zone_precise);
        formData.append("longitude", payload?.longitude);
        formData.append("largitude", payload?.largitude);
        formData.append("description", payload?.description);

        formData.append("pieces", payload?.pieces);
        formData.append("loyer", payload?.loyer);
        formData.append("montant_vente", payload?.montant_vente);
        formData.append("document", payload?.document);
        formData.append("superficie", payload?.superficie);

        // map images
        wellAdd?.images?.map((image, index) => {
          formData.append(`images_${index + 1}`, {
            uri: image?.path,
            name: image?.filename || `image_${index + 1}`,
            type: image?.mine,
          });
        });

        let response = null;
        if (status === "offered") {
          formData.append("process", "new");
          formData.append("demande_id", requestSelect?.demande_id);
          formData.append("bien_existing", false);
          response = await sendOfferProposed(formData, payload?.operations);
        } else {
          response = await addWell(formData);
        }

        if (response?.statuscode === 200) {
          setLoading(false);
          dispatch(resetWellAddDataAction());
          if (status !== "offered") {
            dispatch(setSuccessModalAction(true));
            dispatch(
              setSuccessTextAction("Votre bien a été ajouté avec succès")
            );
            navigation.navigate("Well");
            queryClient.invalidateQueries("wells");
          } else {
            dispatch(setSuccessModalAction(true));
            dispatch(
              setSuccessTextAction(
                "Votre proposition a été envoyée avec succès"
              )
            );
            navigation.navigate("Home");
            queryClient.invalidateQueries("wells");
          }
        }
      }
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
            disabled={currentStep === 1}
            backgroundColor={THEME.colors.gray}
          />
        )}
        <ButtonGeneral
          btnStyle={currentStep === 1 ? { width: "100%" } : { width: "50%" }}
          text={currentStep < 3 ? "SUIVANT" : "SOUMETTRE"}
          onPress={handleNext}
          loading={loading}
          disabled={loading}
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
  },
  buttonText: {
    width: wp("45%"),
    alignSelf: "center",
  },
});
