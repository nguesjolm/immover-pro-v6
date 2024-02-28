import React, { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { THEME } from "../../styles/theme";
import { country, planet } from "../../styles/main.style";
import { TextVariant } from "../atoms/TextVariant";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { hp, wp } from "../../assets/utils/helperResponsive";
import { ButtonCustom } from "../atoms/ButtonCustom";
import * as ImagePicker from "expo-image-picker";
// import { manipulateAsync } from "expo-image-manipulator";
import { useDispatch, useSelector } from "react-redux";
import { setWellAddDataAction } from "../../redux/wells";

export const AddWellFormStep3 = () => {
  //
  const dispatch = useDispatch();
  const [permission, requestPermission] = ImagePicker.useCameraPermissions();
  const [images, setImages] = useState([]);
  const wellAdd = useSelector((s) => s.wellState.wellAddData);

  const handleAddImage = async () => {
    try {
      let imagesList = [];
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.7,
        aspect: [4, 3],
        base64: true,
        allowsMultipleSelection: true,
        multiple: true,
      });

      if (!result.canceled) {
        result.assets.map((image) => {
          imagesList.push({
            filename: image.uri.split("/").pop(),
            path: image.uri,
            data: image.base64,
            mine: 'image/jpg',
          });
        });
        setImages(imagesList);
        dispatch(setWellAddDataAction({ ...wellAdd, images: imagesList }));
      }
    } catch (error) {
      console.error("Error picking an image: ", error);
    }
    //   const imagesList = [];
    //   ImagePicker.openPicker({
    //     multiple: true,
    //     waitAnimationEnd: false,
    //     includeExif: true,
    //     forceJpg: true,
    //     compressImageQuality: 0.7,
    //     mediaType: "photo",
    //     maxFiles: 8,
    //     includeBase64: true,
    //     width: 900,
    //     height: 900,
    //     compressImageMaxWidth: 900,
    //     compressImageMaxHeight: 900,
    //   }).then((response) => {
    //     response.map((image) => {
    //       imagesList.push({
    //         filename: image.filename,
    //         path: image.path,
    //         data: image.data,
    //         mine: image.mime,
    //       });
    //     });
    //     setImages(imagesList);
    //     dispatch(setWellAddDataAction({ ...wellAdd, images: imagesList }));
    //   });
  };

  if (permission?.status !== ImagePicker.PermissionStatus.GRANTED) {
    return (
      <View style={styles.container}>
        <TextVariant text={"Permission requise"} variant={"title5"} />
        <ButtonCustom
          label={"Autoriser l'accès à la caméra"}
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
      <View style={styles.header}>
        <TextVariant
          text={"Images des biens"}
          variant={"title5"}
          marginBottom={planet}
        />
        <ButtonCustom
          label={"Sélectionner"}
          labelVariant={"title5"}
          height={hp("6%")}
          labelColor={THEME.colors.primary}
          onPress={handleAddImage}
        />
      </View>

      <View style={styles.imageContainer}>
        {images?.map((image, index) => (
          <Image
            key={index}
            source={{ uri: image?.path }}
            style={styles.image}
          />
        ))}

        {/* <Image
          source={require('../../assets/images/house.png')}
          style={styles.image}
        /> */}
      </View>

      {/* <View style={styles.header}>
        <TextVariant
          text={'Vidéo du bien'}
          variant={'title5'}
          marginBottom={planet}
        />
        <ButtonCustom
          label={'Sélectionner'}
          labelVariant={'title5'}
          height={hp('6%')}
          labelColor={THEME.colors.primary}
          onPress={handleAddVideo}
        />
      </View> */}

      {/* <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/images/house.png')}
          style={styles.image}
        />
      </View> */}
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME.colors.white,
    width: "100%",
    paddingVertical: planet,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  imageContainer: {
    width: "100%",
    height: "auto",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: country,
  },
  image: {
    width: wp("45%"),
    height: wp("45%"),
    borderWidth: 1,
    borderColor: THEME.colors.gray,
    marginBottom: country,
    borderRadius: 10,
    backgroundColor: THEME.colors.darkLight,
  },
  btnStyle: {
    marginVertical: planet,
  },
});
