import { StyleSheet, TouchableOpacity, View } from "react-native";
import { TextVariant } from "./TextVariant";
import { hp } from "../../assets/utils/helperResponsive";
import { THEME } from "../../styles/theme";
import { city, street } from "../../styles/main.style";
import * as ImagePicker from "expo-image-picker";
// import ImagePicker from 'react-native-image-crop-picker';

export const FileInput = ({ withCam, style, setFile }) => {
  //
  const [permission, requestPermission] = ImagePicker.useCameraPermissions();

  const selectImageFromGallery = () => {
    // ImagePicker.openPicker({
    //   multiple: false,
    //   waitAnimationEnd: false,
    //   includeExif: true,
    //   compressImageQuality: 0.5,
    //   mediaType: 'photo',
    //   maxFiles: 1,
    //   includeBase64: true,
    //   width: 500,
    //   height: 500,
    //   compressImageMaxWidth: 500,
    //   compressImageMaxHeight: 500,
    // }).then(response => {
    //   const image = {
    //     filename: response.filename,
    //     path: response.path,
    //     data: 'data:image/jpeg;base64,' + response.data,
    //     mine: response.mime,
    //   };
    //   setFile(image);
    // });
  };

  // camera
  const selectImageFromCamera = async () => {
    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.7,
        aspect: [4, 3],
        base64: true,
      });

      if (!result.canceled) {
        const image = {
          filename: result.uri.split("/").pop(),
          path: result.uri,
          data: result.base64,
          mine: result.type,
        };
        setFile(image);
      }
    } catch (error) {
      console.log("error", error);
    }

    // ImagePicker.openCamera({
    //   width: 300,
    //   height: 400,
    //   cropping: true,
    //   compressImageQuality: 0.5,
    //   includeBase64: true,
    //   width: 500,
    //   height: 500,
    //   compressImageMaxWidth: 500,
    //   compressImageMaxHeight: 500,
    // }).then(response => {
    //   const image = {
    //     filename: response.filename,
    //     path: response.path,
    //     data: 'data:image/jpeg;base64,' + response.data,
    //     mine: response.mime,
    //   };

    //   setFile(image);
    // });
  };

  return (
    <View>
      <View style={[styles.container, style]}>
        <TouchableOpacity
          onPress={selectImageFromGallery}
          style={styles.btnSection}
        >
          <TextVariant text={"Choisir un fichier"} marginLeft={street} />
        </TouchableOpacity>
      </View>
      {withCam && (
        <TouchableOpacity
          onPress={selectImageFromCamera}
          style={styles.btnCamera}
        >
          <TextVariant
            text={"Prendre une photo"}
            color={THEME.colors.white}
            marginLeft={street}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: hp("1%"),
    borderWidth: hp("0.15%"),
    borderColor: THEME.colors.darkLight,
    paddingHorizontal: street,
    borderRadius: city,
    height: hp("7%"),
  },
  input: {
    width: "50%",
  },
  separator: {
    width: hp("0.15%"),
    height: "100%",
    backgroundColor: THEME.colors.darkLight,
  },
  btnCamera: {
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: THEME.colors.black,
    borderRadius: city,
    height: hp("7%"),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: hp("1%"),
  },
});
